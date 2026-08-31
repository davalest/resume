import {expect, test} from "@playwright/test";

const LANGUAGES = [
    {label: "English", url: "/", language: "en", nav: "Experience"},
    {label: "Spanish", url: "/es/", language: "es", nav: "Experiencia"},
] as const;

for (const {label, url, language, nav} of LANGUAGES) {
    test(`the ${label} page is complete with JavaScript switched off`, async ({browser}) => {
        const context = await browser.newContext({javaScriptEnabled: false});
        const page = await context.newPage();

        await page.goto(url);

        await expect(page.locator("html")).toHaveAttribute("lang", language);
        await expect(page.locator(".nav-link").first()).toHaveText(nav);
        await expect(page.getByRole("heading", {level: 1})).toHaveText("David Valenciano");

        await expect(page.getByRole("region")).toHaveCount(6);
        await expect(page.getByRole("article")).toHaveCount(3);
        await expect(page.getByRole("link", {name: /download cv|descargar cv/i})).toHaveCount(2);

        await context.close();
    });

    test(`the ${label} page loads without a single console error`, async ({page}) => {
        const problems: string[] = [];
        page.on("console", (message) => {
            if (message.type() === "error" || message.type() === "warning") {
                problems.push(`${message.type()}: ${message.text()}`);
            }
        });
        page.on("pageerror", (error) => problems.push(`pageerror: ${error.message}`));

        await page.goto(url);
        await expect(page.locator("html")).toHaveAttribute("lang", language);

        expect(problems).toEqual([]);
    });
}

test("the server-rendered markup is the markup that stays", async ({page}) => {
    await page.goto("/");

    const handles = await Promise.all(
        [".hero-name", ".hero-photo", "main#content"].map((selector) =>
            page.waitForSelector(selector, {state: "attached"}),
        ),
    );

    await page.waitForLoadState("networkidle");

    for (const handle of handles) {
        expect(await handle.evaluate((node) => node.isConnected)).toBe(true);
    }
});

test("the LCP element came from the server, and it lands fast", async ({page}) => {
    const initialHtml = await (await page.request.get("/")).text();

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

    expect(lcp.element, "no LCP was recorded").not.toBe("none");
    expect(lcp.element).toMatch(/hero-/);
    expect(initialHtml, `the LCP element .${lcp.element} was not in the server response`).toContain(
        lcp.element,
    );
    expect(lcp.startTime).toBeLessThan(2500);
});

test("the page ships one small script and nothing else", async ({page}) => {
    const scripts: {url: string; bytes: number}[] = [];

    page.on("response", async (response) => {
        if (new URL(response.url()).pathname.endsWith(".js")) {
            scripts.push({url: response.url(), bytes: (await response.body()).byteLength});
        }
    });

    await page.goto("/");
    await page.waitForLoadState("networkidle");

    expect(scripts, `unexpected scripts: ${scripts.map(({url}) => url).join(", ")}`).toHaveLength(
        1,
    );
    expect(scripts[0]!.bytes).toBeLessThan(20_000);
});

test("what actually ships carries the strict policy, not the dev one", async ({page}) => {
    for (const url of ["/", "/es/", "/definitely-not-a-page/"]) {
        await page.goto(url);

        const policy = await page
            .locator('meta[http-equiv="Content-Security-Policy"]')
            .getAttribute("content");

        expect(policy, `${url} carries no CSP`).not.toBeNull();
        expect(policy, `${url} shipped the dev policy`).not.toContain("unsafe-inline");
        expect(policy).not.toContain("unsafe-eval");
        expect(policy).toContain("default-src 'none'");
        expect(policy).toContain("base-uri 'none'");
        expect(policy).toContain("form-action 'none'");
    }
});

test("the stylesheet is a real link, not something a script injects", async ({page}) => {
    await page.goto("/");

    const sheets = await page.evaluate(() => ({
        links: document.querySelectorAll('link[rel="stylesheet"]').length,
        inline: document.querySelectorAll("style").length,
    }));

    expect(sheets.links).toBe(1);
    expect(sheets.inline, "an inline <style> would need unsafe-inline").toBe(0);
});
