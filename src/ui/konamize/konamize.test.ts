import {readFileSync} from "node:fs";
import {describe, expect, it} from "vitest";
import {buildStyles} from "@davalest/konamize";

const CLASS_NAME = "KONAMI";

const stylesheet = readFileSync("src/styles/konamize.css", "utf-8");

describe("konamize styles", () => {
    it("match what the installed version produces", () => {
        const copied = stylesheet.slice(stylesheet.indexOf("*/") + 2);
        expect(copied.trim()).toBe(buildStyles(CLASS_NAME).trim());
    });

    it("carry the class names the library will actually add to the DOM", () => {
        for (const selector of [`.${CLASS_NAME}`, `.${CLASS_NAME}-go`, `.${CLASS_NAME}-static`]) {
            expect(stylesheet).toContain(selector);
        }
    });
});
