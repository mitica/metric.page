import Link from "next/link";
import { categoryMeta, Category } from "@/converters/types";
import { localesProvider } from "@/lib/locales";
import { LocalesKey } from "@/lib/locales/generated-locales";

interface ConverterListItemData {
  slug: string;
  icon: string;
  titleKey: string;
  descriptionKey: string;
}

interface ConverterListItemProps {
  converter: ConverterListItemData;
  lang: string;
  compact?: boolean;
}

export function ConverterListItem({ converter, lang, compact }: ConverterListItemProps) {
  const t = localesProvider.lang(lang);
  return (
    <Link
      href={`/${lang}/${converter.slug}/`}
      className="glass-card flex items-center gap-3 p-3 transition-transform hover:scale-[1.02] active:scale-[0.98]"
    >
      <span className={compact ? "text-xl" : "text-2xl"}>{converter.icon}</span>
      <div className="min-w-0 flex-1">
        <div className="font-semibold text-text-primary text-sm">
          {t.v(converter.titleKey as LocalesKey)}
        </div>
        {!compact && (
          <div className="truncate text-xs text-text-secondary">
            {t.v(converter.descriptionKey as LocalesKey)}
          </div>
        )}
      </div>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 text-text-tertiary">
        <path d="M5 3L9 7L5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Link>
  );
}

interface CategorySectionProps {
  category: Category;
  converters: ConverterListItemData[];
  lang: string;
  linkable?: boolean;
}

export function CategorySection({ category, converters, lang, linkable }: CategorySectionProps) {
  const t = localesProvider.lang(lang);
  const meta = categoryMeta[category];

  const heading = (
    <div className="flex items-center gap-2">
      <span className="text-xl">{meta.icon}</span>
      <h2 className="text-lg font-bold text-text-primary">{t.v(meta.labelKey)}</h2>
      <span className="text-xs text-text-tertiary">{converters.length}</span>
    </div>
  );

  return (
    <section className="space-y-2">
      {linkable ? (
        <Link
          href={`/${lang}/${category}/`}
          className="flex items-center justify-between hover:opacity-80 transition-opacity"
        >
          {heading}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-text-tertiary">
            <path d="M5 3L9 7L5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      ) : (
        heading
      )}
      <div className="grid grid-cols-1 gap-2">
        {converters.map((converter) => (
          <ConverterListItem key={converter.slug} converter={converter} lang={lang} />
        ))}
      </div>
    </section>
  );
}
