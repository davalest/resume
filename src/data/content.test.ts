import {describe, expect, it} from "vitest";
import {supportedLanguages} from "../utils/i18n.ts";
import {navSections} from "../utils/navigation.ts";
import {earlierRoles, featuredRoles} from "./roles.ts";
import {specialties} from "./specialties.ts";
import {stackGroups} from "./stack.ts";
import {studies} from "./studies.ts";

const isLocalised = (value: unknown): value is Record<string, string> =>
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    supportedLanguages.every(
        (language) => typeof (value as Record<string, unknown>)[language] === "string",
    );

const localisedValues = (
    value: unknown,
    path: string,
    found: {path: string; value: Record<string, string>}[] = [],
): {path: string; value: Record<string, string>}[] => {
    if (isLocalised(value)) {
        found.push({path, value});
    } else if (Array.isArray(value)) {
        value.forEach((item, index) => localisedValues(item, `${path}[${index}]`, found));
    } else if (typeof value === "object" && value !== null) {
        Object.entries(value).forEach(([key, child]) =>
            localisedValues(child, `${path}.${key}`, found),
        );
    }
    return found;
};

const content = localisedValues(
    {featuredRoles, earlierRoles, studies, stackGroups, specialties, navSections},
    "content",
);

describe("content", () => {
    it("has something to check", () => {
        expect(content.length).toBeGreaterThan(30);
    });

    it("has no empty strings in any language", () => {
        const empty = content.flatMap(({path, value}) =>
            supportedLanguages
                .filter((language) => value[language]?.trim() === "")
                .map((language) => `${path}.${language}`),
        );
        expect(empty).toEqual([]);
    });

    it("carries no unfilled placeholders", () => {
        const unfilled = content.filter(({value}) =>
            supportedLanguages.some((language) => /\[.+\]/.test(value[language] ?? "")),
        );
        expect(unfilled.map(({path}) => path)).toEqual([]);
    });

    it("does not leave prose untranslated", () => {
        const untranslated = content
            .filter(({value}) => (value.en ?? "").split(" ").length > 6)
            .filter(({value}) => value.en === value.es);
        expect(untranslated.map(({path}) => path)).toEqual([]);
    });
});
