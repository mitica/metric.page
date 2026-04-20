import { Metadata } from "next";
import { getConverter, getAllSlugs, getConvertersByCategory, getAllCategories } from "@/converters/registry";
import { categoryMeta, Category } from "@/converters/types";
import { localesProvider, languageCodes } from "@/lib/locales";
import { buildMetadata, buildConverterStructuredData } from "@/lib/seo";
import { notFound } from "next/navigation";
import ConverterPageClient from "./converter-page-client";
import { CategorySection } from "@/components/converter-list";
import Link from "next/link";

export function generateStaticParams() {
  const slugs = getAllSlugs();
  const categories = getAllCategories();
  const params: { lang: string; slug: string }[] = [];
  for (const lang of languageCodes) {
    for (const slug of slugs) {
      params.push({ lang, slug });
    }
    for (const cat of categories) {
      params.push({ lang, slug: cat });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;

  // Category page
  const meta = categoryMeta[slug as Category];
  if (meta) {
    const t = localesProvider.lang(lang);
    return buildMetadata({
      lang,
      title: t.v(meta.labelKey),
      description: t.v("site_description"),
      slug,
    });
  }

  // Converter page
  const converter = getConverter(slug);
  if (!converter) return {};
  const t = localesProvider.lang(lang);
  return buildMetadata({
    lang,
    title: t.v(converter.titleKey),
    description: t.v(converter.descriptionKey),
    slug,
  });
}

export default async function SlugPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;

  // Category page
  const meta = categoryMeta[slug as Category];
  if (meta) {
    const t = localesProvider.lang(lang);
    const converters = getConvertersByCategory(slug).map(({ slug: s, icon, titleKey, descriptionKey }) => ({ slug: s, icon, titleKey, descriptionKey }));
    return (
      <div className="mx-auto max-w-2xl px-4 py-8">
        <div className="mb-6">
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
        <CategorySection
          category={slug as Category}
          converters={converters}
          lang={lang}
        />
      </div>
    );
  }

  // Converter page
  const converter = getConverter(slug);
  if (!converter) notFound();
  const structuredData = buildConverterStructuredData({ lang, slug });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ConverterPageClient slug={slug} lang={lang} />
    </>
  );
}
