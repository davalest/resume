import {describe, expect, it} from "vitest";
import {locales} from "../site.config.mjs";
import {languageFromPath, ogLocale, pathForLanguage, supportedLanguages} from "./i18n.tsx";

describe("language routing", () => {
    it("ships the same languages the build prerenders", () => {
        expect(locales.map(({code}) => code)).toEqual([...supportedLanguages]);
    });

    it("puts each language at the path the build writes it to", () => {
        for (const {code, route} of locales) {
            expect(pathForLanguage(code as (typeof supportedLanguages)[number])).toBe(`/${route}`);
        }
    });

    it("resolves each of those paths back to its language", () => {
        for (const {code} of locales) {
            expect(languageFromPath(`/${locales.find((l) => l.code === code)?.route ?? ""}`)).toBe(
                code,
            );
        }
    });

    it("agrees with the build on each language's Open Graph locale", () => {
        for (const {code, ogLocale: prerendered} of locales) {
            expect(ogLocale[code as (typeof supportedLanguages)[number]]).toBe(prerendered);
        }
    });

    it("declares exactly one default language, the one with no prefix", () => {
        const defaults = locales.filter(({isDefault}) => isDefault);
        expect(defaults).toHaveLength(1);
        expect(defaults[0]?.route).toBe("");
    });
});
