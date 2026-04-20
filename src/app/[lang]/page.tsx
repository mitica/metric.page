import { Metadata } from "next";
import { localesProvider, languageCodes } from "@/lib/locales";
import { buildMetadata } from "@/lib/seo";
import { allConverters } from "@/converters/registry";
import { categoryMeta, Category } from "@/converters/types";
import { CategorySection } from "@/components/converter-list";

export function generateStaticParams() {
  return languageCodes.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const t = localesProvider.lang(lang);
  return buildMetadata({
    lang,
    title: t.site_title(),
    description: t.site_description(),
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = localesProvider.lang(lang);

  // Group converters by category, sorted by category order
  const categories = Object.entries(categoryMeta)
    .sort(([, a], [, b]) => a.order - b.order)
    .map(([cat]) => cat as Category);

  const grouped = categories.map((cat) => ({
    category: cat,
    converters: allConverters
      .filter((c) => c.category === cat)
      .map(({ slug, icon, titleKey, descriptionKey }) => ({ slug, icon, titleKey, descriptionKey })),
  })).filter((g) => g.converters.length > 0);

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-text-primary">{t.common_all_converters()}</h1>
        <p className="mt-1 text-sm text-text-secondary">{t.site_description()}</p>
      </div>
      <div className="space-y-8">
        {grouped.map(({ category, converters }) => (
          <CategorySection
            key={category}
            category={category}
            converters={converters}
            lang={lang}
            linkable
          />
        ))}
      </div>
    </div>
  );
}
