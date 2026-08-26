import {describe, it, expect, afterEach} from "vitest";
import {cleanup, render, screen} from "@testing-library/react";
import {I18nProvider, type SupportedLanguage} from "../../i18n.tsx";
import {earlierRoles, featuredRoles} from "../../content/roles.ts";
import Experience from "./experience.tsx";

afterEach(cleanup);

const renderIn = (language: SupportedLanguage) =>
    render(
        <I18nProvider initialLanguage={language}>
            <Experience />
        </I18nProvider>,
    );

describe("Experience", () => {
    it("renders every role, split into featured and earlier", () => {
        const {container} = renderIn("en");
        expect(container.querySelectorAll(".role")).toHaveLength(featuredRoles.length);
        expect(container.querySelectorAll(".earlier-role")).toHaveLength(earlierRoles.length);
    });

    it("gives the recent roles context and bullet points", () => {
        const {container} = renderIn("en");
        expect(container.querySelectorAll(".role-context")).toHaveLength(featuredRoles.length);
        expect(container.querySelectorAll(".role-bullets li").length).toBe(
            featuredRoles.reduce(
                (total: number, {bullets}: {bullets: readonly unknown[]}) => total + bullets.length,
                0,
            ),
        );
    });

    it("names employers the way a recruiter would recognise them", () => {
        renderIn("en");
        expect(screen.getByText(/Docline \(Aplicaciones de Salud, S\.L\.\)/)).toBeTruthy();
    });

    it("renders text, never raw i18n keys", () => {
        const {container} = renderIn("en");
        expect(container.textContent).not.toMatch(/\b(role|context|bullets|summary)\b\./);
        expect(screen.getByText("Programmer Analyst", {exact: false})).toBeTruthy();
    });

    it("shows the current role as senior, and the trajectory as upward", () => {
        const {container} = renderIn("en");
        const titles = [...container.querySelectorAll(".role-title")].map(
            (node) => node.textContent ?? "",
        );

        expect(titles[0]).toMatch(/^Senior Front-End Engineer/);
        expect(titles[1]).toMatch(/^Front-End Engineer/);
        expect(titles[2]).toMatch(/^Front-End Engineer/);
    });

    it("formats the ongoing range with the localised label", () => {
        renderIn("en");
        expect(screen.getByText("Jan 2024 — Present")).toBeTruthy();
    });

    it("renders prose and dates in Spanish when mounted in Spanish", () => {
        renderIn("es");
        expect(screen.getByText("Analista Programador", {exact: false})).toBeTruthy();
        expect(screen.getByText("ene 2024 — Actualidad")).toBeTruthy();
    });

    it('omits the employer for the freelance role instead of printing "undefined"', () => {
        const {container} = renderIn("en");
        expect(container.textContent).not.toMatch(/undefined/);
    });
});
