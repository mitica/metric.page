"use client";

import { useEffect } from "react";
import { defaultLanguage, languageCodes, languages } from "@/lib/locales";
import Header from "@/components/header";
import Footer from "@/components/footer";

function detectLang(): string {
  if (typeof navigator === "undefined") return defaultLanguage;
  const preferred = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const tag of preferred) {
    const code = tag.split("-")[0].toLowerCase();
    if (languageCodes.includes(code)) return code;
  }
  return defaultLanguage;
}

export default function RootPage() {
  useEffect(() => {
    window.location.replace(`/${detectLang()}/`);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Header lang={defaultLanguage} />
      <main className="flex-1">
        <div className="mx-auto max-w-2xl px-4 py-8">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-text-primary">metric.page</h1>
            <p className="mt-1 text-sm text-text-secondary">Free online converters and calculators in 22 languages.</p>
          </div>
          <ul className="flex flex-wrap gap-2 justify-center">
            {languages.map((l) => (
              <li key={l.code}>
                <a href={`/${l.code}/`} hrefLang={l.code} className="inline-block px-3 py-1 rounded-full border border-border text-sm text-text-secondary hover:text-text-primary">{l.nativeName}</a>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer lang={defaultLanguage} />
    </div>
  );
}
