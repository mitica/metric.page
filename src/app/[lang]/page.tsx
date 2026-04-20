import { Metadata } from "next";
import { localesProvider, languageCodes } from "@/lib/locales";
import { buildMetadata } from "@/lib/seo";
import FeedPage from "./feed-page";

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

  return <FeedPage lang={lang} />;
}
