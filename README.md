# Resume

Personal CV for **David Valenciano**, front-end engineer. One page, two languages, no backend.

🔗 **Live:** https://davalest.github.io/resume

The production build is **prerendered to one HTML document per language**, so a crawler that
never runs JavaScript reads the whole CV — in both languages, and so does a visitor whose
bundle never arrives. 

## Tech stack

- **React 19** + **TypeScript 5.9**, with `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`
  and `verbatimModuleSyntax` on
- **Vite 8** (Rolldown) — dev server, build, and `vite-imagetools` for the image pipeline
- **SCSS** — component-scoped styles over CSS custom-property design tokens
- **Prettier** for formatting, **ESLint 9** (flat config) for linting, with type-aware rules
  (`recommendedTypeChecked`), `react`, `react-hooks` and `jsx-a11y`
- **Vitest** for unit tests, **Playwright** for end-to-end, **axe-core** for accessibility,
  **Lighthouse CI** for Core Web Vitals