import {expect, test} from "@playwright/test";

test("an unknown URL gets a branded 404, not the host's", async ({page}) => {
    const response = await page.goto("/definitely-not-a-page/");

    expect(response?.status()).toBe(404);
    await expect(page.getByRole("heading", {level: 1})).toHaveText("Page not found");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    await expect(page.locator("link[rel=canonical]")).toHaveCount(0);
    await expect(page.locator("link[rel=alternate]")).toHaveCount(0);
});

test("the 404 reserves no room for a header it does not render", async ({page}) => {
    await page.goto("/definitely-not-a-page/");

    const {paddingTop, headingTop, viewport} = await page.evaluate(() => ({
        paddingTop: getComputedStyle(document.querySelector("main")!).paddingTop,
        headingTop: Math.round(document.querySelector("h1")!.getBoundingClientRect().top),
        viewport: window.innerHeight,
    }));

    expect(paddingTop).toBe("0px");
    expect(headingTop, "the heading is below the fold").toBeLessThan(viewport / 2);
});

test("the 404 offers a way back to the CV that actually works", async ({page}) => {
    await page.goto("/definitely-not-a-page/");

    await page.getByRole("link", {name: /go to the cv/i}).click();

    await expect(page.getByRole("heading", {level: 1})).toHaveText("David Valenciano");
});

test("the 404 is styled, not raw HTML", async ({page}) => {
    await page.goto("/definitely-not-a-page/");

    const styled = await page
        .locator(".error-title")
        .evaluate((node) => getComputedStyle(node).fontSize !== "32px");
    expect(styled, "the 404 rendered without the site stylesheet").toBe(true);
});

const LEGACY = [
    {from: "/home/", lands: ""},
    {from: "/resume/", lands: "experience"},
    {from: "/skills/", lands: "stack"},
];

for (const {from, lands} of LEGACY) {
    test(`the old ${from} URL sends visitors to the CV`, async ({page}) => {
        await page.goto(from);

        await expect(page.getByRole("heading", {level: 1})).toHaveText("David Valenciano");
        if (lands) {
            expect(page.url()).toContain(`#${lands}`);
        }
    });

    test(`the old ${from} URL tells crawlers to drop it`, async ({page}) => {
        const html = await (await page.request.get(from)).text();

        expect(html).toContain('name="robots" content="noindex, follow"');
        expect(html).not.toContain('rel="canonical"');
        expect(html).not.toContain('rel="alternate"');
        expect(html).toContain("Continue to the CV");
    });

    test(`the old ${from} URL is inside the security policy, not a hole in it`, async ({page}) => {
        const html = await (await page.request.get(from)).text();

        expect(html).toContain('http-equiv="Content-Security-Policy"');
        expect(html).toContain('name="referrer"');
        expect(html).not.toMatch(/<script(?![^>]*\bsrc=)/);
    });
}
