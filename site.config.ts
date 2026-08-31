export const supportedLanguages = ["en", "es"] as const;

export type SupportedLanguage = (typeof supportedLanguages)[number];

export interface Locale {
    readonly code: SupportedLanguage;
    readonly route: "" | "es/";
    readonly ogLocale: string;
    readonly isDefault: boolean;
}

export const locales = [
    {code: "en", route: "", ogLocale: "en_GB", isDefault: true},
    {code: "es", route: "es/", ogLocale: "es_ES", isDefault: false},
] as const satisfies readonly Locale[];

export const defaultLocale = locales.find(({isDefault}) => isDefault) ?? locales[0];

export const siteUrl: string = process.env.SITE_URL ?? "https://davalest.github.io/resume/";

export const basePath: string =
    process.env.GITHUB_PAGES === "true" ? new URL(siteUrl).pathname : "/";

export const urlForLocale = (code: SupportedLanguage): string => {
    const locale = locales.find((candidate) => candidate.code === code);
    if (!locale) {
        throw new Error(`site.config: unknown locale ${code}`);
    }
    return `${siteUrl}${locale.route}`;
};

export const pathForLocale = (code: SupportedLanguage): string => {
    const locale = locales.find((candidate) => candidate.code === code);
    if (!locale) {
        throw new Error(`site.config: unknown locale ${code}`);
    }
    return `${basePath}${locale.route}`;
};

export const cvFilesInPublic = [
    "cv/David-Valenciano-CV-EN.pdf",
    "cv/David-Valenciano-CV-ES.pdf",
] as const;

export const legacyRoutes = [
    {from: "home", hash: ""},
    {from: "resume", hash: "#experience"},
    {from: "skills", hash: "#stack"},
] as const;
