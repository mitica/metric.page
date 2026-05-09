export interface Language {
  code: string;
  name: string;
  nativeName: string;
  dir: "ltr" | "rtl";
}

export const languages: Language[] = [
  { code: "en", name: "English", nativeName: "English", dir: "ltr" },
  // Add more languages here when translations are ready
  { code: "es", name: "Spanish", nativeName: "Español", dir: "ltr" },
  { code: "fr", name: "French", nativeName: "Français", dir: "ltr" },
  { code: "de", name: "German", nativeName: "Deutsch", dir: "ltr" },
  { code: "pt", name: "Portuguese", nativeName: "Português", dir: "ltr" },
  { code: "it", name: "Italian", nativeName: "Italiano", dir: "ltr" },
  { code: "nl", name: "Dutch", nativeName: "Nederlands", dir: "ltr" },
  { code: "pl", name: "Polish", nativeName: "Polski", dir: "ltr" },
  { code: "ro", name: "Romanian", nativeName: "Română", dir: "ltr" },
  // { code: "sv", name: "Swedish", nativeName: "Svenska", dir: "ltr" },
  // { code: "cs", name: "Czech", nativeName: "Čeština", dir: "ltr" },
  // { code: "uk", name: "Ukrainian", nativeName: "Українська", dir: "ltr" },
  // { code: "tr", name: "Turkish", nativeName: "Türkçe", dir: "ltr" },
  { code: "ru", name: "Russian", nativeName: "Русский", dir: "ltr" },
  // { code: "ja", name: "Japanese", nativeName: "日本語", dir: "ltr" },
  // { code: "ko", name: "Korean", nativeName: "한국어", dir: "ltr" },
  // { code: "zh", name: "Chinese", nativeName: "中文", dir: "ltr" },
  // { code: "hi", name: "Hindi", nativeName: "हिन्दी", dir: "ltr" },
  // { code: "ar", name: "Arabic", nativeName: "العربية", dir: "rtl" },
  // { code: "th", name: "Thai", nativeName: "ไทย", dir: "ltr" },
  // { code: "vi", name: "Vietnamese", nativeName: "Tiếng Việt", dir: "ltr" },
  // { code: "id", name: "Indonesian", nativeName: "Bahasa Indonesia", dir: "ltr" },
];

export const defaultLanguage = "en";

export const languageCodes = languages.map((l) => l.code);

export function getLanguage(code: string): Language {
  return languages.find((l) => l.code === code) ?? languages[0];
}

export function isValidLanguage(code: string): boolean {
  return languageCodes.includes(code);
}
