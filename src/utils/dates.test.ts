import {describe, it, expect} from "vitest";
import {formatDateRange, getYearsBetweenDates, parseDate} from "./dates.ts";

describe("parseDate", () => {
    it("parses a valid YYYY-MM-DD string", () => {
        const d = parseDate("2016-05-01");
        expect(d.getFullYear()).toBe(2016);
        expect(d.getMonth()).toBe(4); // 0-indexed: May
        expect(d.getDate()).toBe(1);
    });

    it("throws on an invalid format", () => {
        expect(() => parseDate("not-a-date")).toThrow();
    });
});

describe("getYearsBetweenDates", () => {
    it("counts an exact decade as ten years", () => {
        expect(getYearsBetweenDates(new Date(2010, 0, 1), new Date(2020, 0, 1))).toBe(10);
    });

    it("never rounds up an incomplete year", () => {
        expect(getYearsBetweenDates(new Date(2017, 1, 1), new Date(2026, 7, 25))).toBe(9);
    });

    it("counts the anniversary itself, but not the day before", () => {
        expect(getYearsBetweenDates(new Date(2016, 4, 1), new Date(2026, 4, 1))).toBe(10);
        expect(getYearsBetweenDates(new Date(2016, 4, 1), new Date(2026, 3, 30))).toBe(9);
    });

    it("throws on an invalid start date", () => {
        expect(() => getYearsBetweenDates(new Date("invalid"))).toThrow();
    });
});

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
});
