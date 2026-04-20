import { languageCodes, getLanguage } from "@/lib/locales";
import Header from "@/components/header";
import Footer from "@/components/footer";

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
    <div dir={language.dir} lang={lang} className="flex min-h-screen flex-col">
      <Header lang={lang} />
      <main className="flex-1">{children}</main>
      <Footer lang={lang} />
    </div>
  );
}
