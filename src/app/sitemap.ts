import { MetadataRoute } from "next";
import { allConverters } from "@/converters/registry";
import { languageCodes } from "@/lib/locales";

export const dynamic = "force-static";

const BASE_URL = "https://metric.page";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Home pages per language
  for (const lang of languageCodes) {
    entries.push({
      url: `${BASE_URL}/${lang}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    });
  }

  // Converter pages per language
  for (const lang of languageCodes) {
    for (const converter of allConverters) {
      entries.push({
        url: `${BASE_URL}/${lang}/${converter.slug}/`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }

  return entries;
}
