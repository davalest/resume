import {expect, test} from "@playwright/test";

const cases = [
    {label: "English", url: "/", cta: /download cv/i, filename: "David-Valenciano-CV-EN.pdf"},
    {label: "Spanish", url: "/es/", cta: /descargar cv/i, filename: "David-Valenciano-CV-ES.pdf"},
];

for (const {label, url, cta, filename} of cases) {
    test(`the ${label} CV downloads under a name that names him`, async ({page}) => {
        await page.goto(url);

        const [download] = await Promise.all([
            page.waitForEvent("download"),
            page.getByRole("link", {name: cta}).first().click(),
        ]);

        expect(download.suggestedFilename()).toBe(filename);

        const href = await page.getByRole("link", {name: cta}).first().getAttribute("href");
        expect(href).toMatch(/^\/(resume\/)?cv\/David-Valenciano-CV-(EN|ES)\.pdf$/);
    });
}

test("the vCard downloads", async ({page}) => {
    await page.goto("/");

    const [download] = await Promise.all([
        page.waitForEvent("download"),
        page.getByRole("link", {name: /save contact/i}).click(),
    ]);

    expect(download.suggestedFilename()).toBe("david-valenciano.vcf");
});

test("both download buttons on a page offer the same file", async ({page}) => {
    await page.goto("/");

    const buttons = page.getByRole("link", {name: /download cv/i});
    await expect(buttons).toHaveCount(2);
    expect(await buttons.nth(0).getAttribute("download")).toBe(
        await buttons.nth(1).getAttribute("download"),
    );
});

test("the CVs are downloadable but deliberately not indexable", async ({page}) => {
    const index = await (await page.request.get("/sitemap-index.xml")).text();
    const match = /<loc>[^<]*\/(sitemap-\d+\.xml)<\/loc>/.exec(index);
    expect(match, "the sitemap index names no sitemap").not.toBeNull();

    const sitemap = await (await page.request.get(`/${match![1]!}`)).text();

    for (const {filename} of cases) {
        expect(sitemap).not.toContain(filename);
        expect((await page.request.get(`/cv/${filename}`)).status()).toBe(200);
    }
});

test("the sitemap lists exactly the two CV pages", async ({page}) => {
    const index = await (await page.request.get("/sitemap-index.xml")).text();
    const match = /<loc>[^<]*\/(sitemap-\d+\.xml)<\/loc>/.exec(index);
    const sitemap = await (await page.request.get(`/${match![1]!}`)).text();

    const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, loc]) => loc);
    expect(locs).toHaveLength(2);
    expect(locs.some((loc) => loc?.endsWith("/es/"))).toBe(true);

    for (const stub of ["/home/", "/skills/", "/404"]) {
        expect(sitemap, `${stub} should not be in the sitemap`).not.toContain(stub);
    }
    expect(sitemap).toContain("<lastmod>");
});

test("robots.txt allows the site and points at the sitemap", async ({page}) => {
    const robots = await (await page.request.get("/robots.txt")).text();

    expect(robots).toContain("User-agent: *");
    expect(robots).toContain("Allow: /");
    expect(robots).toMatch(/Sitemap: https:\/\/\S+sitemap-index\.xml/);
    expect(robots).not.toContain("Disallow:");
});
