"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ToolProps } from "../index";
import { localesProvider } from "@/lib/locales";
import { trackEvent } from "@/lib/analytics";
import DownloadButton from "../shared/download-button";
import ToolSwitcher from "../shared/tool-switcher";
import PrivacyNotice from "../shared/privacy-notice";
import {
  DecodedImage,
  decode,
  extensionFor,
  isHeic,
  isSupportedInput,
} from "../image-format-converter/codecs";

type CompressFormat = "auto" | "jpg" | "webp";
type EncodedFormat = "jpg" | "png" | "webp";

interface FileEntry {
  id: string;
  file: File;
  decoded: DecodedImage | null;
  output: Blob | null;
  outputSize: number;
  outputFormat: EncodedFormat | null;
  thumbnailUrl: string | null;
  status: "decoding" | "compressing" | "done" | "error";
  error?: string;
}

const ACCEPT = "image/*,.heic,.heif";
const THUMBNAIL_SIZE = 96;

const MIME: Record<EncodedFormat, string> = {
  jpg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
};

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

// Pick output format when user chose "auto": keep input format when the browser
// can encode it natively. HEIC can be decoded (via libheif) but not encoded, so
// it falls through to WebP — the best size/quality trade-off.
function resolveFormat(file: File, format: CompressFormat): EncodedFormat {
  if (format !== "auto") return format;
  if (isHeic(file)) return "webp";
  const type = file.type.toLowerCase();
  if (type === "image/png") return "png";
  if (type === "image/webp") return "webp";
  return "jpg";
}

function outputFilename(original: string, format: EncodedFormat): string {
  const stem = original.replace(/\.[^.]+$/, "") || "image";
  return `${stem}-compressed.${extensionFor(format)}`;
}

function drawTo(canvas: HTMLCanvasElement, decoded: DecodedImage, w: number, h: number) {
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D context unavailable");
  if (decoded.source instanceof ImageData) {
    if (w === decoded.width && h === decoded.height) {
      ctx.putImageData(decoded.source, 0, 0);
    } else {
      // ImageData can't be scaled directly — render to a same-size canvas first.
      const full = document.createElement("canvas");
      full.width = decoded.width;
      full.height = decoded.height;
      full.getContext("2d")?.putImageData(decoded.source, 0, 0);
      ctx.drawImage(full, 0, 0, w, h);
    }
  } else {
    ctx.drawImage(decoded.source, 0, 0, w, h);
  }
}

function makeThumbnail(decoded: DecodedImage): string {
  const ratio = Math.min(THUMBNAIL_SIZE / decoded.width, THUMBNAIL_SIZE / decoded.height);
  const w = Math.max(1, Math.round(decoded.width * ratio));
  const h = Math.max(1, Math.round(decoded.height * ratio));
  const canvas = document.createElement("canvas");
  drawTo(canvas, decoded, w, h);
  return canvas.toDataURL("image/jpeg", 0.7);
}

async function compress(
  decoded: DecodedImage,
  format: EncodedFormat,
  quality: number,
  maxWidth: number | null,
): Promise<Blob> {
  let w = decoded.width;
  let h = decoded.height;
  if (maxWidth && w > maxWidth) {
    const ratio = maxWidth / w;
    w = maxWidth;
    h = Math.max(1, Math.round(decoded.height * ratio));
  }
  const canvas = document.createElement("canvas");
  drawTo(canvas, decoded, w, h);
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error(`Failed to encode ${format}`))),
      MIME[format],
      quality,
    );
  });
}

export default function ImageCompressor({ lang }: ToolProps) {
  const t = localesProvider.lang(lang);
  const [format, setFormat] = useState<CompressFormat>("auto");
  const [quality, setQuality] = useState(80);
  const [maxWidthInput, setMaxWidthInput] = useState("");
  const [entries, setEntries] = useState<FileEntry[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  // Mirror of `entries` for the re-compress effect, which must NOT depend on
  // `entries` itself (every compress mutates entries and would loop).
  const entriesRef = useRef(entries);
  useEffect(() => {
    entriesRef.current = entries;
  }, [entries]);

  const maxWidth = useMemo(() => {
    const n = parseInt(maxWidthInput, 10);
    return Number.isFinite(n) && n > 0 ? n : null;
  }, [maxWidthInput]);

  const updateEntry = useCallback((id: string, patch: Partial<FileEntry>) => {
    setEntries((prev) => prev.map((e) => (e.id === id ? { ...e, ...patch } : e)));
  }, []);

  const compressEntry = useCallback(
    async (entry: FileEntry, decoded: DecodedImage) => {
      const target = resolveFormat(entry.file, format);
      updateEntry(entry.id, { status: "compressing" });
      try {
        const blob = await compress(decoded, target, quality / 100, maxWidth);
        updateEntry(entry.id, {
          output: blob,
          outputSize: blob.size,
          outputFormat: target,
          status: "done",
        });
      } catch (err) {
        updateEntry(entry.id, {
          status: "error",
          error: err instanceof Error ? err.message : "Compression failed",
        });
      }
    },
    [format, quality, maxWidth, updateEntry],
  );

  const processNew = useCallback(
    async (entry: FileEntry) => {
      try {
        const decoded = await decode(entry.file);
        updateEntry(entry.id, { decoded, thumbnailUrl: makeThumbnail(decoded) });
        await compressEntry({ ...entry, decoded }, decoded);
        trackEvent("image_compress", {
          from: entry.file.type || "unknown",
          to: resolveFormat(entry.file, format),
        });
      } catch (err) {
        updateEntry(entry.id, {
          status: "error",
          error: err instanceof Error ? err.message : "Compression failed",
        });
      }
    },
    [compressEntry, format, updateEntry],
  );

  const handleFiles = useCallback(
    (fileList: FileList | File[]) => {
      const files = Array.from(fileList);
      const newEntries: FileEntry[] = files.map((file) => {
        const supported = isSupportedInput(file);
        return {
          id: crypto.randomUUID(),
          file,
          decoded: null,
          output: null,
          outputSize: 0,
          outputFormat: null,
          thumbnailUrl: null,
          status: supported ? "decoding" : "error",
          error: supported ? undefined : t.image_unsupported_format(),
        };
      });
      setEntries((prev) => [...prev, ...newEntries]);
      for (const entry of newEntries) {
        if (entry.status !== "error") void processNew(entry);
      }
    },
    [processNew, t],
  );

  // Re-compress already-decoded entries when format, quality, or max width change.
  useEffect(() => {
    for (const entry of entriesRef.current) {
      if (entry.decoded) void compressEntry(entry, entry.decoded);
    }
  }, [format, quality, maxWidth, compressEntry]);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (e.dataTransfer.files.length) handleFiles(e.dataTransfer.files);
    },
    [handleFiles],
  );

  return (
    <div className="space-y-5">
      <PrivacyNotice message={t.compress_privacy_notice()} />

      <div
        onDragEnter={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragOver={(e) => e.preventDefault()}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click();
        }}
        className={`flex cursor-pointer flex-col items-center justify-center gap-1 rounded-2xl border-2 border-dashed px-4 py-8 text-center transition-colors ${
          isDragging
            ? "border-accent bg-accent/10"
            : "border-border bg-surface-elevated hover:border-accent/50"
        }`}
      >
        <span className="text-2xl" aria-hidden>
          📥
        </span>
        <span className="text-sm font-medium text-text-primary">{t.image_drop_label()}</span>
        <span className="text-xs text-text-tertiary">{t.image_drop_hint()}</span>
        <input
          ref={fileInputRef}
          type="file"
          accept={ACCEPT}
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files) handleFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </div>

      <ToolSwitcher<CompressFormat>
        label={t.image_format_label()}
        value={format}
        onChange={setFormat}
        options={[
          { value: "auto", label: t.compress_format_keep() },
          { value: "jpg", label: t.image_format_jpg() },
          { value: "webp", label: t.image_format_webp() },
        ]}
      />

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="img-quality" className="text-sm font-medium text-text-secondary">
            {t.image_quality_label()}
          </label>
          <span className="text-sm text-text-secondary tabular-nums">{quality}</span>
        </div>
        <input
          id="img-quality"
          type="range"
          min={10}
          max={100}
          step={1}
          value={quality}
          onChange={(e) => setQuality(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="img-max-width" className="block text-sm font-medium text-text-secondary">
          {t.compress_resize_max_width()}
        </label>
        <input
          id="img-max-width"
          type="number"
          inputMode="numeric"
          min={1}
          step={1}
          value={maxWidthInput}
          onChange={(e) => setMaxWidthInput(e.target.value)}
          placeholder={t.compress_resize_off()}
          className="w-full rounded-lg border border-border bg-surface-elevated px-3 py-2 text-sm text-text-primary placeholder:text-text-tertiary focus-visible:border-accent focus-visible:outline-none"
        />
      </div>

      {entries.length > 0 && (
        <ul className="space-y-2">
          {entries.map((entry) => {
            const saved =
              entry.output && entry.file.size > 0
                ? Math.round((1 - entry.outputSize / entry.file.size) * 100)
                : 0;
            return (
              <li
                key={entry.id}
                className="flex items-center gap-3 rounded-2xl bg-surface-elevated px-3 py-2"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-md bg-surface">
                  {entry.thumbnailUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={entry.thumbnailUrl}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-lg text-text-tertiary" aria-hidden>
                      🖼
                    </span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium text-text-primary">
                    {entry.file.name}
                  </div>
                  <div className="text-xs text-text-tertiary">
                    {formatBytes(entry.file.size)}
                    {entry.output && (
                      <>
                        {" → "}
                        <span className="text-text-secondary">
                          {formatBytes(entry.outputSize)}
                        </span>
                        {saved > 0 && (
                          <span className="ml-1 font-medium text-green-600 dark:text-green-400">
                            −{saved}%
                          </span>
                        )}
                      </>
                    )}
                    {(entry.status === "decoding" || entry.status === "compressing") && (
                      <span className="ml-1">· {t.image_compressing()}</span>
                    )}
                    {entry.status === "error" && entry.error && (
                      <span className="ml-1 text-red-500">· {entry.error}</span>
                    )}
                  </div>
                </div>
                {entry.output && entry.outputFormat && (
                  <DownloadButton
                    label={t.image_download()}
                    filename={outputFilename(entry.file.name, entry.outputFormat)}
                    variant="secondary"
                    getBlob={() => entry.output!}
                    onDownload={() =>
                      trackEvent("image_compress_download", { to: entry.outputFormat! })
                    }
                  />
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
