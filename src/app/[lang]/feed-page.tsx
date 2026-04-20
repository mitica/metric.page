"use client";

import Feed from "@/components/feed";
import { allConverters } from "@/converters/registry";

export default function FeedPage({ lang }: { lang: string }) {
  return <Feed converters={allConverters} lang={lang} />;
}
