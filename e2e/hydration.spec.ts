import {test, expect} from "@playwright/test";


const HYDRATION_NOISE = /hydrat|did not match|server rendered|server HTML|#418|#423|#425/i;

for (const [label, url, language] of [
    ["English", "/", "en"],
    ["Spanish", "/es/", "es"],
] as const) {
    test(`${label} page mounts over the prerendered markup with a clean console`, async ({
                                                                                             page,
                                                                                         }) => {
        const problems: string[] = [];
        page.on("console", (message) => {
            if (message.type() === "error" || message.type() === "warning") {
                problems.push(`${message.type()}: ${message.text()}`);
            }
        });
        page.on("pageerror", (error) => problems.push(`pageerror: ${error.message}`));

        await page.goto(url);
        await expect(page.locator("html")).toHaveAttribute("lang", language);

        await expect(page.locator(".lang-link.active")).toHaveAttribute("lang", language);

        expect(problems.filter((problem) => HYDRATION_NOISE.test(problem))).toEqual([]);
        expect(problems).toEqual([]);
    });
}
