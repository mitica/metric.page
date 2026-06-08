"use client";

import { useEffect, useMemo, useState } from "react";
import QRCode, { QRCodeErrorCorrectionLevel } from "qrcode";
import { ToolProps } from "../index";
import { localesProvider } from "@/lib/locales";
import { trackEvent } from "@/lib/analytics";
import DownloadButton from "../shared/download-button";
import ToolSwitcher from "../shared/tool-switcher";

const PREVIEW_DEBOUNCE_MS = 150;
const PNG_SIZE = 1024;
const DEFAULT_TEXT = "https://metric.page";

type Level = "L" | "M" | "Q" | "H";

export default function QrGenerator({ lang }: ToolProps) {
  const t = localesProvider.lang(lang);
  const [text, setText] = useState(DEFAULT_TEXT);
  const [level, setLevel] = useState<Level>("M");
  const [svg, setSvg] = useState<string>("");

  const trimmed = text.trim();

  useEffect(() => {
    let cancelled = false;
    const timer = setTimeout(async () => {
      if (!trimmed) {
        if (!cancelled) setSvg("");
        return;
      }
      try {
        const out = await QRCode.toString(trimmed, {
          type: "svg",
          errorCorrectionLevel: level as QRCodeErrorCorrectionLevel,
          margin: 1,
        });
        if (!cancelled) setSvg(out);
      } catch {
        if (!cancelled) setSvg("");
      }
    }, PREVIEW_DEBOUNCE_MS);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [trimmed, level]);

  const filenameStem = useMemo(() => {
    const slug = trimmed
      .replace(/^https?:\/\//, "")
      .replace(/[^a-zA-Z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 40)
      .toLowerCase();
    return slug || "qr-code";
  }, [trimmed]);

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <label
          htmlFor="qr-text"
          className="block text-sm font-medium text-text-secondary"
        >
          {t.qr_text_label()}
        </label>
        <textarea
          id="qr-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={t.qr_text_placeholder()}
          rows={3}
          className="w-full resize-y rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary focus:border-accent focus:outline-none"
        />
      </div>

      <ToolSwitcher<Level>
        label={t.qr_error_correction_label()}
        value={level}
        onChange={setLevel}
        options={[
          { value: "L", label: t.qr_ec_low() },
          { value: "M", label: t.qr_ec_medium() },
          { value: "Q", label: t.qr_ec_quartile() },
          { value: "H", label: t.qr_ec_high() },
        ]}
      />

      <div className="flex justify-center">
        <div
          className="flex aspect-square w-full max-w-xs items-center justify-center rounded-2xl bg-white p-4"
          aria-label="QR code preview"
        >
          {svg ? (
            <div
              className="h-full w-full [&>svg]:h-full [&>svg]:w-full"
              dangerouslySetInnerHTML={{ __html: svg }}
            />
          ) : (
            <div className="text-xs text-text-tertiary">—</div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <DownloadButton
          label={t.qr_download_svg()}
          filename={`${filenameStem}.svg`}
          variant="primary"
          disabled={!svg}
          getBlob={() => new Blob([svg], { type: "image/svg+xml" })}
          onDownload={() => trackEvent("qr_download", { format: "svg", level })}
        />
        <DownloadButton
          label={t.qr_download_png()}
          filename={`${filenameStem}.png`}
          variant="secondary"
          disabled={!trimmed}
          getBlob={async () => {
            const dataUrl = await QRCode.toDataURL(trimmed, {
              errorCorrectionLevel: level as QRCodeErrorCorrectionLevel,
              margin: 1,
              width: PNG_SIZE,
            });
            const res = await fetch(dataUrl);
            return res.blob();
          }}
          onDownload={() => trackEvent("qr_download", { format: "png", level })}
        />
      </div>
    </div>
  );
}
