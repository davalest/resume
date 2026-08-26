import {test, expect} from "@playwright/test";


test("the band is untouched at every width where the design height already fits", async ({
                                                                                             page,
                                                                                         }) => {
    for (const width of [320, 412, 769, 845, 899, 901, 1024, 1440]) {
        await page.setViewportSize({width, height: 800});
        await page.goto("/es/");
        await expect(page.locator(".lang-link.active")).toHaveAttribute("lang", "es");

        const {band, content, inline} = await page.evaluate(() => ({
            band: Math.round(document.querySelector("header")!.getBoundingClientRect().height),
            content: Math.ceil(document.querySelector(".header-content")!.scrollHeight),
            inline: document.documentElement.style.getPropertyValue("--header-height"),
        }));

        expect(content, `content outgrew the band at ${width}px`).toBeLessThanOrEqual(band);
        expect(inline, `an inline height leaked at ${width}px`).toBe("");
    }
});

test("the band grows when the content no longer fits, instead of being overrun", async ({page}) => {
    await page.setViewportSize({width: 1024, height: 800});
    await page.goto("/");
    await expect(page.locator(".lang-link.active")).toHaveAttribute("lang", "en");

    const before = await page.evaluate(() =>
        Math.round(document.querySelector("header")!.getBoundingClientRect().height),
    );

    await page.evaluate(() => {
        document.querySelectorAll(".nav-link").forEach((link) => {
            link.textContent = `${link.textContent ?? ""} con una etiqueta larguísima`;
        });
    });

    await expect
        .poll(async () =>
            page.evaluate(() =>
                Math.round(document.querySelector("header")!.getBoundingClientRect().height),
            ),
        )
        .toBeGreaterThan(before);

    const overlaps = await page.evaluate(() => {
        const header = document.querySelector("header")!.getBoundingClientRect();
        return document.querySelector(".hero-name")!.getBoundingClientRect().top < header.bottom;
    });
    expect(overlaps, "the header covered the h1").toBe(false);
});
