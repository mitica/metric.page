import { redirect } from "next/navigation";
import { defaultLanguage } from "@/lib/locales";

export default function RootPage() {
  redirect(`/${defaultLanguage}/`);
}
