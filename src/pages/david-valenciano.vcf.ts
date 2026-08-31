import type {APIRoute} from "astro";
import {siteUrl} from "../../site.config.ts";
import {email, socialLinks} from "../data/contact.ts";
import {translator} from "../utils/i18n.ts";


export const GET: APIRoute = () => {
    const t = translator("en");
    const profile = (id: string): string => socialLinks.find((link) => link.id === id)?.href ?? "";

    const card = [
        "BEGIN:VCARD",
        "VERSION:3.0",
        "N:Valenciano Esteban;David;;;",
        "FN:David Valenciano",
        `TITLE:${t("seo.job_title")}`,
        "ORG:Docline",
        `EMAIL;TYPE=INTERNET,PREF:${email.label}`,
        `URL:${siteUrl}`,
        "ADR;TYPE=WORK:;;;Madrid;;;Spain",
        `X-SOCIALPROFILE;TYPE=linkedin:${profile("linkedin")}`,
        `X-SOCIALPROFILE;TYPE=github:${profile("github")}`,
        `NOTE:${t("seo.og_description")}`,
        "END:VCARD",
        "",
    ].join("\r\n");

    return new Response(card, {
        headers: {"Content-Type": "text/vcard; charset=utf-8"},
    });
};
