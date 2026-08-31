import {expect, test} from "@playwright/test";

test("each language is its own URL, reachable from the other", async ({page}) => {
    await page.goto("/");

    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.getByRole("heading", {level: 1})).toHaveText("David Valenciano");
    await expect(page.locator(".nav-link").first()).toHaveText("Experience");

    await page.getByRole("link", {name: /español/i}).click();

    await expect(page).toHaveURL(/\/es\/$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "es");
    await expect(page.locator(".nav-link").first()).toHaveText("Experiencia");

    await page.getByRole("link", {name: /english/i}).click();
    await expect(page).toHaveURL(/\/$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
});

test("the Spanish document carries Spanish metadata, not patched-in metadata", async ({page}) => {
    await page.goto("/es/");

    await expect(page).toHaveTitle(/Senior Front-End Engineer/);
    await expect(page.locator("link[rel=canonical]")).toHaveAttribute("href", /\/resume\/es\/$/);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
        "content",
        /Senior Front-End Engineer en Madrid/,
    );
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute(
        "content",
        /Abierto a roles senior/,
    );
    await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute("content", "es_ES");
    await expect(page.locator('meta[property="og:locale:alternate"]')).toHaveAttribute(
        "content",
        "en_GB",
    );
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
        "content",
        /\/resume\/es\/$/,
    );

    const jsonLd = await page.locator('script[type="application/ld+json"]').textContent();
    expect(jsonLd).toContain("Senior Front-End Engineer en Madrid");
    expect(jsonLd).toContain('"inLanguage":"es"');
});

test("both languages advertise the same hreflang set, including x-default", async ({page}) => {
    for (const url of ["/", "/es/"]) {
        await page.goto(url);
        const alternates = page.locator("link[rel=alternate]");
        await expect(alternates).toHaveCount(3);
        await expect(alternates.nth(0)).toHaveAttribute("hreflang", "en");
        await expect(alternates.nth(1)).toHaveAttribute("hreflang", "es");
        await expect(alternates.nth(2)).toHaveAttribute("hreflang", "x-default");
    }
});

test("the browser language does not override the URL", async ({browser}) => {
    const context = await browser.newContext({locale: "es-ES"});
    const page = await context.newPage();

    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.locator(".nav-link").first()).toHaveText("Experience");

    await context.close();
});

test("the language links stay real links a crawler can follow", async ({page}) => {
    await page.goto("/");

    const links = page.locator(".lang-link");
    await expect(links).toHaveCount(2);
    await expect(links.nth(0)).toHaveAttribute("href", /\/$/);
    await expect(links.nth(1)).toHaveAttribute("href", /\/es\/$/);
    for (const nth of [0, 1]) {
        await expect(links.nth(nth)).toHaveAttribute("hreflang", /^(en|es)$/);
    }
    await expect(page.locator(".lang-link.active")).toHaveAttribute("aria-current", "page");
});

test("switching language works with JavaScript switched off", async ({browser}) => {
    const context = await browser.newContext({javaScriptEnabled: false});
    const page = await context.newPage();

    await page.goto("/");
    await page.getByRole("link", {name: /español/i}).click();

    await expect(page).toHaveURL(/\/es\/$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "es");

    await context.close();
});

test("switching language keeps the section you were reading", async ({page}) => {
    await page.goto("/");
    await page.locator("#about").scrollIntoViewIfNeeded();
    await expect
        .poll(async () => page.locator('.lang-link[hreflang="es"]').getAttribute("href"))
        .toMatch(/#\w+$/);

    const before = await page.evaluate(() => Math.round(window.scrollY));
    expect(before).toBeGreaterThan(200);

    await page.getByRole("link", {name: /español/i}).click();
    await expect(page.locator("html")).toHaveAttribute("lang", "es");

    await expect
        .poll(async () => page.evaluate(() => Math.round(window.scrollY)))
        .toBeGreaterThan(200);
});

test("at the top of the page the language link stays clean", async ({page}) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    const href = await page.locator('.lang-link[hreflang="es"]').getAttribute("href");
    expect(href, "an empty fragment leaked into the href").not.toContain("#");
});
