"use client";

import { useCallback, useRef, useState } from "react";
import { ToolProps } from "../index";
import { localesProvider } from "@/lib/locales";
import { trackEvent } from "@/lib/analytics";
import DownloadButton from "../shared/download-button";
import ToolSwitcher from "../shared/tool-switcher";
import PrivacyNotice from "../shared/privacy-notice";
import { DecodedImage, decode, isSupportedInput } from "../image-format-converter/codecs";

type PageSize = "fit" | "a4" | "letter";

interface ImageEntry {
  id: string;
  file: File;
  decoded: DecodedImage | null;
  thumbnailUrl: string | null;
  status: "loading" | "ready" | "error";
  error?: string;
}

const ACCEPT = "image/*,.heic,.heif";
const THUMBNAIL_SIZE = 96;
const PAGE_MARGIN_PT = 36; // 0.5 inch at 72 DPI
const JPEG_QUALITY = 0.92;

const PAGE_DIMS: Record<Exclude<PageSize, "fit">, { w: number; h: number }> = {
  a4: { w: 595.28, h: 841.89 },
  letter: { w: 612, h: 792 },
};

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

async function loadPdfLib() {
  return import("pdf-lib");
}

function drawDecodedToCanvas(decoded: DecodedImage, w: number, h: number): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D context unavailable");
  if (decoded.source instanceof ImageData) {
    if (w === decoded.width && h === decoded.height) {
      ctx.putImageData(decoded.source, 0, 0);
    } else {
      const full = document.createElement("canvas");
      full.width = decoded.width;
      full.height = decoded.height;
      full.getContext("2d")?.putImageData(decoded.source, 0, 0);
      ctx.drawImage(full, 0, 0, w, h);
    }
  } else {
    ctx.drawImage(decoded.source, 0, 0, w, h);
  }
  return canvas;
}

function makeThumbnail(decoded: DecodedImage): string {
  const ratio = Math.min(THUMBNAIL_SIZE / decoded.width, THUMBNAIL_SIZE / decoded.height);
  const w = Math.max(1, Math.round(decoded.width * ratio));
  const h = Math.max(1, Math.round(decoded.height * ratio));
  return drawDecodedToCanvas(decoded, w, h).toDataURL("image/jpeg", 0.7);
}

// Returns JPG/PNG bytes ready for pdf-lib embed. Native JPG/PNG files pass
// through untouched (no re-encode). Everything else (HEIC, WebP, AVIF, GIF,
// BMP) is rendered to a JPEG via canvas — smaller PDFs and pdf-lib only
// embeds JPG/PNG anyway.
async function bytesForEmbed(
  file: File,
  decoded: DecodedImage,
): Promise<{ bytes: Uint8Array; format: "jpg" | "png" }> {
  const type = file.type.toLowerCase();
  const name = file.name.toLowerCase();
  if (type === "image/jpeg" || type === "image/jpg" || name.endsWith(".jpg") || name.endsWith(".jpeg")) {
    return { bytes: new Uint8Array(await file.arrayBuffer()), format: "jpg" };
  }
  if (type === "image/png" || name.endsWith(".png")) {
    return { bytes: new Uint8Array(await file.arrayBuffer()), format: "png" };
  }
  const canvas = drawDecodedToCanvas(decoded, decoded.width, decoded.height);
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("Encode failed"))),
      "image/jpeg",
      JPEG_QUALITY,
    );
  });
  return { bytes: new Uint8Array(await blob.arrayBuffer()), format: "jpg" };
}

export default function ImageToPdf({ lang }: ToolProps) {
  const t = localesProvider.lang(lang);
  const [pageSize, setPageSize] = useState<PageSize>("fit");
  const [entries, setEntries] = useState<ImageEntry[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isBuilding, setIsBuilding] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateEntry = useCallback((id: string, patch: Partial<ImageEntry>) => {
    setEntries((prev) => prev.map((e) => (e.id === id ? { ...e, ...patch } : e)));
  }, []);

  const handleFiles = useCallback(
    async (fileList: FileList | File[]) => {
      const files = Array.from(fileList);
      const newEntries: ImageEntry[] = files.map((file) => {
        const supported = isSupportedInput(file);
        return {
          id: crypto.randomUUID(),
          file,
          decoded: null,
          thumbnailUrl: null,
          status: supported ? "loading" : "error",
          error: supported ? undefined : t.image_unsupported_format(),
        };
      });
      setEntries((prev) => [...prev, ...newEntries]);

      for (const entry of newEntries) {
        if (entry.status !== "loading") continue;
        try {
          const decoded = await decode(entry.file);
          updateEntry(entry.id, {
            decoded,
            thumbnailUrl: makeThumbnail(decoded),
            status: "ready",
          });
        } catch {
          updateEntry(entry.id, { status: "error", error: t.image_unsupported_format() });
        }
      }
    },
    [updateEntry, t],
  );

  const removeEntry = (id: string) => setEntries((prev) => prev.filter((e) => e.id !== id));

  const moveEntry = (id: string, dir: -1 | 1) => {
    setEntries((prev) => {
      const idx = prev.findIndex((e) => e.id === id);
      if (idx < 0) return prev;
      const next = idx + dir;
      if (next < 0 || next >= prev.length) return prev;
      const out = [...prev];
      [out[idx], out[next]] = [out[next], out[idx]];
      return out;
    });
  };

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (e.dataTransfer.files.length) void handleFiles(e.dataTransfer.files);
    },
    [handleFiles],
  );

  const readyEntries = entries.filter((e) => e.status === "ready" && e.decoded);
  const canBuild = readyEntries.length >= 1 && !isBuilding;

  const buildPdf = useCallback(async (): Promise<Blob> => {
    setIsBuilding(true);
    try {
      const { PDFDocument } = await loadPdfLib();
      const pdf = await PDFDocument.create();

      for (const entry of readyEntries) {
        if (!entry.decoded) continue;
        const { bytes, format } = await bytesForEmbed(entry.file, entry.decoded);
        const img =
          format === "jpg" ? await pdf.embedJpg(bytes) : await pdf.embedPng(bytes);

        if (pageSize === "fit") {
          const page = pdf.addPage([img.width, img.height]);
          page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
        } else {
          const { w, h } = PAGE_DIMS[pageSize];
          const portrait = img.height >= img.width;
          const pageW = portrait ? w : h;
          const pageH = portrait ? h : w;
          const availW = pageW - 2 * PAGE_MARGIN_PT;
          const availH = pageH - 2 * PAGE_MARGIN_PT;
          const scale = Math.min(availW / img.width, availH / img.height);
          const drawW = img.width * scale;
          const drawH = img.height * scale;
          const page = pdf.addPage([pageW, pageH]);
          page.drawImage(img, {
            x: (pageW - drawW) / 2,
            y: (pageH - drawH) / 2,
            width: drawW,
            height: drawH,
          });
        }
      }

      const bytes = await pdf.save();
      trackEvent("image_to_pdf", { images: readyEntries.length, page_size: pageSize });
      return new Blob([new Uint8Array(bytes)], { type: "application/pdf" });
    } finally {
      setIsBuilding(false);
    }
  }, [readyEntries, pageSize]);

  return (
    <div className="space-y-5">
      <PrivacyNotice message={t.img2pdf_privacy_notice()} />

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
        <span className="text-sm font-medium text-text-primary">{t.img2pdf_drop_label()}</span>
        <span className="text-xs text-text-tertiary">{t.img2pdf_drop_hint()}</span>
        <input
          ref={fileInputRef}
          type="file"
          accept={ACCEPT}
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files) void handleFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </div>

      <ToolSwitcher<PageSize>
        label={t.img2pdf_page_size_label()}
        value={pageSize}
        onChange={setPageSize}
        options={[
          { value: "fit", label: t.img2pdf_page_fit() },
          { value: "a4", label: t.img2pdf_page_a4() },
          { value: "letter", label: t.img2pdf_page_letter() },
        ]}
      />

      {entries.length > 0 && (
        <ul className="space-y-2">
          {entries.map((entry, idx) => (
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
                  {entry.status === "loading" && (
                    <span className="ml-1">· {t.img2pdf_loading()}</span>
                  )}
                  {entry.status === "error" && entry.error && (
                    <span className="ml-1 text-red-500">· {entry.error}</span>
                  )}
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <button
                  type="button"
                  onClick={() => moveEntry(entry.id, -1)}
                  disabled={idx === 0}
                  aria-label={t.pdf_move_up()}
                  className="rounded-md p-1.5 text-text-secondary hover:bg-surface disabled:opacity-30"
                >
                  ▲
                </button>
                <button
                  type="button"
                  onClick={() => moveEntry(entry.id, 1)}
                  disabled={idx === entries.length - 1}
                  aria-label={t.pdf_move_down()}
                  className="rounded-md p-1.5 text-text-secondary hover:bg-surface disabled:opacity-30"
                >
                  ▼
                </button>
                <button
                  type="button"
                  onClick={() => removeEntry(entry.id)}
                  aria-label={t.pdf_remove()}
                  className="rounded-md p-1.5 text-text-secondary hover:bg-surface hover:text-red-500"
                >
                  ✕
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {readyEntries.length > 0 && (
        <div className="flex flex-col items-center gap-2">
          <div className="text-xs text-text-tertiary">
            {t.img2pdf_summary(readyEntries.length)}
          </div>
          <DownloadButton
            label={isBuilding ? t.img2pdf_building() : t.img2pdf_build_button()}
            filename="images.pdf"
            variant="primary"
            disabled={!canBuild}
            getBlob={buildPdf}
            onDownload={() =>
              trackEvent("image_to_pdf_download", {
                images: readyEntries.length,
                page_size: pageSize,
              })
            }
          />
        </div>
      )}
    </div>
  );
}
