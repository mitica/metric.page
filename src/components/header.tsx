"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { languages, localesProvider } from "@/lib/locales";

interface HeaderProps {
  lang: string;
}

export default function Header({ lang }: HeaderProps) {
  const pathname = usePathname();
  const t = localesProvider.lang(lang);

  // Build path for language switch
  const switchLangPath = (newLang: string) => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length > 0) segments[0] = newLang;
    else segments.push(newLang);
    return `/${segments.join("/")}/`;
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-12 max-w-5xl items-center justify-between px-4">
        {/* Logo */}
        <Link href={`/${lang}/`} className="flex items-center gap-2">
          <span className="text-lg font-bold text-accent">metric</span>
          <span className="text-lg font-light text-text-secondary">.page</span>
        </Link>

        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <div className="relative">
          <select
            value={lang}
            onChange={(e) => {
              const newPath = switchLangPath(e.target.value);
              window.location.href = newPath;
            }}
            aria-label={localesProvider.lang(lang).common_select_language()}
            className="!bg-surface/80 !py-1.5 !pl-3 !pr-8 !text-sm !border-border/50 !rounded-lg appearance-none cursor-pointer"
          >
            {languages.map((l) => (
              <option key={l.code} value={l.code}>
                {l.nativeName}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-text-tertiary">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M3 5L6 8L9 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          </div>
        </div>
      </div>
    </header>
  );
}
