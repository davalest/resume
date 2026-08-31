/// <reference types="vitest/config" />
import {getViteConfig} from "astro/config";

export default getViteConfig({
    test: {
        environment: "node",
        include: ["src/**/*.{test,spec}.{ts,tsx}"],
        coverage: {
            provider: "v8",
            include: ["src/**/*.ts"],
            exclude: ["src/**/*.{test,spec}.ts", "src/env.d.ts", "src/scripts/**", "src/pages/**"],
            thresholds: {lines: 90, functions: 95, branches: 85, statements: 90},
            reporter: ["text", "lcov"],
        },
    },
});
