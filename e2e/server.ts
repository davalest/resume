import {execFileSync} from "node:child_process";
import {createReadStream, existsSync, statSync} from "node:fs";
import {createServer, type Server} from "node:http";
import path from "node:path";

const PORT = 4173;
export const baseURL = `http://localhost:${PORT}`;

const DIST = "dist";

const MIME: Record<string, string> = {
    ".html": "text/html; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".svg": "image/svg+xml",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
    ".avif": "image/avif",
    ".m4a": "audio/mp4",
    ".ogg": "audio/ogg",
    ".pdf": "application/pdf",
    ".json": "application/json; charset=utf-8",
    ".webmanifest": "application/manifest+json",
    ".txt": "text/plain; charset=utf-8",
    ".xml": "application/xml; charset=utf-8",
    ".vcf": "text/vcard; charset=utf-8",
};

const resolve = (urlPath: string): string | undefined => {
    const relative = decodeURIComponent(urlPath.split("?")[0] ?? "/").replace(/^\/+/, "");
    const candidates =
        relative.endsWith("/") || relative === ""
            ? [path.join(relative, "index.html")]
            : [relative, path.join(relative, "index.html")];

    for (const candidate of candidates) {
        const file = path.join(DIST, candidate);
        // Never serve outside dist/, whatever the request says.
        if (!path.resolve(file).startsWith(path.resolve(DIST))) {
            return undefined;
        }
        if (existsSync(file) && statSync(file).isFile()) {
            return file;
        }
    }
    return undefined;
};

let server: Server | undefined;

const start = (): Promise<void> =>
    new Promise((ready, fail) => {
        server = createServer((request, response) => {
            const file = resolve(request.url ?? "/");

            if (!file) {
                const notFound = path.join(DIST, "404.html");
                response.writeHead(404, {"Content-Type": MIME[".html"]!});
                if (existsSync(notFound)) {
                    createReadStream(notFound).pipe(response);
                } else {
                    response.end("Not found");
                }
                return;
            }

            response.writeHead(200, {
                "Content-Type": MIME[path.extname(file)] ?? "application/octet-stream",
            });
            createReadStream(file).pipe(response);
        });

        server.once("error", fail);
        server.listen(PORT, "localhost", () => ready());
    });

export const stopPreview = async (): Promise<void> => {
    try {
        execFileSync("npx", ["astro", "preview", "stop"], {stdio: "ignore", timeout: 20_000});
    } catch {
        // Nothing running, or no Astro daemon at all. Either is fine.
    }

    if (server) {
        await new Promise<void>((done) => server?.close(() => done()));
        server = undefined;
    }
};

export default async function globalSetup(): Promise<void> {
    await stopPreview();

    // `SKIP_BUILD=1` for a fast loop when you know dist/ is current.
    if (!process.env.SKIP_BUILD) {
        execFileSync("npm", ["run", "build"], {stdio: "inherit"});
    }

    await start();
}
