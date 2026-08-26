import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import jsxA11y from "eslint-plugin-jsx-a11y";

export default tseslint.config(
    {
        ignores: ["dist", "docs", ".claude", "_bmad", "_bmad-output", "design-artifacts"],
    },
    {
        files: ["**/*.{ts,tsx}"],
        extends: [
            js.configs.recommended,
            ...tseslint.configs.recommendedTypeChecked,
            ...tseslint.configs.stylisticTypeChecked,
        ],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
            parserOptions: {
                ecmaFeatures: {jsx: true},
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
        settings: {
            react: {version: "detect"},
        },
        plugins: {
            react,
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh,
            "jsx-a11y": jsxA11y,
        },
        rules: {
            ...react.configs.flat.recommended.rules,
            ...react.configs.flat["jsx-runtime"].rules,
            ...reactHooks.configs.recommended.rules,
            ...jsxA11y.flatConfigs.recommended.rules,
            "react-refresh/only-export-components": ["warn", {allowConstantExport: true}],
        },
    },
    {
        files: ["src/content/*.ts", "src/navigation.ts", "src/i18n.tsx"],
        rules: {
            "react-refresh/only-export-components": "off",
        },
    },
    {
        files: ["**/*.{test,spec}.{ts,tsx}"],
        languageOptions: {
            globals: globals.node,
        },
    },
);
