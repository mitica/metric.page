"use client";

import ConverterCard from "@/components/converter-card";
import { getConverter } from "@/converters/registry";
import { localesProvider } from "@/lib/locales";
import Link from "next/link";

interface ConverterPageClientProps {
  slug: string;
  lang: string;
}

export default function ConverterPageClient({ slug, lang }: ConverterPageClientProps) {
  const converter = getConverter(slug);
  if (!converter) return null;
  const t = localesProvider.lang(lang);

  return (
    <div className="min-h-screen">
      {/* Back button */}
      <div className="mx-auto max-w-lg px-4 pt-4">
        <Link
          href={`/${lang}/`}
          className="inline-flex items-center gap-1 text-sm text-accent hover:text-accent-hover transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 4L6 8L10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {t.common_back()}
        </Link>
      </div>

      <ConverterCard converter={converter} lang={lang} isFullPage />
    </div>
  );
}
