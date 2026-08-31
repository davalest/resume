import {readFileSync} from "node:fs";
import {globSync} from "node:fs";
import {describe, expect, it} from "vitest";
import {supportedLanguages} from "../utils/i18n.ts";
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

describe("interface copy is all reachable", () => {
    const source = [
        ...globSync("src/**/*.astro"),
        ...globSync("src/**/*.ts").filter((file) => !file.endsWith(".test.ts")),
    ]
        .map((file) => readFileSync(file, "utf-8"))
        .join("\n");

    it("has no key the site never asks for", () => {
        const orphans = leaves(bundles.en)
            .map(([key]) => key)
            .filter((key) => !source.includes(`"${key}"`));

        expect(orphans).toEqual([]);
    });
});
