import {createContext, useContext, useEffect, useMemo, useState, type ReactNode} from "react";
import en from "./locales/en/translation.json";
import esBundle from "./locales/es/translation.json";

const es: typeof en = esBundle;

export const supportedLanguages = ["en", "es"] as const;

export type SupportedLanguage = (typeof supportedLanguages)[number];

export const fallbackLanguage: SupportedLanguage = "en";
export type Localised = Record<SupportedLanguage, string>;

export const languageNames: Record<SupportedLanguage, string> = {
    en: "English",
    es: "Español",
};

export const ogLocale: Record<SupportedLanguage, string> = {
    en: "en_GB",
    es: "es_ES",
};

const languageSegment: Record<SupportedLanguage, string> = {
    en: "",
    es: "es/",
};

const base = import.meta.env.BASE_URL;

export const languageFromPath = (
    pathname: string = window.location.pathname,
): SupportedLanguage => {
    const relative = pathname.startsWith(base)
        ? pathname.slice(base.length)
        : pathname.replace(/^\//, "");
    const [segment] = relative.split("/");

    return (
        supportedLanguages.find(
            (language) =>
                language !== fallbackLanguage && languageSegment[language] === `${segment}/`,
        ) ?? fallbackLanguage
    );
};

export const pathForLanguage = (language: SupportedLanguage): string =>
    `${base}${languageSegment[language]}`;

type Paths<T> = {
    [K in keyof T & string]: T[K] extends string ? K : `${K}.${Paths<T[K]>}`;
}[keyof T & string];

export type TranslationKey = Paths<typeof en>;

export type Translate = (key: TranslationKey, vars?: Record<string, string | number>) => string;

const bundles: Record<SupportedLanguage, unknown> = {en, es};

const createTranslator =
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

interface I18n {
    language: SupportedLanguage;
    t: Translate;
    pick: (value: Localised) => string;
    switchTo: (language: SupportedLanguage) => void;
}

const I18nContext = createContext<I18n | null>(null);

export const I18nProvider = ({
                                 initialLanguage,
                                 children,
                             }: {
    initialLanguage?: SupportedLanguage;
    children: ReactNode;
}) => {
    const [language, setLanguage] = useState<SupportedLanguage>(
        () => initialLanguage ?? languageFromPath(),
    );

    useEffect(() => {
        const onPopState = () => setLanguage(languageFromPath());
        window.addEventListener("popstate", onPopState);
        return () => window.removeEventListener("popstate", onPopState);
    }, []);

    const value = useMemo<I18n>(
        () => ({
            language,
            t: createTranslator(language),
            pick: (localised) => localised[language],
            switchTo: (next) => {
                if (next === language) {
                    return;
                }
                window.history.pushState(null, "", pathForLanguage(next));
                setLanguage(next);
            },
        }),
        [language],
    );

    return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = (): I18n => {
    const value = useContext(I18nContext);

    if (!value) {
        throw new Error("useI18n must be used inside <I18nProvider>");
    }

    return value;
};
