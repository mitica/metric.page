"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { localesProvider } from "@/lib/locales";
import { trackEvent } from "@/lib/analytics";

interface ShareButtonProps {
  title: string;
  text: string;
  lang: string;
}

export default function ShareButton({ title, text, lang }: ShareButtonProps) {
  const t = localesProvider.lang(lang);
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleClick = useCallback(async () => {
    const url = window.location.href;
    try {
      if (typeof navigator !== "undefined" && typeof navigator.share === "function") {
        await navigator.share({ title, text, url });
        trackEvent("share", { method: "native" });
        return;
      }
    } catch {
      // user cancelled or share failed — fall through to copy
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      trackEvent("share", { method: "copy" });
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard blocked — silently no-op
    }
  }, [title, text]);

  const label = t.common_share();

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={label}
      title={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent transition-colors hover:border-accent/60 hover:bg-accent/15 hover:text-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      {copied ? (
        <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden>
          <path
            d="M3.5 8.5L6.5 11.5L12.5 5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden>
          <path
            d="M8 10V2M8 2L5 5M8 2L11 5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3 9.5V12.5C3 13.0523 3.44772 13.5 4 13.5H12C12.5523 13.5 13 13.0523 13 12.5V9.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      <span className="sr-only" aria-live="polite">
        {copied ? t.common_copied() : ""}
      </span>
    </button>
  );
}
