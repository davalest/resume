import {test, expect} from "@playwright/test";
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
    await expect(page.locator(".lang-link.active")).toHaveAttribute("lang", "en");

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

test("no interactive target is smaller than 24 by 24", async ({page}) => {
    await page.goto("/");
    await expect(page.locator(".lang-link.active")).toHaveAttribute("lang", "en");

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
    await expect(page.locator(".lang-link.active")).toHaveAttribute("lang", "en");

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
