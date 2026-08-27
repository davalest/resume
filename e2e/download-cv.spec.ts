import {test, expect} from "@playwright/test";

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

test("the CV PDFs are in the sitemap under the URL the buttons link to", async ({page}) => {
    const sitemap = await (await page.request.get("/sitemap.xml")).text();

    for (const {filename} of cases) {
        expect(sitemap).toContain(`/resume/cv/${filename}`);
    }
});

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
