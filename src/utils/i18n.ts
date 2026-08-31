import en from "../locales/en/translation.json";
import esBundle from "../locales/es/translation.json";
import {locales, supportedLanguages, type SupportedLanguage} from "../../site.config.ts";

// Typing `es` as the English bundle is what makes a missing Spanish key a
// compile error rather than a runtime fallback to the key name.
const es: typeof en = esBundle;

export {supportedLanguages, type SupportedLanguage};

export const fallbackLanguage: SupportedLanguage = "en";

export type Localised = Record<SupportedLanguage, string>;

export const languageNames: Record<SupportedLanguage, string> = {
    en: "English",
    es: "Español",
};

export const ogLocale = Object.fromEntries(
    locales.map(({code, ogLocale: value}) => [code, value]),
) as Record<SupportedLanguage, string>;

type Paths<T> = {
    [K in keyof T & string]: T[K] extends string ? K : `${K}.${Paths<T[K]>}`;
}[keyof T & string];

export type TranslationKey = Paths<typeof en>;

export type Translate = (key: TranslationKey, vars?: Record<string, string | number>) => string;

export type Pick = (value: Localised) => string;

const bundles: Record<SupportedLanguage, unknown> = {en, es};

export const translator =
    (language: SupportedLanguage): Translate =>
        (key, vars) => {
            const value = key
                .split(".")
                .reduce<unknown>(
                    (node, part) =>
                        typeof node === "object" && node !== null
                            ? (node as Record<string, unknown>)[part]
                            : undefined,
                    bundles[language],
                );

            if (typeof value !== "string") {
                return key;
            }

            return vars
                ? value.replace(/\{\{(\w+)}}/g, (_, name: string) => String(vars[name] ?? ""))
                : value;
        };

export const picker =
    (language: SupportedLanguage): Pick =>
        (value) =>
            value[language];

export const useTranslations = (
    language: SupportedLanguage,
): {t: Translate; pick: Pick; language: SupportedLanguage} => ({
    language,
    t: translator(language),
    pick: picker(language),
});

/** The language a pathname resolves to, used by the tests and the 404 page. */
export const languageFromPath = (pathname: string, base = "/"): SupportedLanguage => {
    const relative = pathname.startsWith(base)
        ? pathname.slice(base.length)
        : pathname.replace(/^\//, "");
    const [segment] = relative.split("/");

    return (
        locales.find(({code, route}) => code !== fallbackLanguage && route === `${segment}/`)
            ?.code ?? fallbackLanguage
    );
};
