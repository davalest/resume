export const siteUrl = "https://davalest.github.io/resume/";

export const basePath = process.env.GITHUB_PAGES === "true" ? new URL(siteUrl).pathname : "/";

export const locales = [
    {code: "en", route: "", ogLocale: "en_GB", isDefault: true},
    {code: "es", route: "es/", ogLocale: "es_ES", isDefault: false},
];

export const cvDownloads = ["cv/David-Valenciano-CV-EN.pdf", "cv/David-Valenciano-CV-ES.pdf"];

export const urlForLocale = (code) => {
    const locale = locales.find((candidate) => candidate.code === code);
    if (!locale) {
        throw new Error(`site.config: unknown locale ${code}`);
    }
    return `${siteUrl}${locale.route}`;
};
