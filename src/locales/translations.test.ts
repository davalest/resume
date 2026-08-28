import {describe, expect, it} from "vitest";
import {supportedLanguages} from "../i18n.tsx";
import en from "./en/translation.json";
import es from "./es/translation.json";

const bundles: Record<string, unknown> = {en, es};

const leaves = (value: unknown, prefix = ""): [string, unknown][] =>
    typeof value === "object" && value !== null
        ? Object.entries(value).flatMap(([key, child]) =>
              leaves(child, prefix ? `${prefix}.${key}` : key),
          )
        : [[prefix, value]];

describe.each(supportedLanguages)("%s interface copy", (language) => {
    const entries = leaves(bundles[language]);

    it("has no empty strings", () => {
        expect(entries.filter(([, value]) => String(value).trim() === "")).toEqual([]);
    });

    it("carries no unfilled content placeholders", () => {
        expect(entries.filter(([, value]) => /\[.+\]/.test(String(value)))).toEqual([]);
    });
});

describe("interface copy bundles", () => {
    it("are key-for-key in sync across languages", () => {
        const [reference, ...rest] = supportedLanguages.map((language) =>
            leaves(bundles[language])
                .map(([key]) => key)
                .sort(),
        );
        rest.forEach((keys) => expect(keys).toEqual(reference));
    });
});
