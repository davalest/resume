import {defineConfig, devices} from "@playwright/test";
import {baseURL} from "./e2e/server.ts";

export default defineConfig({
    testDir: "./e2e",
    testMatch: "**/*.spec.ts",
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 1 : 0,
    reporter: process.env.CI ? [["list"], ["html", {open: "never"}]] : "list",
    globalSetup: "./e2e/server.ts",
    globalTeardown: "./e2e/teardown.ts",

    use: {
        baseURL,
        locale: "en-US",
        trace: "on-first-retry",
    },

    projects: [
        {name: "desktop", use: {...devices["Desktop Chrome"]}},
        {name: "mobile", use: {...devices["Pixel 7"]}},
    ],
});
