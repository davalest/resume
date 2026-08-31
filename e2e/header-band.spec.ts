import {expect, test} from "@playwright/test";

test.describe.configure({mode: "parallel"});

const MOBILE_BREAKPOINT = 768;

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

test("on a phone the band scrolls away instead of camping on the viewport", async ({page}) => {
    await page.setViewportSize({width: 375, height: 568});
    await page.goto("/");

    const {position, band} = await page.evaluate(() => {
        const header = document.querySelector("header")!;
        return {
            position: getComputedStyle(header).position,
            band: Math.round(header.getBoundingClientRect().height),
        };
    });

    expect(position).toBe("static");
    expect(band, `the band is ${band}px of a 568px viewport`).toBeLessThan(568 * 0.28);

    await page.evaluate(() => window.scrollTo(0, 600));
    const stillOnScreen = await page.evaluate(
        () => document.querySelector("header")!.getBoundingClientRect().bottom > 0,
    );
    expect(stillOnScreen, "the header stayed pinned after scrolling").toBe(false);
});

test("no fixed header means no inline height and no wasted top padding", async ({page}) => {
    await page.setViewportSize({width: 375, height: 700});
    await page.goto("/");

    const {inline, headerHeight} = await page.evaluate(() => ({
        inline: document.documentElement.style.getPropertyValue("--header-height"),
        headerHeight: getComputedStyle(document.documentElement)
            .getPropertyValue("--header-height")
            .trim(),
    }));

    expect(inline).toBe("");
    expect(headerHeight).toBe("0px");
});

test("the h1 is visible without scrolling on a small phone", async ({page}) => {
    await page.setViewportSize({width: 375, height: 568});
    await page.goto("/");

    await expect(page.getByRole("heading", {level: 1})).toBeInViewport();
    expect(MOBILE_BREAKPOINT).toBeGreaterThan(375);
});
