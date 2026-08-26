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
    });
}

test("both download buttons on a page offer the same file", async ({page}) => {
    await page.goto("/");

    const buttons = page.getByRole("link", {name: /download cv/i});
    await expect(buttons).toHaveCount(2);
    expect(await buttons.nth(0).getAttribute("download")).toBe(
        await buttons.nth(1).getAttribute("download"),
    );
});
