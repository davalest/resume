import {describe, expect, it} from "vitest";
import {contentSecurityPolicy, developmentPolicy, productionPolicy} from "./csp.ts";

const directives = (policy: string): Map<string, string[]> =>
    new Map(
        policy.split(";").map((part) => {
            const [name, ...values] = part.trim().split(/\s+/);
            return [name ?? "", values];
        }),
    );

describe("the production policy", () => {
    const production = directives(productionPolicy);

    it("allows nothing by default", () => {
        expect(production.get("default-src")).toEqual(["'none'"]);
    });

    it("carries no unsafe escape hatch anywhere", () => {
        expect(productionPolicy).not.toContain("unsafe-inline");
        expect(productionPolicy).not.toContain("unsafe-eval");
        expect(productionPolicy).not.toContain("unsafe-hashes");
    });

    it("lets nothing off-origin load or be contacted", () => {
        for (const name of [
            "script-src",
            "style-src",
            "img-src",
            "media-src",
            "font-src",
            "connect-src",
        ]) {
            expect(production.get(name), name).toEqual(["'self'"]);
        }
    });

    it("pins down the two directives a stray injection would abuse", () => {
        expect(production.get("base-uri")).toEqual(["'none'"]);
        expect(production.get("form-action")).toEqual(["'none'"]);
    });

    it("upgrades any insecure subresource", () => {
        expect(productionPolicy).toContain("upgrade-insecure-requests");
    });
});

describe("the development policy", () => {
    it("relaxes exactly what Vite's dev server needs, and nothing else", () => {
        const development = directives(developmentPolicy);
        const production = directives(productionPolicy);

        expect(development.get("style-src")).toEqual(["'self'", "'unsafe-inline'"]);
        expect(development.get("script-src")).toEqual(["'self'", "'unsafe-inline'"]);
        expect(development.get("connect-src")).toEqual(["'self'"]);

        const relaxed = ["style-src", "script-src"];
        for (const [name, values] of production) {
            if (!relaxed.includes(name)) {
                expect(development.get(name), name).toEqual(values);
            }
        }
    });
});

describe("the policy the pages actually carry", () => {
    it("is the strict one whenever this is not the dev server", () => {
        expect(contentSecurityPolicy(false)).toBe(productionPolicy);
        expect(contentSecurityPolicy(true)).toBe(developmentPolicy);
    });

    it("claims nothing a meta tag cannot actually enforce", () => {
        expect(productionPolicy).not.toContain("frame-ancestors");
        expect(productionPolicy).not.toContain("report-uri");
        expect(productionPolicy).not.toContain("report-to");
        expect(productionPolicy).not.toContain("sandbox");
    });

    it("carries the two directives a meta tag does enforce and we would miss", () => {
        expect(productionPolicy).toContain("base-uri 'none'");
        expect(productionPolicy).toContain("upgrade-insecure-requests");
    });
});
