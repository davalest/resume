import {describe, it, expect} from "vitest";
import {formatDateRange} from "./dates.ts";

describe("formatDateRange", () => {
    it("formats a closed month range", () => {
        expect(formatDateRange({start: "2022-08", end: "2023-11"}, "en", "Present")).toBe(
            "Aug 2022 — Nov 2023",
        );
    });

    it("uses the ongoing label when there is no end", () => {
        expect(formatDateRange({start: "2024-01"}, "en", "Present")).toBe("Jan 2024 — Present");
        expect(formatDateRange({start: "2024-01"}, "es", "Actualidad")).toBe(
            "ene 2024 — Actualidad",
        );
    });

    it("collapses a range whose ends are equal into a single label", () => {
        expect(formatDateRange({start: "2016", end: "2016"}, "en", "Present")).toBe("2016");
    });

    it("formats a year-only bound without a month", () => {
        expect(formatDateRange({start: "2015", end: "2016"}, "en", "Present")).toBe("2015 — 2016");
    });

    it("localises month names", () => {
        expect(formatDateRange({start: "2021-09", end: "2022-08"}, "es", "Actualidad")).toBe(
            "sept 2021 — ago 2022",
        );
    });

    it("throws on a malformed bound", () => {
        expect(() => formatDateRange({start: "nope"}, "en", "Present")).toThrow();
    });

    it("throws on a month outside 1-12", () => {
        expect(() => formatDateRange({start: "2024-13"}, "en", "Present")).toThrow();
    });

    it("does not depend on the host's locale data", () => {
        const formatted = formatDateRange({start: "2016-05", end: "2017-02"}, "en", "Present");
        expect(formatted).toBe("May 2016 — Feb 2017");
        expect(formatted).not.toMatch(/\./);
    });
});
