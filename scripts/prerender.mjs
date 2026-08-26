import {createServer} from "node:http";
import {mkdir, readFile, writeFile} from "node:fs/promises";
import path from "node:path";
import {fileURLToPath} from "node:url";
import {chromium} from "playwright";
import {basePath, locales, siteUrl, urlForLocale} from "../site.config.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");

const LOCALES = locales.map((locale) => ({
    ...locale,
    out: `${locale.route}index.html`,
    ogLocaleAlternate: locales.find(({code}) => code !== locale.code).ogLocale,
}));


const LEGACY_ROUTES = [
    {from: "home", hash: ""},
    {from: "resume", hash: "#experience"},
    {from: "skills", hash: "#stack"},
];

const readLocaleStrings = async (code) =>
    JSON.parse(
        await readFile(path.join(rootDir, "src/locales", code, "translation.json"), "utf-8"),
    );

const structuredData = ({url, seo}) =>
    JSON.stringify(
        {
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            mainEntity: {
                "@type": "Person",
                name: "David Valenciano",
                jobTitle: seo.job_title,
                description: seo.description,
                url,
                image: `${siteUrl}og-image.jpg`,
                // schema.org expects the address, not a mailto: URI.
                email: "david.valenciano.esteban@gmail.com",
                sameAs: [
                    "https://www.linkedin.com/in/david-valenciano",
                    "https://github.com/davalest",
                ],
                worksFor: {"@type": "Organization", name: "Docline"},
                address: {
                    "@type": "PostalAddress",
                    addressLocality: "Madrid",
                    addressCountry: "ES",
                },
                knowsLanguage: [
                    {"@type": "Language", name: "Spanish", alternateName: "es"},
                    {"@type": "Language", name: "English", alternateName: "en"},
                ],
                knowsAbout: [
                    "React",
                    "TypeScript",
                    "React Native",
                    "Next.js",
                    "Front-end architecture",
                ],
                alumniOf: [
                    {"@type": "EducationalOrganization", name: "Ilerna"},
                    {"@type": "EducationalOrganization", name: "IES Lázaro Cárdenas"},
                    {"@type": "EducationalOrganization", name: "IES Infanta Elena"},
                ],
                hasOccupation: {
                    "@type": "Occupation",
                    name: "Front-End Engineer",
                    skills: "React, TypeScript, React Native, design systems, front-end architecture",
                },
            },
        },
        null,
        2,
    );


const applyMetadata = (meta) => {
    const set = (selector, attribute, value) => {
        const element = document.querySelector(selector);
        if (!element) {
            throw new Error(`prerender: no element matched ${selector}`);
        }
        element.setAttribute(attribute, value);
    };

    const setOrCreate = (selector, tag, attributes) => {
        const element =
            document.querySelector(selector) ??
            document.head.appendChild(document.createElement(tag));
        Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value));
    };

    document.title = meta.title;
    set('meta[name="description"]', "content", meta.description);
    setOrCreate('link[rel="canonical"]', "link", {rel: "canonical", href: meta.url});

    meta.alternates.forEach(({hreflang, href}) => {
        setOrCreate(`link[rel="alternate"][hreflang="${hreflang}"]`, "link", {
            rel: "alternate",
            hreflang,
            href,
        });
    });

    set('meta[property="og:title"]', "content", meta.title);
    set('meta[property="og:description"]', "content", meta.ogDescription);
    setOrCreate('meta[property="og:url"]', "meta", {property: "og:url", content: meta.url});
    setOrCreate('meta[property="og:image"]', "meta", {property: "og:image", content: meta.image});
    set('meta[property="og:image:alt"]', "content", meta.imageAlt);
    set('meta[property="og:locale"]', "content", meta.ogLocale);
    set('meta[property="og:locale:alternate"]', "content", meta.ogLocaleAlternate);

    set('meta[name="twitter:title"]', "content", meta.title);
    set('meta[name="twitter:description"]', "content", meta.ogDescription);
    setOrCreate('meta[name="twitter:image"]', "meta", {name: "twitter:image", content: meta.image});

    const jsonLd = document.querySelector('script[type="application/ld+json"]');
    if (!jsonLd) {
        throw new Error("prerender: no JSON-LD block to fill");
    }
    jsonLd.textContent = meta.jsonLd;
};

const MIME_TYPES = {
    ".html": "text/html; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".svg": "image/svg+xml",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".pdf": "application/pdf",
    ".json": "application/json; charset=utf-8",
    ".webmanifest": "application/manifest+json",
    ".txt": "text/plain; charset=utf-8",
    ".xml": "application/xml; charset=utf-8",
};

const server = createServer(async (req, res) => {
    const requestPath = decodeURIComponent(req.url.split("?")[0]);

    if (!requestPath.startsWith(basePath)) {
        res.writeHead(404).end();
        return;
    }

    let relativePath = requestPath.slice(basePath.length);
    if (relativePath === "" || relativePath.endsWith("/")) {
        relativePath += "index.html";
    }

    try {
        const data = await readFile(path.join(distDir, relativePath));
        const contentType = MIME_TYPES[path.extname(relativePath)] ?? "application/octet-stream";
        res.writeHead(200, {"Content-Type": contentType});
        res.end(data);
    } catch {
        if (path.extname(relativePath) === ".html") {
            res.writeHead(200, {"Content-Type": MIME_TYPES[".html"]});
            res.end(await readFile(path.join(distDir, "index.html")));
            return;
        }
        res.writeHead(404).end();
    }
});

await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const {port} = server.address();
const origin = `http://127.0.0.1:${port}`;

const browser = await chromium.launch();

const defaultLocale = locales.find(({isDefault}) => isDefault) ?? locales[0];

const sitemap = () => {
    const entry = (code) => {
        const alternates = [
            ...locales.map((locale) => ({hreflang: locale.code, href: urlForLocale(locale.code)})),
            {hreflang: "x-default", href: urlForLocale(defaultLocale.code)},
        ]
            .map(
                ({hreflang, href}) =>
                    `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${href}"/>`,
            )
            .join("\n");

        return `  <url>\n    <loc>${urlForLocale(code)}</loc>\n${alternates}\n    <changefreq>monthly</changefreq>\n    <priority>1.0</priority>\n  </url>`;
    };

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${locales.map(({code}) => entry(code)).join("\n")}
</urlset>
`;
};


const robots = () => `User-agent: *
Allow: /

Sitemap: ${siteUrl}sitemap.xml
`;

try {
    const rendered = [];

    for (const locale of LOCALES) {
        const {seo} = await readLocaleStrings(locale.code);
        const url = `${siteUrl}${locale.route}`;
        const page = await browser.newPage();

        await page.goto(`${origin}${basePath}${locale.route}`, {waitUntil: "networkidle"});


        await page.waitForFunction(
            (code) =>
                document.documentElement.lang === code &&
                (document.querySelector(".hero-name")?.textContent ?? "").trim().length > 0,
            locale.code,
            {timeout: 10_000},
        );

        await page.evaluate(applyMetadata, {
            alternates: [
                ...locales.map(({code}) => ({hreflang: code, href: urlForLocale(code)})),
                {hreflang: "x-default", href: urlForLocale(defaultLocale.code)},
            ],
            image: `${siteUrl}og-image.jpg`,
            title: seo.title,
            description: seo.description,
            ogDescription: seo.og_description,
            imageAlt: seo.image_alt,
            ogLocale: locale.ogLocale,
            ogLocaleAlternate: locale.ogLocaleAlternate,
            url,
            jsonLd: structuredData({url, seo}),
        });

        rendered.push({out: locale.out, html: `${await page.content()}\n`, url});
        await page.close();
    }

    for (const {out, html, url} of rendered) {
        const target = path.join(distDir, out);
        await mkdir(path.dirname(target), {recursive: true});
        await writeFile(target, html);
        console.log(`Prerendered dist/${out} as ${url}`);
    }

    await writeFile(path.join(distDir, "sitemap.xml"), sitemap());
    await writeFile(path.join(distDir, "robots.txt"), robots());
    console.log(`Wrote sitemap.xml (${locales.length} URLs) and robots.txt from site.config.mjs`);

    for (const {from, hash} of LEGACY_ROUTES) {
        const outDir = path.join(distDir, from);
        await mkdir(outDir, {recursive: true});
        await writeFile(
            path.join(outDir, "index.html"),
            `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>David Valenciano — Senior Front-End Engineer</title>
<link rel="canonical" href="${siteUrl}">
<meta http-equiv="refresh" content="0; url=${basePath}${hash}">
<script>location.replace(${JSON.stringify(`${basePath}${hash}`)});</script>
</head>
<body><p>This page moved. <a href="${basePath}${hash}">Continue to the CV</a>.</p></body>
</html>
`,
        );
    }
    console.log(
        `Wrote ${LEGACY_ROUTES.length} legacy redirect stubs: ${LEGACY_ROUTES.map(({from}) => `/${from}`).join(", ")}`,
    );
} finally {
    await browser.close();
    server.close();
}
