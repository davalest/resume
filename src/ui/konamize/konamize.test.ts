import {readFileSync} from "node:fs";
import {describe, expect, it} from "vitest";
import {buildStyles} from "@davalest/konamize";

const CLASS_NAME = "KONAMI";

const stylesheet = readFileSync("src/styles/konamize.css", "utf-8");

const headerEnd = stylesheet.indexOf("*/");
const copied = headerEnd === -1 ? stylesheet : stylesheet.slice(headerEnd + 2);

describe("konamize styles", () => {
    it("match what the installed version produces", () => {
        expect(copied.trim()).toBe(buildStyles(CLASS_NAME).trim());
    });

    it("carry the class names the library will actually add to the DOM", () => {
        for (const selector of [`.${CLASS_NAME}`, `.${CLASS_NAME}-go`, `.${CLASS_NAME}-static`]) {
            expect(stylesheet).toContain(selector);
        }
    });
});
