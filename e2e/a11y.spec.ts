import {expect, test} from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const WCAG = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

const pages = [
    {label: "English", url: "/", language: "en"},
    {label: "Spanish", url: "/es/", language: "es"},
] as const;

for (const {label, url, language} of pages) {
    for (const colorScheme of ["light", "dark"] as const) {
        test(`${label} page has no WCAG violations in the ${colorScheme} theme`, async ({
            browser,
        }) => {
            const context = await browser.newContext({colorScheme});
            const page = await context.newPage();

            await page.goto(url);
            await expect(page.locator(".lang-link.active")).toHaveAttribute("lang", language);

            const {violations} = await new AxeBuilder({page}).withTags([...WCAG]).analyze();

            expect(
                violations.map((violation) => ({
                    id: violation.id,
                    impact: violation.impact,
                    nodes: violation.nodes.map((node) => node.target.join(" ")),
                })),
            ).toEqual([]);

            await context.close();
        });
    }
}

test("the first Tab reaches a skip link that moves focus to the content", async ({page}) => {
    await page.goto("/");

    await page.keyboard.press("Tab");
    const skipLink = page.locator(".skip-link");
    await expect(skipLink).toBeFocused();
    await expect(skipLink).toBeInViewport();

    await page.keyboard.press("Enter");
    await expect(page.locator("main#content")).toBeFocused();
});

test("every section is exposed as a region a screen reader can jump to", async ({page}) => {
    await page.goto("/");

    await expect(page.getByRole("region")).toHaveCount(6);
    for (const name of [
        "David Valenciano",
        "Experience",
        "Stack",
        "About",
        "Education",
        "Get in touch",
    ]) {
        await expect(page.getByRole("region", {name, exact: true})).toHaveCount(1);
    }
    await expect(page.getByRole("article")).toHaveCount(3);
});

test("headings descend without skipping a level", async ({page}) => {
    await page.goto("/");

    const levels = await page.evaluate(() =>
        [...document.querySelectorAll("h1, h2, h3, h4, h5, h6")].map((node) =>
            Number(node.tagName[1]),
        ),
    );

    expect(levels[0]).toBe(1);
    expect(levels.filter((level) => level === 1)).toHaveLength(1);
    for (const [index, level] of levels.entries()) {
        if (index > 0) {
            expect(level - levels[index - 1]!, `jump at heading ${index}`).toBeLessThanOrEqual(1);
        }
    }
});

test("no interactive target is smaller than 24 by 24", async ({page}) => {
    await page.goto("/");

    const undersized = await page.evaluate(() => {
        const inlineExceptions = [".about-repo-link"];

        return [...document.querySelectorAll("a[href], button, [tabindex]")]
            .filter((element) => !inlineExceptions.some((selector) => element.matches(selector)))
            .map((element) => ({element, box: element.getBoundingClientRect()}))
            .filter(({box}) => (box.width || box.height) && (box.width < 24 || box.height < 24))
            .map(
                ({element, box}) =>
                    `${element.className || element.tagName}: ${Math.round(box.width)}x${Math.round(box.height)}`,
            );
    });

    expect(undersized).toEqual([]);
});

test("no list loses its role to list-style: none", async ({page}) => {
    await page.goto("/");

    const unrolled = await page.evaluate(() =>
        [...document.querySelectorAll("ul, ol")]
            .filter(
                (list) =>
                    getComputedStyle(list).listStyleType === "none" &&
                    list.getAttribute("role") !== "list",
            )
            .map((list) => list.className || list.tagName),
    );

    expect(unrolled).toEqual([]);
});

for (const colorScheme of ["light", "dark"] as const) {
    test(`control boundaries reach 3:1 in the ${colorScheme} theme`, async ({browser}) => {
        const context = await browser.newContext({colorScheme});
        const page = await context.newPage();
        await page.goto("/");

        const measured = await page.evaluate(() => {
            type Rgba = [number, number, number, number];

            const parse = (value: string): Rgba => {
                const parts = value.match(/[\d.]+/g)?.map(Number) ?? [];
                return [parts[0] ?? 0, parts[1] ?? 0, parts[2] ?? 0, parts[3] ?? 1];
            };

            const over = (top: Rgba, bottom: Rgba): Rgba => [
                top[0] * top[3] + bottom[0] * (1 - top[3]),
                top[1] * top[3] + bottom[1] * (1 - top[3]),
                top[2] * top[3] + bottom[2] * (1 - top[3]),
                1,
            ];

            const luminance = ([r, g, b]: Rgba): number => {
                const channel = (value: number): number => {
                    const scaled = value / 255;
                    return scaled <= 0.04045 ? scaled / 12.92 : ((scaled + 0.055) / 1.055) ** 2.4;
                };
                return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
            };

            const ratio = (a: Rgba, b: Rgba): number => {
                const values = [luminance(a), luminance(b)].sort((x, y) => y - x);
                return ((values[0] ?? 0) + 0.05) / ((values[1] ?? 0) + 0.05);
            };

            const backdrop = (element: Element): Rgba => {
                for (let node: Element | null = element; node; node = node.parentElement) {
                    const colour = parse(getComputedStyle(node).backgroundColor);
                    if (colour[3] > 0) {
                        return colour;
                    }
                }
                return parse(getComputedStyle(document.body).backgroundColor);
            };

            return [...document.querySelectorAll<HTMLElement>(".button")].map((element) => {
                const style = getComputedStyle(element);
                const behind = backdrop(element.parentElement ?? element);

                const fill = parse(style.backgroundColor);
                const border = parse(style.borderTopColor);
                const hasBorder = parseFloat(style.borderTopWidth) > 0 && border[3] > 0;

                const boundary = hasBorder
                    ? over(border, behind)
                    : fill[3] > 0
                      ? over(fill, behind)
                      : null;

                return {
                    label: element.className.trim(),
                    ratio: boundary === null ? null : Number(ratio(boundary, behind).toFixed(2)),
                    underlined: style.textDecorationLine.includes("underline"),
                };
            });
        });

        expect(measured.length, "no buttons were measured").toBeGreaterThan(4);

        const bounded = measured.filter(({ratio}) => ratio !== null);
        expect(bounded.filter(({ratio}) => (ratio ?? 0) < 3)).toEqual([]);

        expect(measured.filter(({ratio, underlined}) => ratio === null && !underlined)).toEqual([]);

        await context.close();
    });
}
