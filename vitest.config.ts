import path from "node:path";
import { defineConfig } from "vitest/config";
import { createEntityRecordsPlugin } from "./src/build/entity-records-plugin";

export default defineConfig({
    plugins: [createEntityRecordsPlugin(
        path.join(process.cwd(), "src", "catalogs", "entity-records"),
        {
            exposeRecordsToClient: true,
        },
    )],
    test: {
        environment: "jsdom",
        include: [
            "src/**/*.test.{ts,tsx}",
            "tools/**/*.test.mjs",
        ],
        setupFiles: ["./src/test-setup.ts"],
    },
});
