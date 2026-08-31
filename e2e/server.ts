import {execFileSync} from "node:child_process";

const PORT = 4173;
export const baseURL = `http://localhost:${PORT}`;

const astro = (...args: string[]): string =>
    execFileSync("npx", ["astro", ...args], {encoding: "utf-8", stdio: ["ignore", "pipe", "pipe"]});

export const stopPreview = (): void => {
    try {
        astro("preview", "stop");
    } catch {
        // Nothing was running. That is the state we wanted anyway.
    }
};

const waitUntilServing = async (timeoutMs = 60_000): Promise<void> => {
    const deadline = Date.now() + timeoutMs;

    while (Date.now() < deadline) {
        try {
            const response = await fetch(`${baseURL}/`);
            if (response.ok) {
                return;
            }
        } catch {
            // Not up yet.
        }
        await new Promise((resolve) => setTimeout(resolve, 250));
    }

    throw new Error(`preview server never answered on ${baseURL}`);
};

export default async function globalSetup(): Promise<void> {
    stopPreview();

    // `SKIP_BUILD=1` for a fast loop when you know dist/ is current.
    if (!process.env.SKIP_BUILD) {
        execFileSync("npm", ["run", "build"], {stdio: "inherit"});
    }

    astro("preview", "--port", String(PORT));
    await waitUntilServing();
}
