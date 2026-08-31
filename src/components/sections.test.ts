import {experimental_AstroContainer as AstroContainer} from "astro/container";
import {beforeAll, describe, expect, it} from "vitest";
import Experience from "./sections/Experience.astro";
import Stack from "./sections/Stack.astro";
import Education from "./sections/Education.astro";
import Contact from "./sections/Contact.astro";
import About from "./sections/About.astro";
import Header from "./layout/Header.astro";
import {earlierRoles, featuredRoles} from "../data/roles.ts";
import {stackGroups} from "../data/stack.ts";
import {studies} from "../data/studies.ts";
import {navSections} from "../utils/navigation.ts";
import {supportedLanguages, type SupportedLanguage} from "../utils/i18n.ts";

let container: AstroContainer;

beforeAll(async () => {
    container = await AstroContainer.create();
});

const render = (
    component: Parameters<AstroContainer["renderToString"]>[0],
    lang: SupportedLanguage,
): Promise<string> => container.renderToString(component, {props: {lang}});

const countOf = (html: string, pattern: RegExp): number => (html.match(pattern) ?? []).length;

describe("Experience", () => {
    it("renders every role, split into featured and earlier", async () => {
        const html = await render(Experience, "en");
        expect(countOf(html, /class="role"/g)).toBe(featuredRoles.length);
        expect(countOf(html, /class="earlier-role"/g)).toBe(earlierRoles.length);
    });

    it("gives the recent roles context and bullet points", async () => {
        const html = await render(Experience, "en");
        const bullets = featuredRoles.reduce((total, {bullets: b}) => total + b.length, 0);
        expect(countOf(html, /class="role-context"/g)).toBe(featuredRoles.length);
        expect(countOf(html, /<li>/g)).toBe(bullets);
    });

    it("names employers the way a recruiter would recognise them", async () => {
        const html = await render(Experience, "en");
        expect(html).toContain("Docline (Aplicaciones de Salud, S.L.)");
    });

    it("marks up every date bound as machine-readable time", async () => {
        const html = await render(Experience, "en");
        expect(countOf(html, /<time datetime="/g)).toBeGreaterThanOrEqual(
            featuredRoles.length + earlierRoles.length,
        );
        expect(html).toContain('<time datetime="2024-01"');
        expect(html).toContain('<time datetime="2023-11"');
    });

    it("ties every article to its own heading", async () => {
        const html = await render(Experience, "en");
        for (const {id} of featuredRoles) {
            expect(html).toContain(`aria-labelledby="role-${id}-title"`);
            expect(html).toContain(`id="role-${id}-title"`);
        }
    });
});

describe("Stack and Education", () => {
    it("renders every group and every item", async () => {
        const html = await render(Stack, "en");
        expect(countOf(html, /class="stack-group"/g)).toBe(stackGroups.length);
        expect(countOf(html, /class="stack-item"/g)).toBe(
            stackGroups.reduce((total, {items}) => total + items.length, 0),
        );
    });

    it("renders every qualification with its year as a time element", async () => {
        const html = await render(Education, "en");
        expect(countOf(html, /class="study"/g)).toBe(studies.length);
        for (const {year} of studies) {
            if (year) {
                expect(html).toContain(`<time datetime="${year}"`);
            }
        }
    });
});

describe("Contact", () => {
    it("hands the copy button everything it needs, so the script stays generic", async () => {
        const html = await render(Contact, "en");
        expect(html).toContain("data-copy-email");
        expect(html).toContain('data-address="david.valenciano.esteban@gmail.com"');
        expect(html).toContain("data-copied=");
        expect(html).toContain("data-failed=");
    });

    it("keeps a live region for the copy result", async () => {
        expect(await render(Contact, "en")).toContain('role="status"');
    });

    it("offers a mailto that a browser can act on without JavaScript", async () => {
        expect(await render(Contact, "en")).toContain(
            "mailto:david.valenciano.esteban%40gmail.com".replace("%40", "@"),
        );
    });
});

describe("external links", () => {
    it.each(supportedLanguages)("warn %s screen-reader users about the new tab", async (lang) => {
        const html = await render(About, lang);
        expect(html).toContain('target="_blank"');
        expect(html).toContain('rel="noopener"');
        expect(html).toContain('class="visually-hidden"');
    });
});

describe("Header", () => {
    it("links every section, in order", async () => {
        const html = await render(Header, "en");
        for (const {id} of navSections) {
            expect(html).toContain(`data-nav-link="${id}"`);
            expect(html).toContain(`href="#${id}"`);
        }
    });

    it("marks the current language and leaves the other one a real link", async () => {
        const html = await render(Header, "es");
        expect(html).toMatch(/lang-link active[^>]*href="[^"]*es\/"/);
        expect(html).toContain('aria-current="page"');
        expect(html).toContain('hreflang="en"');
    });
});

describe("every section", () => {
    it.each(supportedLanguages)("renders %s copy, never a raw i18n key", async (lang) => {
        const html = (
            await Promise.all(
                [Experience, Stack, About, Education, Contact, Header].map((component) =>
                    render(component, lang),
                ),
            )
        ).join("");
        expect(html).not.toMatch(/>[a-z_]+(\.[a-z_]+)+</);
    });
});
