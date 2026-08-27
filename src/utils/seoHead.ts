import {ogLocale, supportedLanguages, type SupportedLanguage, type Translate} from "../i18n.tsx";

export const applySeoMetadata = (language: SupportedLanguage, t: Translate): void => {
    const set = (selector: string, attribute: string, value: string): void => {
        document.querySelector(selector)?.setAttribute(attribute, value);
    };

    document.documentElement.lang = language;
    document.title = t("seo.title");

    set('meta[name="description"]', "content", t("seo.description"));

    set('meta[property="og:title"]', "content", t("seo.title"));
    set('meta[property="og:description"]', "content", t("seo.og_description"));
    set('meta[property="og:image:alt"]', "content", t("seo.image_alt"));
    set('meta[property="og:locale"]', "content", ogLocale[language]);

    const other = supportedLanguages.find((candidate) => candidate !== language);
    if (other) {
        set('meta[property="og:locale:alternate"]', "content", ogLocale[other]);
    }

    set('meta[name="twitter:title"]', "content", t("seo.title"));
    set('meta[name="twitter:description"]', "content", t("seo.og_description"));
    set('meta[name="twitter:image:alt"]', "content", t("seo.image_alt"));

    const alternate = document.querySelector<HTMLLinkElement>(
        `link[rel="alternate"][hreflang="${language}"]`,
    );
    if (alternate) {
        set('link[rel="canonical"]', "href", alternate.href);
        set('meta[property="og:url"]', "content", alternate.href);
    }

    applyStructuredData(language, t, alternate?.href);
};

const applyStructuredData = (
    language: SupportedLanguage,
    t: Translate,
    url: string | undefined,
): void => {
    const script = document.querySelector('script[type="application/ld+json"]');
    if (!script?.textContent) {
        return;
    }

    let graph: Record<string, unknown>;
    try {
        graph = JSON.parse(script.textContent) as Record<string, unknown>;
    } catch {
        return;
    }

    const person = (graph.mainEntity ?? graph) as Record<string, unknown>;
    person.jobTitle = t("seo.job_title");
    person.description = t("seo.description");
    if (url) {
        person.url = url;
    }
    graph.inLanguage = language;

    script.textContent = JSON.stringify(graph, null, 2);
};
