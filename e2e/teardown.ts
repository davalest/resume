import {stopPreview} from "./server.ts";

export default function globalTeardown(): void {
    stopPreview();
}