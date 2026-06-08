"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ToolProps } from "../index";
import { localesProvider } from "@/lib/locales";
import { trackEvent } from "@/lib/analytics";
import DownloadButton from "../shared/download-button";
import ToolSwitcher from "../shared/tool-switcher";
import PrivacyNotice from "../shared/privacy-notice";
import {
  DecodedImage,
  OutputFormat,
  decode,
  encode,
  extensionFor,
  isSupportedInput,
} from "./codecs";

interface FileEntry {
  id: string;
  file: File;
  decoded: DecodedImage | null;
  output: Blob | null;
  outputSize: number;
  thumbnailUrl: string | null;
  status: "decoding" | "encoding" | "done" | "error";
  error?: string;
}

const ACCEPT = "image/*,.heic,.heif";
const THUMBNAIL_SIZE = 96;

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function outputFilename(original: string, format: OutputFormat): string {
  const stem = original.replace(/\.[^.]+$/, "") || "image";
  return `${stem}.${extensionFor(format)}`;
}

function makeThumbnail(decoded: DecodedImage): string {
  const ratio = Math.min(THUMBNAIL_SIZE / decoded.width, THUMBNAIL_SIZE / decoded.height);
  const w = Math.max(1, Math.round(decoded.width * ratio));
  const h = Math.max(1, Math.round(decoded.height * ratio));
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  if (decoded.source instanceof ImageData) {
    const full = document.createElement("canvas");
    full.width = decoded.width;
    full.height = decoded.height;
    full.getContext("2d")?.putImageData(decoded.source, 0, 0);
    ctx.drawImage(full, 0, 0, w, h);
  } else {
    ctx.drawImage(decoded.source, 0, 0, w, h);
  }
  return canvas.toDataURL("image/jpeg", 0.7);
}

export default function ImageFormatConverter({ lang }: ToolProps) {
  const t = localesProvider.lang(lang);
  const [format, setFormat] = useState<OutputFormat>("jpg");
  const [quality, setQuality] = useState(90);
  const [entries, setEntries] = useState<FileEntry[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  // Mirror of `entries` for the re-encode effect, which must NOT depend on
  // `entries` itself (every encode mutates entries and would cause a loop).
  // Updated in a follow-up effect so we never write to a ref during render.
  const entriesRef = useRef(entries);
  useEffect(() => {
    entriesRef.current = entries;
  }, [entries]);

  const updateEntry = useCallback((id: string, patch: Partial<FileEntry>) => {
    setEntries((prev) => prev.map((e) => (e.id === id ? { ...e, ...patch } : e)));
  }, []);

  // Encodes one entry's decoded image at the current format/quality.
  // Last-write-wins on rapid changes — acceptable for v1.
  const encodeEntry = useCallback(
    async (id: string, decoded: DecodedImage) => {
      updateEntry(id, { status: "encoding" });
      try {
        const blob = await encode(decoded, format, quality / 100);
        updateEntry(id, { output: blob, outputSize: blob.size, status: "done" });
      } catch (err) {
        updateEntry(id, {
          status: "error",
          error: err instanceof Error ? err.message : "Encode failed",
        });
      }
    },
    [format, quality, updateEntry],
  );

  const processNew = useCallback(
    async (entry: FileEntry) => {
      try {
        const decoded = await decode(entry.file);
        updateEntry(entry.id, { decoded, thumbnailUrl: makeThumbnail(decoded) });
        await encodeEntry(entry.id, decoded);
        trackEvent("image_convert", {
          from: entry.file.type || "unknown",
          to: format,
        });
      } catch (err) {
        updateEntry(entry.id, {
          status: "error",
          error: err instanceof Error ? err.message : "Conversion failed",
        });
      }
    },
    [encodeEntry, format, updateEntry],
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

  // Re-encode all already-decoded entries when format or quality changes.
  useEffect(() => {
    for (const entry of entriesRef.current) {
      if (entry.decoded) void encodeEntry(entry.id, entry.decoded);
    }
  }, [format, quality, encodeEntry]);

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (e.dataTransfer.files.length) handleFiles(e.dataTransfer.files);
    },
    [handleFiles],
  );

  const showQuality = format !== "png";

  return (
    <div className="space-y-5">
      <PrivacyNotice message={t.image_privacy_notice()} />

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

      <ToolSwitcher<OutputFormat>
        label={t.image_format_label()}
        value={format}
        onChange={setFormat}
        options={[
          { value: "jpg", label: t.image_format_jpg() },
          { value: "png", label: t.image_format_png() },
          { value: "webp", label: t.image_format_webp() },
        ]}
      />

      {showQuality && (
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
      )}

      {entries.length > 0 && (
        <ul className="space-y-2">
          {entries.map((entry) => (
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
                    </>
                  )}
                  {(entry.status === "decoding" || entry.status === "encoding") && (
                    <span className="ml-1">· {t.image_converting()}</span>
                  )}
                  {entry.status === "error" && entry.error && (
                    <span className="ml-1 text-red-500">· {entry.error}</span>
                  )}
                </div>
              </div>
              {entry.output && (
                <DownloadButton
                  label={t.image_download()}
                  filename={outputFilename(entry.file.name, format)}
                  variant="secondary"
                  getBlob={() => entry.output!}
                  onDownload={() => trackEvent("image_download", { to: format })}
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
