import {fileURLToPath} from "node:url";
import {defineConfig, type Plugin} from "vite";
import react from "@vitejs/plugin-react";
import {imagetools} from "vite-imagetools";
import {basePath} from "./site.config.mjs";

const relaxStyleSrcForDevServer = (): Plugin => ({
  name: "relax-style-src-for-dev-server",
  apply: "serve",
  transformIndexHtml: (html) =>
      html.replace(/style-src 'self'/, "style-src 'self' 'unsafe-inline'"),
});

export default defineConfig({
  base: basePath,
  plugins: [react(), imagetools(), relaxStyleSrcForDevServer()],
  resolve: {
    alias: {
      "@assets": fileURLToPath(new URL("./src/assets/assets.ts", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: [fileURLToPath(new URL("./src/styles", import.meta.url))],
      },
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
  },
});
