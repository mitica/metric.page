import { Metadata } from "next";
import { getConverter, getAllSlugs } from "@/converters/registry";
import { localesProvider, languageCodes } from "@/lib/locales";
import { buildMetadata, buildConverterStructuredData } from "@/lib/seo";
import { notFound } from "next/navigation";
import ConverterPageClient from "./converter-page-client";

export function generateStaticParams() {
  const slugs = getAllSlugs();
  const params: { lang: string; slug: string }[] = [];
  for (const lang of languageCodes) {
    for (const slug of slugs) {
      params.push({ lang, slug });
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

export default async function ConverterPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
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
