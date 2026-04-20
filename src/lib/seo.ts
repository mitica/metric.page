import { Metadata } from "next";
import { getLanguage, languageCodes, localesProvider } from "./locales";
import { LocalesKey } from "./locales/generated-locales";

const BASE_URL = "https://metric.page";

export function buildMetadata({
  lang,
  title,
  description,
  slug,
}: {
  lang: string;
  title: string;
  description: string;
  slug?: string;
}): Metadata {
  const language = getLanguage(lang);
  const path = slug ? `/${lang}/${slug}/` : `/${lang}/`;
  const canonical = `${BASE_URL}${path}`;

  const alternates: Record<string, string> = {};
  for (const code of languageCodes) {
    const altPath = slug ? `/${code}/${slug}/` : `/${code}/`;
    alternates[code] = `${BASE_URL}${altPath}`;
  }

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: alternates,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "metric.page",
      locale: lang,
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
    other: {
      "content-language": lang,
      dir: language.dir,
    },
  };
}

export function buildConverterStructuredData({
  lang,
  slug,
}: {
  lang: string;
  slug: string;
}) {
  const t = localesProvider.lang(lang);
  const titleKey = `converter_${slug.replace(/-/g, "_")}_title` as LocalesKey;
  const descriptionKey = `converter_${slug.replace(/-/g, "_")}_description` as LocalesKey;
  const title = t.v(titleKey);
  const description = t.v(descriptionKey);

  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: title,
    description,
    url: `${BASE_URL}/${lang}/${slug}/`,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    inLanguage: lang,
  };
}
