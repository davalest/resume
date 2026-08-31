import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import astro from "eslint-plugin-astro";
import * as astroParser from "astro-eslint-parser";
import jsxA11y from "eslint-plugin-jsx-a11y";

export default tseslint.config(
    {
        ignores: [
            "dist",
            ".astro",
            ".lighthouseci",
            "playwright-report",
            "test-results",
            "coverage",
            "node_modules",
            "cv-source",
        ],
    },
    {
        files: ["**/*.ts", "**/*.tsx"],
        extends: [
            js.configs.recommended,
            ...tseslint.configs.recommendedTypeChecked,
            ...tseslint.configs.stylisticTypeChecked,
        ],
        languageOptions: {
            ecmaVersion: 2023,
            globals: {...globals.browser, ...globals.node},
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
                extraFileExtensions: [".astro"],
            },
        },
        rules: {
            "@typescript-eslint/consistent-type-imports": [
                "error",
                {prefer: "type-imports", fixStyle: "inline-type-imports"},
            ],
            "@typescript-eslint/no-unnecessary-condition": "off",
            eqeqeq: ["error", "always"],
            "no-console": ["warn", {allow: ["warn", "error"]}],
        },
    },
    ...astro.configs.recommended,
    ...astro.configs["jsx-a11y-recommended"],
    {
        files: ["**/*.astro"],
        plugins: {"jsx-a11y": jsxA11y},
        languageOptions: {
            parser: astroParser,
            parserOptions: {
                parser: tseslint.parser,
                extraFileExtensions: [".astro"],
                project: true,
                tsconfigRootDir: import.meta.dirname,
            },
            globals: globals.browser,
        },
        rules: {
            "astro/no-set-html-directive": "off",
            "astro/jsx-a11y/no-redundant-roles": ["error", {ul: ["list"]}],
        },
    },
    {
        files: ["src/**/*.test.ts"],
        rules: {
            "@typescript-eslint/no-unsafe-argument": "off",
            "@typescript-eslint/no-unsafe-assignment": "off",
            "@typescript-eslint/no-unsafe-member-access": "off",
            "@typescript-eslint/no-unsafe-return": "off",
            "@typescript-eslint/no-unsafe-call": "off",
        },
    },

    {
        files: ["src/scripts/**/*.ts"],
        languageOptions: {globals: globals.browser},
    },

    {
        files: ["scripts/**/*.{ts,mjs}"],
        rules: {"no-console": "off"},
    },

    {
        files: [
            "*.ts",
            "*.mjs",
            "*.js",
            "scripts/**/*.ts",
            "e2e/**/*.ts",
            "src/**/*.test.ts",
            "src/pages/**/*.ts",
        ],
        languageOptions: {globals: globals.node},
    },
);
