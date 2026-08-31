import {describe, expect, it} from "vitest";
import {seoFor} from "./seo.ts";
import {earlierRoles, featuredRoles} from "../data/roles.ts";
import {studies} from "../data/studies.ts";
import {email, socialLinks} from "../data/contact.ts";
import {locales, supportedLanguages, urlForLocale} from "../../site.config.ts";
import en from "../locales/en/translation.json";
import es from "../locales/es/translation.json";

const bundles = {en, es};

interface Person {
    jobTitle: string;
    description: string;
    sameAs: string[];
    worksFor: {roleName: string; startDate: string; endDate?: string; worksFor: {name: string}}[];
    alumniOf: {name: string; hasCredential: {name: string}}[];
    [key: string]: unknown;
}

interface Graph {
    "@type": string;
    inLanguage: string;
    dateModified: string;
    mainEntity: Person;
    [key: string]: unknown;
}

const graphFor = (language: (typeof supportedLanguages)[number]): Graph =>
    JSON.parse(seoFor(language).jsonLd) as Graph;

describe.each(supportedLanguages)("SEO metadata for %s", (language) => {
    const seo = seoFor(language);
    const bundle = bundles[language];

    it("takes every visible string from the locale bundle, never a hardcoded copy", () => {
        expect(seo.title).toBe(bundle.seo.title);
        expect(seo.description).toBe(bundle.seo.description);
        expect(seo.ogDescription).toBe(bundle.seo.og_description);
        expect(seo.imageAlt).toBe(bundle.seo.image_alt);
    });

    it("points the canonical at its own URL", () => {
        expect(seo.canonical).toBe(urlForLocale(language));
    });

    it("advertises every language plus x-default, each exactly once", () => {
        const hreflangs = seo.alternates.map(({hreflang}) => hreflang);
        expect(hreflangs).toEqual([...supportedLanguages, "x-default"]);
        expect(new Set(hreflangs).size).toBe(hreflangs.length);
    });

    it("names the other language as the Open Graph alternate", () => {
        const other = locales.find(({code}) => code !== language);
        expect(seo.ogLocaleAlternate).toBe(other?.ogLocale);
    });

    it("emits valid JSON-LD, not a string that merely looks like it", () => {
        expect(() => JSON.parse(seo.jsonLd)).not.toThrow();
    });
});

describe("the structured-data graph", () => {
    it("is a ProfilePage that declares its language and last change", () => {
        const graph = graphFor("en");
        expect(graph["@type"]).toBe("ProfilePage");
        expect(graph.inLanguage).toBe("en");
        expect(new Date(graph.dateModified).toString()).not.toBe("Invalid Date");
    });

    it("carries every job, with the dates the CV shows", () => {
        const roles = [...featuredRoles, ...earlierRoles].filter(({company}) => company);
        const history = graphFor("en").mainEntity.worksFor;

        expect(history).toHaveLength(roles.length);
        for (const [index, role] of roles.entries()) {
            const entry = history[index];
            expect(entry?.worksFor.name).toBe(role.company);
            expect(entry?.startDate).toBe(role.dates.start);
            expect(entry?.endDate).toBe(role.dates.end);
        }
    });

    it("localises the role names it publishes", () => {
        const [first] = graphFor("es").mainEntity.worksFor;
        expect(first?.roleName).toBe(featuredRoles[0]?.title.es);
    });

    it("carries every qualification", () => {
        const alumniOf = graphFor("en").mainEntity.alumniOf;
        expect(alumniOf).toHaveLength(studies.length);
        expect(alumniOf.map(({hasCredential}) => hasCredential.name)).toEqual(
            studies.map(({title}) => title.en),
        );
    });

    it("links out to exactly the profiles the page links to", () => {
        expect(graphFor("en").mainEntity.sameAs).toEqual(socialLinks.map(({href}) => href));
    });

    it("keeps the email address out of the graph, where only scrapers read it", () => {
        expect(seoFor("en").jsonLd).not.toContain(email.label);
        expect(seoFor("es").jsonLd).not.toContain(email.label);
    });
});
