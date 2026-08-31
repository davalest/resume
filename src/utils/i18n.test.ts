import {describe, expect, it} from "vitest";
import {
    basePath,
    locales,
    pathForLocale,
    supportedLanguages,
    urlForLocale,
} from "../../site.config.ts";
import {languageFromPath, ogLocale, translator, picker} from "./i18n.ts";

describe("language routing", () => {
    it("ships the same languages the build renders", () => {
        expect(locales.map(({code}) => code)).toEqual([...supportedLanguages]);
    });

    it("declares exactly one default language, the one with no prefix", () => {
        const defaults = locales.filter(({isDefault}) => isDefault);
        expect(defaults).toHaveLength(1);
        expect(defaults[0]?.route).toBe("");
    });

    it("puts each language at the path the build writes it to", () => {
        for (const {code, route} of locales) {
            expect(pathForLocale(code)).toBe(`${basePath}${route}`);
        }
    });

    it("resolves each of those paths back to its language", () => {
        for (const {code} of locales) {
            expect(languageFromPath(pathForLocale(code), basePath)).toBe(code);
        }
    });

    it("falls back to the default language for anything it does not recognise", () => {
        expect(languageFromPath("/fr/", basePath)).toBe("en");
        expect(languageFromPath("/", basePath)).toBe("en");
    });

    it("builds absolute URLs on the canonical origin", () => {
        for (const {code, route} of locales) {
            expect(urlForLocale(code)).toMatch(new RegExp(`/${route}$`));
            expect(urlForLocale(code).startsWith("https://")).toBe(true);
        }
    });

    it("agrees with the build on each language's Open Graph locale", () => {
        for (const {code, ogLocale: expected} of locales) {
            expect(ogLocale[code]).toBe(expected);
        }
    });
});

describe("translator", () => {
    it("returns the string for a known key", () => {
        expect(translator("en")("header.name")).toBe("David Valenciano");
        expect(translator("es")("about.title")).toBe("Sobre mí");
    });

    it("interpolates named variables", () => {
        expect(translator("en")("contact.copy_failed", {email: "a@b.c"})).toContain("a@b.c");
    });

    it("leaves an unknown variable empty rather than printing the placeholder", () => {
        expect(translator("en")("contact.copy_failed", {})).not.toContain("{{");
    });

    it("returns the key itself when the path does not resolve to a string", () => {
        // @ts-expect-error deliberately asking for a branch, not a leaf
        expect(translator("en")("contact")).toBe("contact");
    });
});

describe("picker", () => {
    it("selects the requested language from a localised value", () => {
        const value = {en: "Experience", es: "Experiencia"};
        expect(picker("en")(value)).toBe("Experience");
        expect(picker("es")(value)).toBe("Experiencia");
    });
});
