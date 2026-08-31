import {readFileSync, existsSync, readdirSync} from "node:fs";
import path from "node:path";
import {cvFilesInPublic, legacyRoutes, locales, siteUrl} from "../site.config.ts";

const DIST = process.env.DIST_DIR ?? "dist-pages";

const expectedBase = new URL(siteUrl).pathname;

const failures: string[] = [];

const check = (label: string, condition: boolean, detail = ""): void => {
    if (!condition) {
        failures.push(detail ? `${label} — ${detail}` : label);
    }
};

const read = (file: string): string => readFileSync(path.join(DIST, file), "utf-8");
const exists = (file: string): boolean => existsSync(path.join(DIST, file));

for (const {route} of locales) {
    check(`dist/${route}index.html exists`, exists(`${route}index.html`));
}
check("dist/404.html exists", exists("404.html"));
check("dist/robots.txt exists", exists("robots.txt"));
check("dist/sitemap-index.xml exists", exists("sitemap-index.xml"));

const home = exists("index.html") ? read("index.html") : "";

check(
    "assets are served from the configured base path",
    home.includes(`href="${expectedBase}_astro/`) || home.includes(`src="${expectedBase}_astro/`),
    `expected asset URLs under ${expectedBase}`,
);

check(
    "the favicon resolves under the base path",
    home.includes(`href="${expectedBase}favicon.svg"`),
    `expected ${expectedBase}favicon.svg`,
);

const robots = exists("robots.txt") ? read("robots.txt") : "";

check("robots.txt points at the sitemap index", robots.includes(`${siteUrl}sitemap-index.xml`));

const disallowed = [...robots.matchAll(/^Disallow:\s*(\S+)/gm)].map(([, rule]) => rule ?? "");
const selfBlocking = disallowed.filter((rule) => rule !== "" && expectedBase.startsWith(rule));
check(
    "robots.txt does not disallow the site's own base path",
    selfBlocking.length === 0,
    `these rules block ${expectedBase}: ${selfBlocking.join(", ")}`,
);

const sitemapFile = readdirSync(DIST).find((name) => /^sitemap-\d+\.xml$/.test(name));
const sitemap = sitemapFile ? read(sitemapFile) : "";
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, loc]) => loc ?? "");

check(
    "the sitemap lists one URL per language",
    locs.length === locales.length,
    `got ${locs.length}: ${locs.join(", ")}`,
);

for (const {route} of locales) {
    check(
        `the sitemap lists ${siteUrl}${route}`,
        locs.includes(`${siteUrl}${route}`),
        locs.join(", "),
    );
}

check(
    "every sitemap URL sits under the canonical origin and base path",
    locs.every((loc) => loc.startsWith(siteUrl)),
    locs.filter((loc) => !loc.startsWith(siteUrl)).join(", "),
);

for (const file of cvFilesInPublic) {
    check(`the sitemap keeps ${file} out`, !sitemap.includes(file));
    check(`${file} is still served`, exists(file));
}

const noindexPages = ["404.html", ...legacyRoutes.map(({from}) => `${from}/index.html`)];

for (const name of noindexPages) {
    if (!exists(name)) {
        failures.push(`${name} was not generated`);
        continue;
    }
    const html = read(name);
    check(`${name} is noindex`, html.includes('<meta name="robots" content="noindex'));
    check(`${name} claims no canonical`, !html.includes('rel="canonical"'));
    check(`${name} advertises no hreflang alternates`, !html.includes('rel="alternate"'));
    check(`${name} carries the CSP`, html.includes('http-equiv="Content-Security-Policy"'));
    check(`${name} carries no inline script`, !/<script(?![^>]*\bsrc=)/.test(html));
}

for (const {from} of legacyRoutes) {
    const name = `${from}/index.html`;
    if (!exists(name)) {
        continue;
    }
    const html = read(name);
    check(`${name} redirects`, html.includes('http-equiv="refresh"'));
    check(`${name} also offers a link`, /<a [^>]*href=/.test(html));
}

const walk = (dir: string): string[] =>
    readdirSync(dir, {withFileTypes: true}).flatMap((entry) => {
        const full = path.join(dir, entry.name);
        return entry.isDirectory() ? walk(full) : [full];
    });

const junk = walk(DIST).filter((file) =>
    /(\.DS_Store|Thumbs\.db|\.map)$/.test(path.basename(file)),
);
check("dist carries no editor or OS junk", junk.length === 0, junk.join(", "));

if (failures.length) {
    console.error(`\nverify-build: ${failures.length} problem(s) in dist/\n`);
    for (const failure of failures) {
        console.error(`  ✖ ${failure}`);
    }
    console.error("");
    process.exit(1);
}

console.log(
    `verify-build: ${DIST}/ is consistent with siteUrl ${siteUrl} and base ${expectedBase}`,
);
