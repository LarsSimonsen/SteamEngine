import fs from "node:fs";
import { afterEach, describe, expect, it } from "vitest";
import {
    buildEnvironment,
    cleanupBuildRun,
    createBuildRun,
    withDeploymentLock,
} from "./build-runs.mjs";

const runs = [];

afterEach(() => {
    while (runs.length > 0) cleanupBuildRun(runs.pop());
});

describe("build runs", () => {
    it("allocates separate workspaces for concurrent invocations", () => {
        const first = createBuildRun("partial-coil");
        const second = createBuildRun("partial-coil");
        runs.push(first, second);

        expect(first.runId).not.toBe(second.runId);
        expect(first.workspace).not.toBe(second.workspace);
        expect(first.outputDirectory).not.toBe(second.outputDirectory);
        expect(fs.existsSync(first.workspace)).toBe(true);
        expect(fs.existsSync(second.workspace)).toBe(true);
    });

    it("passes isolated output and cache paths to the build environment", () => {
        const run = createBuildRun("full");
        runs.push(run);

        const environment = buildEnvironment(run, { STEAM_ENGINE_BUILD_ROUTE: "coil" });

        expect(environment.STEAM_ENGINE_BUILD_WORKSPACE).toBe(run.workspace);
        expect(environment.STEAM_ENGINE_BUILD_OUT_DIR).toBe(run.outputDirectory);
        expect(environment.STEAM_ENGINE_BUILD_CACHE_DIR).toBe(run.cacheDirectory);
        expect(environment.STEAM_ENGINE_BUILD_ROUTE).toBe("coil");
    });

    it("serializes deployment callbacks", async () => {
        let active = 0;
        let maximumActive = 0;
        const enterAndLeave = async () => withDeploymentLock(async () => {
            active += 1;
            maximumActive = Math.max(maximumActive, active);
            await new Promise((resolve) => setTimeout(resolve, 10));
            active -= 1;
        });

        await Promise.all([enterAndLeave(), enterAndLeave()]);

        expect(maximumActive).toBe(1);
    });

});
