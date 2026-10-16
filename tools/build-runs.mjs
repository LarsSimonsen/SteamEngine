import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

export const projectRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
export const viteBin = path.join(projectRoot, "node_modules", "vite", "bin", "vite.js");
export const buildRunsRoot = path.join(projectRoot, ".build-runs");
export const cloudflareArtifactRoot = path.join(buildRunsRoot, "cloudflare-artifact");

const deploymentLockPath = path.join(buildRunsRoot, ".deployment.lock");
const unreadableLockStaleAgeMs = 24 * 60 * 60 * 1000;

const runToken = () => `${Date.now().toString(36)}-${process.pid}-${crypto.randomBytes(4).toString("hex")}`;

const safeLabel = (label) => label.replace(/[^a-z0-9_-]+/gi, "-").replace(/^-+|-+$/g, "") || "build";

export const createBuildRun = (label) => {
    const runId = `${safeLabel(label)}-${runToken()}`;
    const workspace = path.join(buildRunsRoot, runId);
    const outputDirectory = path.join(workspace, "public");

    fs.mkdirSync(workspace, { recursive: true });
    return {
        runId,
        workspace,
        outputDirectory,
        cacheDirectory: path.join(workspace, "vite-cache"),
    };
};

export const buildEnvironment = (run, overrides = {}) => ({
    ...process.env,
    STEAM_ENGINE_BUILD_WORKSPACE: run.workspace,
    STEAM_ENGINE_BUILD_OUT_DIR: run.outputDirectory,
    STEAM_ENGINE_BUILD_CACHE_DIR: run.cacheDirectory,
    ...overrides,
});

export const runViteBuild = (run, environment, mode = "production") => spawnSync(
    process.execPath,
    [viteBin, "build", "--mode", mode, "--configLoader", "runner"],
    {
        cwd: projectRoot,
        env: buildEnvironment(run, environment),
        stdio: "inherit",
    },
);

export const runValidationCommand = (command, args, environment) => spawnSync(command, args, {
    cwd: projectRoot,
    env: environment,
    stdio: "inherit",
});

export const validateFullBuild = (run, environment) => {
    const validationEnvironment = {
        ...environment,
        STEAM_ENGINE_PUBLIC_ROOT: run.outputDirectory,
    };
    const routeResult = runValidationCommand(
        "powershell.exe",
        [
            "-NoProfile",
            "-ExecutionPolicy",
            "Bypass",
            "-File",
            path.join(projectRoot, "tools", "test-route-contract.ps1"),
        ],
        validationEnvironment,
    );
    if (routeResult.error) throw routeResult.error;
    if (routeResult.status !== 0) return routeResult.status ?? 1;

    const linksResult = runValidationCommand(
        process.execPath,
        [path.join(projectRoot, "tools", "check-generated-links.mjs")],
        validationEnvironment,
    );
    if (linksResult.error) throw linksResult.error;
    return linksResult.status ?? 1;
};

const sleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

const writeDeploymentLock = () => {
    const descriptor = fs.openSync(deploymentLockPath, "wx");
    fs.writeFileSync(descriptor, JSON.stringify({ pid: process.pid, createdAt: new Date().toISOString() }), "utf8");
    fs.closeSync(descriptor);
};

const lockOwnerIsRunning = () => {
    try {
        const lock = JSON.parse(fs.readFileSync(deploymentLockPath, "utf8"));
        if (!Number.isSafeInteger(lock.pid) || lock.pid <= 0) return undefined;
        try {
            process.kill(lock.pid, 0);
            return true;
        } catch (error) {
            return error?.code === "ESRCH" ? false : true;
        }
    } catch {
        return undefined;
    }
};

const acquireDeploymentLock = async () => {
    fs.mkdirSync(buildRunsRoot, { recursive: true });
    while (true) {
        try {
            writeDeploymentLock();
            return;
        } catch (error) {
            if (error?.code !== "EEXIST") throw error;
            const ownerIsRunning = lockOwnerIsRunning();
            const lockAge = Date.now() - fs.statSync(deploymentLockPath).mtimeMs;
            if (ownerIsRunning === false
                || (ownerIsRunning === undefined && lockAge > unreadableLockStaleAgeMs)) {
                fs.rmSync(deploymentLockPath, { force: true });
                continue;
            }
            await sleep(100);
        }
    }
};

const releaseDeploymentLock = () => fs.rmSync(deploymentLockPath, { force: true });

export const withDeploymentLock = async (callback) => {
    await acquireDeploymentLock();
    try {
        return await callback();
    } finally {
        releaseDeploymentLock();
    }
};

export const cleanupGeneratedBuildPages = (run) => {
    fs.rmSync(path.join(projectRoot, "src", "pages", ".build-runs", run.runId), {
        recursive: true,
        force: true,
    });
};

export const cleanupBuildRun = (run) => {
    fs.rmSync(run.workspace, { recursive: true, force: true });
    cleanupGeneratedBuildPages(run);
};
