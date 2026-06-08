"use client";

import { useCallback, useRef, useState } from "react";
import { ToolProps } from "../index";
import { localesProvider } from "@/lib/locales";
import { trackEvent } from "@/lib/analytics";
import DownloadButton from "../shared/download-button";
import PrivacyNotice from "../shared/privacy-notice";

interface PdfEntry {
  id: string;
  file: File;
  pageCount: number | null;
  status: "loading" | "ready" | "error";
  error?: string;
}

const ACCEPT = "application/pdf,.pdf";

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

// pdf-lib is ~330KB minified — load it only when the user actually drops a file.
async function loadPdfLib() {
  return import("pdf-lib");
}

function isPdfFile(file: File): boolean {
  return file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
}

export default function PdfMerge({ lang }: ToolProps) {
  const t = localesProvider.lang(lang);
  const [entries, setEntries] = useState<PdfEntry[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isMerging, setIsMerging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateEntry = useCallback((id: string, patch: Partial<PdfEntry>) => {
    setEntries((prev) => prev.map((e) => (e.id === id ? { ...e, ...patch } : e)));
  }, []);

  const handleFiles = useCallback(
    async (fileList: FileList | File[]) => {
      const files = Array.from(fileList);
      const newEntries: PdfEntry[] = files.map((file) => {
        const supported = isPdfFile(file);
        return {
          id: crypto.randomUUID(),
          file,
          pageCount: null,
          status: supported ? "loading" : "error",
          error: supported ? undefined : t.pdf_invalid(),
        };
      });
      setEntries((prev) => [...prev, ...newEntries]);

      const valid = newEntries.filter((e) => e.status === "loading");
      if (!valid.length) return;
      const { PDFDocument } = await loadPdfLib();
      for (const entry of valid) {
        try {
          const buf = await entry.file.arrayBuffer();
          const doc = await PDFDocument.load(buf, { ignoreEncryption: true });
          updateEntry(entry.id, { pageCount: doc.getPageCount(), status: "ready" });
        } catch {
          updateEntry(entry.id, { status: "error", error: t.pdf_invalid() });
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

  const readyEntries = entries.filter((e) => e.status === "ready");
  const totalPages = readyEntries.reduce((sum, e) => sum + (e.pageCount ?? 0), 0);
  const canMerge = readyEntries.length >= 2 && !isMerging;

  const mergePdfs = useCallback(async (): Promise<Blob> => {
    setIsMerging(true);
    try {
      const { PDFDocument } = await loadPdfLib();
      const merged = await PDFDocument.create();
      for (const entry of readyEntries) {
        const buf = await entry.file.arrayBuffer();
        const src = await PDFDocument.load(buf, { ignoreEncryption: true });
        const pages = await merged.copyPages(src, src.getPageIndices());
        pages.forEach((p) => merged.addPage(p));
      }
      const bytes = await merged.save();
      trackEvent("pdf_merge", { files: readyEntries.length, pages: totalPages });
      return new Blob([new Uint8Array(bytes)], { type: "application/pdf" });
    } finally {
      setIsMerging(false);
    }
  }, [readyEntries, totalPages]);

  return (
    <div className="space-y-5">
      <PrivacyNotice message={t.pdf_privacy_notice()} />

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
        <span className="text-sm font-medium text-text-primary">{t.pdf_drop_label()}</span>
        <span className="text-xs text-text-tertiary">{t.pdf_drop_hint()}</span>
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

      {entries.length > 0 && (
        <ul className="space-y-2">
          {entries.map((entry, idx) => (
            <li
              key={entry.id}
              className="flex items-center gap-3 rounded-2xl bg-surface-elevated px-3 py-2"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-surface text-lg">
                <span aria-hidden>📄</span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-sm font-medium text-text-primary">
                  {entry.file.name}
                </div>
                <div className="text-xs text-text-tertiary">
                  {formatBytes(entry.file.size)}
                  {entry.status === "ready" && entry.pageCount !== null && (
                    <> · {t.pdf_pages_count(entry.pageCount)}</>
                  )}
                  {entry.status === "loading" && <span className="ml-1">· {t.pdf_loading()}</span>}
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
          {readyEntries.length >= 2 && (
            <div className="text-xs text-text-tertiary">
              {t.pdf_merge_summary(readyEntries.length, totalPages)}
            </div>
          )}
          <DownloadButton
            label={isMerging ? t.pdf_merging() : t.pdf_merge_button()}
            filename="merged.pdf"
            variant="primary"
            disabled={!canMerge}
            getBlob={mergePdfs}
            onDownload={() =>
              trackEvent("pdf_merge_download", {
                files: readyEntries.length,
                pages: totalPages,
              })
            }
          />
        </div>
      )}
    </div>
  );
}
