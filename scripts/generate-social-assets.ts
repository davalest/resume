import {readFile, writeFile} from "node:fs/promises";
import path from "node:path";
import {chromium} from "@playwright/test";
import en from "../src/locales/en/translation.json" with {type: "json"};
import {stackGroups} from "../src/data/stack.ts";

const root = path.resolve(import.meta.dirname, "..");

const escapeHtml = (value: string): string =>
    value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");

const faviconSvg = await readFile(path.join(root, "public/favicon.svg"), "utf-8");
const photoBase64 = (await readFile(path.join(root, "src/assets/portrait.jpg"))).toString("base64");

const name = en.header.name;
const role = en.seo.job_title;
const tags = [...(stackGroups[0]?.items ?? [])].slice(0, 3);

const browser = await chromium.launch();

try {
    const iconPage = await browser.newPage({viewport: {width: 180, height: 180}});
    await iconPage.setContent(`
        <!doctype html>
        <meta charset="utf-8" />
        <style>
            * { margin: 0; padding: 0; }
            body { width: 180px; height: 180px; }
            svg { width: 180px; height: 180px; display: block; }
        </style>
        ${faviconSvg}
    `);
    await iconPage.screenshot({path: path.join(root, "public/apple-touch-icon.png")});
    await iconPage.close();

    const ogPage = await browser.newPage({viewport: {width: 1200, height: 630}});
    await ogPage.setContent(`
        <!doctype html>
        <meta charset="utf-8" />
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
                width: 1200px;
                height: 630px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                background: #242424;
                color: rgba(255, 255, 255, 0.87);
                font-family: Arial, Helvetica, sans-serif;
                padding: 80px;
            }
            .text { max-width: 620px; }
            .name { font-size: 54px; font-weight: 700; margin-bottom: 14px; line-height: 1.1; }
            .role { font-size: 30px; color: #46ABB7; font-weight: 600; margin-bottom: 28px; }
            .tags { display: flex; flex-wrap: wrap; gap: 12px; }
            .tag {
                border: 2px solid #46ABB7;
                color: #46ABB7;
                border-radius: 999px;
                padding: 8px 20px;
                font-size: 19px;
                font-weight: 600;
            }
            .photo {
                width: 340px;
                height: 340px;
                border-radius: 50%;
                object-fit: cover;
                border: 6px solid #46ABB7;
                flex-shrink: 0;
            }
        </style>
        <div class="text">
            <div class="name">${escapeHtml(name)}</div>
            <div class="role">${escapeHtml(role)}</div>
            <div class="tags">
                ${tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("\n                ")}
            </div>
        </div>
        <img class="photo" alt="" src="data:image/jpeg;base64,${photoBase64}" />
    `);
    const ogBuffer = await ogPage.screenshot({type: "jpeg", quality: 92});
    await writeFile(path.join(root, "public/og-image.jpg"), ogBuffer);
    await ogPage.close();

    console.log(
        `Wrote public/apple-touch-icon.png and public/og-image.jpg — "${role}", ${tags.join(", ")}`,
    );
} finally {
    await browser.close();
}
