import { defineConfig } from "@playwright/test";

const internalPort = process.env.PLAYWRIGHT_PORT ?? "4229";
const internalBaseUrl = `http://127.0.0.1:${internalPort}`;

export default defineConfig({
    testDir: "./tests/e2e",
    fullyParallel: true,
    reporter: "list",
    use: {
        baseURL: process.env.PLAYWRIGHT_BASE_URL ?? internalBaseUrl,
    },
});
