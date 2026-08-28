import {describe, it, expect, afterEach} from "vitest";
import {cleanup, render, screen} from "@testing-library/react";
import {I18nProvider} from "./i18n.tsx";
import App from "./App.tsx";
import {sectionIds} from "./navigation.ts";

afterEach(cleanup);

describe("Profile page", () => {
    it("renders every section on one page", async () => {
        const {container} = render(
            <I18nProvider initialLanguage="en">
                <App />
            </I18nProvider>,
        );
        expect(
            await screen.findByRole("heading", {level: 1, name: "David Valenciano"}),
        ).toBeTruthy();

        for (const id of Object.values(sectionIds)) {
            expect(container.querySelector(`#${id}`), `missing section #${id}`).toBeTruthy();
        }
    });

    it("leads with role, pitch and calls to action", async () => {
        render(
            <I18nProvider initialLanguage="en">
                <App />
            </I18nProvider>,
        );
        await screen.findByRole("heading", {level: 1});

        expect(screen.getAllByText("Senior Front-End Engineer").length).toBeGreaterThan(0);
        expect(screen.getByText(/Front-end since 2016, with React since 2017/)).toBeTruthy();
        expect(screen.getAllByRole("link", {name: /Download CV/})).toHaveLength(2);
        expect(screen.getByRole("link", {name: /View experience/})).toBeTruthy();
        expect(screen.getByRole("link", {name: /Send me an email/})).toBeTruthy();
    });

    it("has the specialty keywords in the DOM on first paint", async () => {
        const {container} = render(
            <I18nProvider initialLanguage="en">
                <App />
            </I18nProvider>,
        );
        await screen.findByRole("heading", {level: 1});

        [
            "Component systems",
            "Cross-platform iOS/Android apps",
            "Architecture and standards",
            "React & TypeScript",
        ].forEach((specialty) => expect(container.textContent).toContain(specialty));
    });

    it("no longer publishes birth date, nationality or a postal address", async () => {
        const {container} = render(
            <I18nProvider initialLanguage="en">
                <App />
            </I18nProvider>,
        );
        await screen.findByRole("heading", {level: 1});

        expect(container.textContent).not.toMatch(/17\/05\/1991/);
        expect(container.textContent).not.toMatch(/28400/);
        expect(container.textContent).not.toMatch(/Nationality|Nacionalidad/);
    });

    it("keeps baseline literacy out of the stack section", async () => {
        const {container} = render(
            <I18nProvider initialLanguage="en">
                <App />
            </I18nProvider>,
        );
        await screen.findByRole("heading", {level: 1});

        const stack = container.querySelector("#stack")?.textContent ?? "";
        ["Git", "Flexbox", "CSS Grid", "Cross-browser", "Responsive", "HTML5", "SEO"].forEach(
            (filler) => expect(stack).not.toContain(filler),
        );
    });

    it("shows no self-assigned skill percentages", async () => {
        const {container} = render(
            <I18nProvider initialLanguage="en">
                <App />
            </I18nProvider>,
        );
        await screen.findByRole("heading", {level: 1});

        expect(container.textContent).not.toMatch(/\d{2}%/);
    });

    it("publishes no phone number", async () => {
        const {container} = render(
            <I18nProvider initialLanguage="en">
                <App />
            </I18nProvider>,
        );
        await screen.findByRole("heading", {level: 1});

        expect(container.querySelector('a[href^="tel:"]')).toBeNull();
        expect(container.textContent).not.toMatch(/600\s?80\s?90\s?24/);
    });

    it("states seniority as dates, not as a number that ages", async () => {
        const {container} = render(
            <I18nProvider initialLanguage="en">
                <App />
            </I18nProvider>,
        );
        await screen.findByRole("heading", {level: 1});

        const pitch = container.querySelector(".hero-pitch")?.textContent ?? "";
        expect(pitch).not.toMatch(/\d+\s*years/i);
        expect(pitch).toContain("2016");
    });
});
