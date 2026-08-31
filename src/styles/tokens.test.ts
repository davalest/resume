import {readFileSync, readdirSync} from "node:fs";
import path from "node:path";
import {describe, expect, it} from "vitest";

const STYLES_DIR = "src/styles";

const scssFiles = (dir: string): string[] =>
    readdirSync(dir, {withFileTypes: true}).flatMap((entry) => {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            return scssFiles(full);
        }
        return entry.name.endsWith(".scss") ? [full] : [];
    });

const files = scssFiles(STYLES_DIR);
const read = (file: string): string => readFileSync(file, "utf-8");

const tokensSource = read(path.join(STYLES_DIR, "_tokens.scss"));

const declared = new Set(
    [...tokensSource.matchAll(/^\s*(--[a-z0-9-]+)\s*:/gm)].map(([, name]) => name!),
);

const used = files.flatMap((file) =>
    [...read(file).matchAll(/var\(\s*(--[a-z0-9-]+)\s*(,|\))/g)].map(([, name, next]) => ({
        file,
        name: name!,
        hasFallback: next === ",",
    })),
);

const lightSchemeBlock = (source: string): string => {
    const start = source.indexOf("@media (prefers-color-scheme: light)");
    if (start === -1) {
        return "";
    }

    let depth = 0;
    for (let index = source.indexOf("{", start); index < source.length; index += 1) {
        if (source[index] === "{") {
            depth += 1;
        } else if (source[index] === "}") {
            depth -= 1;
            if (depth === 0) {
                return source.slice(start, index);
            }
        }
    }
    return source.slice(start);
};

const themeFlipping = new Set(
    [...lightSchemeBlock(tokensSource).matchAll(/^\s*(--color-[a-z0-9-]+)\s*:/gm)].map(
        ([, name]) => name!,
    ),
);

const SURFACE_FILES = ["components/_header.scss", "components/_footer.scss"].map((file) =>
    path.join(STYLES_DIR, file),
);

describe("design tokens", () => {
    it("finds the token sheet and the stylesheets that read it", () => {
        expect(declared.size).toBeGreaterThan(10);
        expect(used.length).toBeGreaterThan(30);
        expect(themeFlipping.size).toBeGreaterThan(0);
    });

    it("resolves every var() to a token that exists", () => {
        const unknown = used
            .filter(({name, hasFallback}) => !declared.has(name) && !hasFallback)
            .map(({file, name}) => `${file}: ${name}`);

        expect(unknown).toEqual([]);
    });

    it("declares no token the stylesheets never read", () => {
        const readNames = new Set(used.map(({name}) => name));
        // --header-height-design is read by headerBand.ts, not by CSS.
        const scriptOnly = new Set(["--header-height-design"]);
        const orphans = [...declared].filter(
            (name) => !readNames.has(name) && !scriptOnly.has(name),
        );

        expect(orphans).toEqual([]);
    });

    it("keeps theme-flipping tokens off the always-dark header and footer", () => {
        const leaks = SURFACE_FILES.flatMap((file) =>
            used
                .filter((entry) => entry.file === file && themeFlipping.has(entry.name))
                .map(({name}) => `${path.basename(file)} paints ${name} on --color-surface`),
        );

        expect(leaks).toEqual([]);
    });

    it("never redefines a surface token inside the light-scheme block", () => {
        const surfaceTokens = [...declared].filter(
            (name) => name.includes("-on-surface") || name.includes("-on-dark"),
        );

        expect(surfaceTokens.length).toBeGreaterThan(0);
        expect(surfaceTokens.filter((name) => themeFlipping.has(name))).toEqual([]);
    });
});
