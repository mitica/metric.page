"use client";

import ConverterCard from "@/components/converter-card";
import { getConverter, getConvertersByCategory } from "@/converters/registry";
import { categoryMeta, Category } from "@/converters/types";
import { localesProvider } from "@/lib/locales";
import { ConverterListItem } from "@/components/converter-list";
import Link from "next/link";

interface ConverterPageClientProps {
  slug: string;
  lang: string;
}

export default function ConverterPageClient({ slug, lang }: ConverterPageClientProps) {
  const converter = getConverter(slug);
  if (!converter) return null;
  const t = localesProvider.lang(lang);
  const meta = categoryMeta[converter.category as Category];
  const siblings = getConvertersByCategory(converter.category).filter((c) => c.slug !== slug);

  return (
    <div>
      {/* Breadcrumb */}
      <div className="mx-auto max-w-lg px-4 pt-4">
        <nav className="flex items-center gap-1 text-sm">
          <Link
            href={`/${lang}/`}
            className="text-accent hover:text-accent-hover transition-colors"
          >
            {t.common_all_converters()}
          </Link>
          <span className="text-text-tertiary">/</span>
          <Link
            href={`/${lang}/${converter.category}/`}
            className="text-accent hover:text-accent-hover transition-colors"
          >
            {meta.icon} {t.v(meta.labelKey)}
          </Link>
        </nav>
      </div>

      <ConverterCard converter={converter} lang={lang} isFullPage />

      {/* More in this category */}
      {siblings.length > 0 && (
        <div className="mx-auto max-w-lg px-4 pb-8">
          <div className="mb-3 text-xs font-medium uppercase tracking-wider text-text-tertiary">
            {meta.icon} {t.v(meta.labelKey)}
          </div>
          <div className="grid grid-cols-1 gap-2">
            {siblings.map((c) => (
              <ConverterListItem key={c.slug} converter={c} lang={lang} compact />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
