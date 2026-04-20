import { languageCodes, getLanguage } from "@/lib/locales";
import Header from "@/components/header";

export function generateStaticParams() {
  return languageCodes.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const language = getLanguage(lang);

  return (
    <div dir={language.dir} lang={lang}>
      <Header lang={lang} />
      <main>{children}</main>
    </div>
  );
}
