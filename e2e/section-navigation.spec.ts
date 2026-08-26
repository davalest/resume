import {test, expect} from "@playwright/test";

test("nav links jump to their section and highlight as the active one", async ({page}) => {
    await page.goto("/");

    const contactLink = page.getByRole("link", {name: "Contact", exact: true});
    await contactLink.click();

    await expect(page).toHaveURL(/#contact$/);
    await expect(page.locator("#contact")).toBeInViewport();
    await expect(contactLink).toHaveAttribute("aria-current", "location");

    const experienceLink = page.getByRole("link", {name: "Experience", exact: true});
    await experienceLink.click();

    await expect(page).toHaveURL(/#experience$/);
    await expect(page.locator("#experience")).toBeInViewport();
    await expect(experienceLink).toHaveAttribute("aria-current", "location");
    await expect(contactLink).not.toHaveAttribute("aria-current", "location");
});
