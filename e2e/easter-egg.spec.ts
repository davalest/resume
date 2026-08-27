import {test, expect} from "@playwright/test";

const KONAMI = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
];

test("the Konami code summons the raptor, and the CSP allows it", async ({page}) => {
    const blocked: string[] = [];
    page.on("console", (message) => {
        if (/Content Security Policy|Refused to/i.test(message.text())) {
            blocked.push(message.text());
        }
    });

    const requested: string[] = [];
    page.on("request", (request) => requested.push(request.url()));

    await page.goto("/");
    await expect(page.locator(".lang-link.active")).toHaveAttribute("lang", "en");

    await expect(page.locator("img.KONAMI")).toHaveCount(0);

    for (const key of KONAMI) {
        await page.keyboard.press(key);
    }

    const raptor = page.locator("img.KONAMI");
    await expect(raptor).toHaveCount(1);
    await expect(raptor).toHaveAttribute("src", /^\/assets\/raptor-[A-Za-z0-9_-]+\.webp$/);
    await expect(raptor).toHaveAttribute("aria-hidden", "true");
    await expect(raptor).toHaveAttribute("alt", "");

    expect(blocked, "the CSP blocked part of the easter egg").toEqual([]);
    
    const scripts = requested.filter((url) => new URL(url).pathname.endsWith(".js"));
    expect(scripts, `an extra chunk was loaded: ${scripts.join(", ")}`).toHaveLength(1);
});

test("the raptor fades instead of charging when less motion was asked for", async ({browser}) => {
    const context = await browser.newContext({reducedMotion: "reduce"});
    const page = await context.newPage();

    await page.goto("/");
    await expect(page.locator(".lang-link.active")).toHaveAttribute("lang", "en");

    for (const key of KONAMI) {
        await page.keyboard.press(key);
    }

    const raptor = page.locator("img.KONAMI");
    await expect(raptor).toHaveCount(1);
    await expect(raptor).toHaveClass(/KONAMI-static/);
    await expect(raptor).not.toHaveClass(/KONAMI-go/);

    const {animation, duration} = await raptor.evaluate((node) => {
        const style = getComputedStyle(node);
        return {animation: style.animationName, duration: style.animationDuration};
    });
    expect(animation).toBe("KONAMI-fade");
    expect(duration).toBe("2.5s");

    await context.close();
});
