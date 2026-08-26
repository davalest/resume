import {afterEach, describe, expect, it} from "vitest";
import {cleanup, render, screen} from "@testing-library/react";
import {useActiveSection} from "./useActiveSection.ts";

const ids = ["one", "two", "three"];

const Probe = () => <output>{useActiveSection(ids) ?? "none"}</output>;

interface Viewport {
    scrollY?: number;
    scrollHeight?: number;
    innerHeight?: number;
}

const layout = (
    tops: number[],
    {scrollY = 0, scrollHeight = 3000, innerHeight = 800}: Viewport = {},
) => {
    ids.forEach((id, index) => {
        const section = document.createElement("div");
        section.id = id;
        section.getBoundingClientRect = () => ({top: tops[index]}) as DOMRect;
        document.body.appendChild(section);
    });

    Object.defineProperty(document.documentElement, "scrollHeight", {
        value: scrollHeight,
        configurable: true,
    });
    Object.defineProperty(window, "innerHeight", {
        value: innerHeight,
        configurable: true,
        writable: true,
    });
    Object.defineProperty(window, "scrollY", {value: scrollY, configurable: true, writable: true});
};

const active = () => screen.getByRole("status").textContent;

afterEach(() => {
    cleanup();
    document.body.innerHTML = "";
});

describe("useActiveSection", () => {
    it("highlights nothing while every section is still below the line", () => {
        layout([100, 900, 1700]);
        render(<Probe />);
        expect(active()).toBe("none");
    });

    it("highlights a section as soon as it clears the header line", () => {
        layout([10, 900, 1700]);
        render(<Probe />);
        expect(active()).toBe("one");
    });

    it("highlights the last section whose top has passed the line", () => {
        layout([-900, -400, 10]);
        render(<Probe />);
        expect(active()).toBe("three");
    });

    it("highlights the final section at the bottom of the page, however short it is", () => {
        layout([-2000, -1200, 600], {scrollY: 2200, scrollHeight: 3000, innerHeight: 800});
        render(<Probe />);
        expect(active()).toBe("three");
    });

    it("does not force the last section when the page does not scroll at all", () => {
        layout([100, 900, 1700], {scrollY: 0, scrollHeight: 800, innerHeight: 800});
        render(<Probe />);
        expect(active()).toBe("none");
    });
});
