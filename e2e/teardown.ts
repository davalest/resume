import {stopPreview} from "./server.ts";

export default async function globalTeardown(): Promise<void> {
    await stopPreview();
}
