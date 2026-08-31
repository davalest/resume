# Resume

Personal CV for **David Valenciano**, front-end engineer. One page, two languages, no backend.

🔗 **Live:** https://davalest.github.io/resume

Every language is its own prerendered HTML document, so a crawler that never runs JavaScript
reads the whole CV — and so does a visitor whose script never arrives. Switching language is an
ordinary navigation between two complete documents.

## Numbers

Lighthouse, mobile emulation with 4× CPU throttling and simulated slow 4G, median of three runs:

| Metric              |   Value |
| ------------------- | ------: |
| Performance         |     100 |
| Accessibility       |     100 |
| Best practices      |     100 |
| SEO                 |     100 |
| LCP                 |   1.2 s |
| CLS                 |       0 |
| Total blocking time |    0 ms |
| JavaScript shipped  |  3.1 KB |
| Unused JavaScript   |     0 B |
| Total transfer      | 35.8 KB |

`.lighthouserc.json` asserts every one of these as a budget. CI fails if any of them regress.

## Tech stack

- **Astro 7** — static output, one document per language, no framework runtime on the page
- **TypeScript 5.9** on `astro/tsconfigs/strictest`, plus `noUncheckedIndexedAccess`,
  `exactOptionalPropertyTypes` and `verbatimModuleSyntax`
- **SCSS** — one stylesheet, component partials over CSS custom-property design tokens
- **Vitest** for unit tests (including Astro's container API for component rendering),
  **Playwright** on desktop and mobile for end-to-end, **axe-core** for accessibility,
  **Lighthouse CI** for Core Web Vitals
- **ESLint 9** (flat config, type-aware, covering `.astro`, `scripts/` and the config files),
  **Stylelint**, **Prettier**

No UI library, no icon font, no web font, no analytics, no third-party request of any kind.

## Commands

| Command                 | What it does                                                              |
| ----------------------- | ------------------------------------------------------------------------- |
| `npm run dev`           | Dev server                                                                |
| `npm run build`         | Type check and build to `dist/` with base `/`                             |
| `npm run check:pages`   | Build with base `/resume/` **and** assert the output is deploy-consistent |
| `npm run preview`       | Serve `dist/` on :4173                                                    |
| `npm test`              | Unit tests                                                                |
| `npm run test:coverage` | Unit tests with coverage thresholds                                       |
| `npm run test:e2e`      | Playwright, desktop and mobile                                            |
| `npm run lhci`          | Lighthouse budgets                                                        |
| `npm run lint`          | ESLint over TypeScript, Astro, scripts and configs                        |
| `npm run lint:css`      | Stylelint                                                                 |
| `npm run verify`        | Everything CI runs, in the same order                                     |

Node is pinned by `.nvmrc`; `nvm use` before anything else.

## Layout

```
site.config.ts          Canonical URL, base path, languages. One knob for the lot.
astro.config.ts         Astro, i18n routing, sitemap
src/
  pages/                index (en), es/index, 404, [legacy] stubs, robots.txt
  layouts/              Base (head, SEO, JSON-LD) → Cv (the page itself)
  components/           layout/, sections/, ui/
  scripts/              The three browser enhancements. Nothing else runs client-side.
  data/                 Structured content: roles, studies, stack, contact
  locales/              Prose, one JSON bundle per language
  styles/               Tokens, base, component and section partials, print
  utils/                i18n, SEO graph, dates, navigation, icons
scripts/verify-build.ts Deploy-shape assertions for the production build
```

**Content lives in two places on purpose.** Structure (dates, employers, group membership) is
typed TypeScript in `src/data/`; prose is JSON in `src/locales/`. Adding a language breaks the
build at every place that needs a translation, which is the point.

## Known

`npm audit` reports issues in `@lhci/cli` → `lighthouse` → `puppeteer`. They are devDependencies
that only run in CI and never reach the browser; `audit fix --force` would downgrade the
Lighthouse gate itself.
