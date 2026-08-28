import {test, expect} from "@playwright/test";

const HYDRATION_NOISE = /hydrat|did not match|server rendered|server HTML|#418|#423|#425/i;

const PRERENDERED = [".hero-name", ".hero-photo", "main#content"] as const;

for (const [label, url, language] of [
    ["English", "/", "en"],
    ["Spanish", "/es/", "es"],
] as const) {
    test(`${label} page hydrates the prerendered markup instead of replacing it`, async ({
        page,
    }) => {
        const problems: string[] = [];
        page.on("console", (message) => {
            if (message.type() === "error" || message.type() === "warning") {
                problems.push(`${message.type()}: ${message.text()}`);
            }
        });
        page.on("pageerror", (error) => problems.push(`pageerror: ${error.message}`));

        await page.goto(url, {waitUntil: "commit"});

        const handles = await Promise.all(
            PRERENDERED.map((selector) => page.waitForSelector(selector, {state: "attached"})),
        );

        await expect(page.locator("html")).toHaveAttribute("lang", language);
        await expect(page.locator(".lang-link.active")).toHaveAttribute("lang", language);

        for (const [index, handle] of handles.entries()) {
            expect(
                await handle.evaluate((node) => node.isConnected),
                `${PRERENDERED[index]} was detached, so the prerendered tree was thrown away`,
            ).toBe(true);
        }

        expect(problems.filter((problem) => HYDRATION_NOISE.test(problem))).toEqual([]);
        expect(problems).toEqual([]);
    });
}

test("the LCP element is the prerendered portrait, not one React inserted", async ({page}) => {
    await page.goto("/");

    const lcp = await page.evaluate(
        () =>
            new Promise<{element: string; startTime: number}>((resolve) => {
                let last: PerformanceEntry | undefined;
                new PerformanceObserver((list) => {
                    last = list.getEntries().at(-1);
                }).observe({type: "largest-contentful-paint", buffered: true});

                setTimeout(() => {
                    const entry = last as (PerformanceEntry & {element?: Element}) | undefined;
                    resolve({
                        element: entry?.element?.className ?? "none",
                        startTime: entry?.startTime ?? 0,
                    });
                }, 3000);
            }),
    );

    expect(lcp.element).toContain("hero-photo");
    expect(lcp.startTime, "the LCP was recalculated after React ran").toBeLessThan(2500);
});
