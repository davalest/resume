import {test, expect} from "@playwright/test";

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

test("the Spanish URL serves Spanish without running any JavaScript", async ({browser}) => {
    const context = await browser.newContext({javaScriptEnabled: false});
    const page = await context.newPage();

    await page.goto("/es/");
    await expect(page.locator("html")).toHaveAttribute("lang", "es");
    await expect(page.locator(".nav-link").first()).toHaveText("Experiencia");
    await expect(page.locator("link[rel=canonical]")).toHaveAttribute("href", /\/resume\/es\/$/);

    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.locator(".nav-link").first()).toHaveText("Experience");

    await context.close();
});

test("the browser language does not override the URL", async ({browser}) => {
    const context = await browser.newContext({locale: "es-ES"});
    const page = await context.newPage();

    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.locator(".nav-link").first()).toHaveText("Experience");

    await context.close();
});

test("switching language happens in place, without a reload", async ({page}) => {
    let navigations = 0;
    page.on("request", (request) => {
        if (request.isNavigationRequest()) {
            navigations += 1;
        }
    });

    await page.goto("/");
    await expect(page.locator(".lang-link.active")).toHaveAttribute("lang", "en");
    const afterLoad = navigations;

    await page.locator("#about").scrollIntoViewIfNeeded();
    const scrollBefore = await page.evaluate(() => Math.round(window.scrollY));
    expect(scrollBefore).toBeGreaterThan(200);

    await page.getByRole("link", {name: /español/i}).click();
    await expect(page.locator("html")).toHaveAttribute("lang", "es");

    expect(navigations - afterLoad, "the switch reloaded the document").toBe(0);
    await expect(page).toHaveURL(/\/es\/$/);

    const scrollAfter = await page.evaluate(() => Math.round(window.scrollY));
    expect(Math.abs(scrollAfter - scrollBefore)).toBeLessThan(120);

    await expect(page.locator("link[rel=canonical]")).toHaveAttribute("href", /\/resume\/es\/$/);

    await expect(page).toHaveTitle(/Senior Front-End Engineer/);
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
    await expect(page.locator('meta[name="twitter:description"]')).toHaveAttribute(
        "content",
        /Abierto a roles senior/,
    );

    const jsonLd = await page.locator('script[type="application/ld+json"]').textContent();
    expect(jsonLd).toContain("Senior Front-End Engineer en Madrid");

    await page.goBack();
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.locator(".nav-link").first()).toHaveText("Experience");
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
});
