import {fileURLToPath} from "node:url";
import {defineConfig} from "astro/config";
import sitemap from "@astrojs/sitemap";
import {basePath, defaultLocale, legacyRoutes, locales, siteUrl} from "./site.config.ts";
import {lastModified} from "@/utils/lastModified.ts";

const legacyPaths = legacyRoutes.map(({from}) => `${basePath}${from}/`);

export default defineConfig({
    site: siteUrl,
    base: basePath,
    trailingSlash: "always",
    build: {format: "directory", inlineStylesheets: "auto"},
    output: "static",
    i18n: {
        defaultLocale: defaultLocale.code,
        locales: locales.map(({code}) => code),
        routing: {prefixDefaultLocale: false, redirectToDefaultLocale: false},
    },

    integrations: [
        sitemap({
            i18n: {
                defaultLocale: defaultLocale.code,
                locales: Object.fromEntries(
                    locales.map(({code, ogLocale}) => [code, ogLocale.replace("_", "-")]),
                ),
            },
            filter: (page) => {
                const {pathname} = new URL(page);
                return (
                    !legacyPaths.includes(pathname) &&
                    !pathname.endsWith("/404/") &&
                    !pathname.endsWith(".vcf")
                );
            },
            changefreq: "monthly",
            lastmod: new Date(lastModified()),
        }),
    ],

    image: {
        remotePatterns: [],
    },

    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    loadPaths: [fileURLToPath(new URL("./src/styles", import.meta.url))],
                },
            },
        },
    },
});
