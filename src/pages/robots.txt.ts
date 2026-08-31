import type {APIRoute} from "astro";
import {siteUrl} from "../../site.config.ts";

export const GET: APIRoute = () => {
    const body = ["User-agent: *", "Allow: /", "", `Sitemap: ${siteUrl}sitemap-index.xml`, ""].join(
        "\n",
    );

    return new Response(body, {
        headers: {"Content-Type": "text/plain; charset=utf-8"},
    });
};
