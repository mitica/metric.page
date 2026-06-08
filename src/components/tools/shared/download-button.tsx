"use client";

import { useCallback } from "react";

interface DownloadButtonProps {
  label: string;
  filename: string;
  // Resolves the bytes lazily so heavy encodes only run on click.
  getBlob: () => Promise<Blob> | Blob;
  onDownload?: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
}

export default function DownloadButton({
  label,
  filename,
  getBlob,
  onDownload,
  variant = "primary",
  disabled,
}: DownloadButtonProps) {
  const handleClick = useCallback(async () => {
    const blob = await getBlob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    onDownload?.();
  }, [filename, getBlob, onDownload]);

  const base =
    "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";
  const styles =
    variant === "primary"
      ? "bg-accent text-white hover:bg-accent-hover"
      : "border border-accent/30 bg-accent/10 text-accent hover:border-accent/60 hover:bg-accent/15";

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={`${base} ${styles}`}
    >
      {label}
    </button>
  );
}
