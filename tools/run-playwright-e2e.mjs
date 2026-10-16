import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const playwrightCli = path.join(projectRoot, "node_modules", "@playwright", "test", "cli.js");
const host = process.env.PLAYWRIGHT_HOST ?? "127.0.0.1";
const port = Number(process.env.PLAYWRIGHT_PORT ?? 4229);
const internalBaseUrl = `http://127.0.0.1:${port}`;

if (!existsSync(playwrightCli)) {
    throw new Error(`Playwright CLI not found: ${playwrightCli}`);
}

const runPlaywright = (baseUrl) => new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [playwrightCli, "test", ...process.argv.slice(2)], {
        cwd: projectRoot,
        env: { ...process.env, PLAYWRIGHT_BASE_URL: baseUrl },
        stdio: "inherit",
    });
    child.once("error", reject);
    child.once("exit", (code, signal) => resolve(code ?? (signal ? 1 : 0)));
});

const waitForServer = async (baseUrl) => {
    const healthUrl = `${baseUrl}/__playwright_health`;
    const deadline = Date.now() + 15000;
    while (Date.now() < deadline) {
        try {
            const response = await fetch(healthUrl, { signal: AbortSignal.timeout(500) });
            if (response.ok) return;
        } catch {
            // The server may still be starting.
        }
        await new Promise((resolve) => setTimeout(resolve, 100));
    }
    throw new Error(`Timed out waiting for the Playwright static server at ${healthUrl}.`);
};

const stopServer = async (server) => {
    if (server.exitCode !== null) return;
    server.kill();
    await new Promise((resolve) => {
        const timer = setTimeout(resolve, 2000);
        server.once("exit", () => {
            clearTimeout(timer);
            resolve();
        });
    });
    if (server.exitCode === null && process.platform === "win32" && server.pid !== undefined) {
        spawn("taskkill", ["/pid", String(server.pid), "/T", "/F"], { stdio: "ignore" });
    }
};

const externalBaseUrl = process.env.PLAYWRIGHT_BASE_URL;
if (externalBaseUrl) {
    process.exitCode = await runPlaywright(externalBaseUrl);
} else {
    const server = spawn(process.execPath, ["tools/playwright-static-server.mjs"], {
        cwd: projectRoot,
        env: { ...process.env, PLAYWRIGHT_HOST: host, PLAYWRIGHT_PORT: String(port) },
        stdio: "inherit",
    });
    try {
        await waitForServer(internalBaseUrl);
        process.exitCode = await runPlaywright(internalBaseUrl);
    } finally {
        await stopServer(server);
    }
}
