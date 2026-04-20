import { Locales, parseTranslationData } from "localizy";
import { LocalizyLocales, LocalizyLocalesProvider } from "./generated-locales";
import { defaultLanguage, languageCodes } from "./languages";

export class AppLocalizyLocales extends LocalizyLocales {}

export class LocalesProvider extends LocalizyLocalesProvider<AppLocalizyLocales> {
  protected createInstance(t: Locales) {
    return new AppLocalizyLocales(t);
  }
}

function loadTranslationData(lang: string) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return parseTranslationData(require(`../../../locales/${lang}.json`));
  } catch {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return parseTranslationData(require(`../../../locales/${defaultLanguage}.json`));
  }
}

export const localesProvider = new LocalesProvider({
  data: languageCodes.reduce(
    (acc, lang) => {
      acc[lang] = loadTranslationData(lang);
      return acc;
    },
    {} as Record<string, ReturnType<typeof loadTranslationData>>,
  ),
  throwUndefinedKey: false,
});
