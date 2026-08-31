import {expect, test} from "@playwright/test";

test.use({colorScheme: "dark"});

test("printing hides the chrome and keeps the CV", async ({page}) => {
    await page.goto("/");
    await page.emulateMedia({media: "print"});

    for (const selector of [
        ".header-container",
        ".footer-container",
        ".hero-actions",
        ".divider",
    ]) {
        await expect(page.locator(selector).first()).toBeHidden();
    }

    await expect(page.getByRole("heading", {level: 1})).toBeVisible();
    await expect(page.locator(".role").first()).toBeVisible();
    await expect(page.locator(".study").first()).toBeVisible();
    await expect(page.locator(".contact-lead")).toBeVisible();
});

test("printing forces ink on paper, whatever theme the screen was in", async ({page}) => {
    await page.goto("/");
    await page.emulateMedia({media: "print"});

    const {background, text} = await page.evaluate(() => {
        const style = getComputedStyle(document.body);
        return {background: style.backgroundColor, text: style.color};
    });

    expect(background).toBe("rgb(255, 255, 255)");
    expect(text).toBe("rgb(0, 0, 0)");
});

test("printed links say where they go", async ({page}) => {
    await page.goto("/");
    await page.emulateMedia({media: "print"});

    const suffix = await page
        .locator(".about-repo-link")
        .evaluate((node) => getComputedStyle(node, "::after").content);

    expect(suffix).toContain("github.com/davalest/resume");
});

test("the section circles flatten into headings", async ({page}) => {
    await page.goto("/");
    await page.emulateMedia({media: "print"});

    const {width, radius} = await page
        .locator(".section-label")
        .first()
        .evaluate((node) => {
            const style = getComputedStyle(node);
            return {width: node.getBoundingClientRect().width, radius: style.borderRadius};
        });

    expect(radius).toBe("0px");
    expect(width).not.toBe(170);
});
