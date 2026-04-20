"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { languages, localesProvider } from "@/lib/locales";

interface HeaderProps {
  lang: string;
}

export default function Header({ lang }: HeaderProps) {
  const pathname = usePathname();
  const t = localesProvider.lang(lang);
  const isHome = pathname === `/${lang}` || pathname === `/${lang}/`;

  // Build path for language switch
  const switchLangPath = (newLang: string) => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length > 0) segments[0] = newLang;
    else segments.push(newLang);
    return `/${segments.join("/")}/`;
  };

  return (
    <header className="relative z-20 px-4 pt-2 sm:px-6 sm:pt-3">
      <div className="mx-auto flex h-12 max-w-6xl items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href={`/${lang}/`} className="group flex items-center gap-2.5">
            <Image src="/icon.svg" alt="metric.page" width={20} height={20} />
            <span className="text-[1rem] font-semibold tracking-tight text-white">
              metric<span className="font-normal text-accent">.page</span>
            </span>
          </Link>

          {!isHome && (
            <Link
              href={`/${lang}/`}
              className="hidden items-center gap-1.5 text-xs font-medium text-text-secondary transition-colors hover:text-text-primary sm:inline-flex"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path
                  d="M7.5 2.5L4 6L7.5 9.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {t.common_back()}
            </Link>
          )}
        </div>

        <nav aria-label={t.common_select_language()} className="flex items-center gap-2">
          {languages.map((l) => {
            const active = l.code === lang;
            return (
              <Link
                key={l.code}
                href={switchLangPath(l.code)}
                className={`rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.08em] transition-colors ${
                  active
                    ? "bg-accent text-white"
                    : "text-text-secondary hover:bg-white/8 hover:text-white"
                }`}
                aria-current={active ? "page" : undefined}
                title={l.nativeName}
              >
                {l.code}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
