import {describe, it, expect, afterEach} from "vitest";
import {render, screen, cleanup} from "@testing-library/react";
import SectionLabel from "./sectionLabel.tsx";

afterEach(cleanup);

describe("SectionLabel", () => {
    it("keeps the label in the case it was written", () => {
        render(<SectionLabel id="experience" label="Experience" />);
        expect(screen.getByRole("heading", {level: 2, name: "Experience"})).toBeTruthy();
    });

    it("gives the heading the id its section points at with aria-labelledby", () => {
        render(<SectionLabel id="contact" label="Get in touch" />);
        expect(screen.getByRole("heading", {level: 2}).id).toBe("contact-title");
    });
});
