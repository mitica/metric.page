import { localesProvider } from "@/lib/locales";
import Link from "next/link";

interface FooterProps {
  lang: string;
}

export default function Footer({ lang }: FooterProps) {
  const year = new Date().getFullYear();
  const t = localesProvider.lang(lang);

  return (
    <footer className="mt-12 border-t border-border/60 px-4 py-8 text-sm sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 text-text-secondary sm:flex-row sm:items-center sm:justify-between">
        <p className="leading-relaxed">
          © {year} metric.page. {t.footer_built_with()}
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <Link href={`/${lang}/`} className="transition-colors hover:text-text-primary">
            {t.footer_home()}
          </Link>
          <Link
            href="https://github.com/mitica/metric.page"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-text-primary"
          >
            GitHub
          </Link>
          <span className="text-text-tertiary">{t.footer_tagline()}</span>
        </div>
      </div>
    </footer>
  );
}