import fs from "node:fs";
import {
    buildEnvironment,
    cloudflareArtifactRoot,
    cleanupBuildRun,
    createBuildRun,
    projectRoot,
    runValidationCommand,
    runViteBuild,
    validateFullBuild,
    withDeploymentLock,
} from "./build-runs.mjs";
import { prepareCloudflarePagesArtifact } from "./cloudflare-pages-artifact.mjs";
import {
    prepareInactiveIisSlot,
    determineIisDeploymentPlanFromBroker,
} from "./iis-deployment-slots.mjs";
import { defaultIisSlotBrokerClient } from "./iis-slot-broker-client.mjs";

const fast = process.argv.includes("--fast");
const cloudflareArtifact = process.argv.includes("--cloudflare-artifact");

const buildAndValidate = (run) => {
    const environment = buildEnvironment(run, {
        STEAM_ENGINE_BUILD_LOCALE: "",
        STEAM_ENGINE_BUILD_ROUTE: "",
        STEAM_ENGINE_BUILD_ALL_LOCALES: "",
        STEAM_ENGINE_BUILD_COMPACT_HTML: "1",
        STEAM_ENGINE_BUILD_FAST: fast ? "1" : "",
    });
    const buildResult = runViteBuild(run, environment);
    if (buildResult.error) throw buildResult.error;
    if (buildResult.status !== 0) {
        throw new Error(`Vite build failed with exit code ${buildResult.status ?? 1}.`);
    }

    const validationStatus = validateFullBuild(run, environment);
    if (validationStatus !== 0) {
        throw new Error(`Full-build validation failed with exit code ${validationStatus}.`);
    }
};

const buildLocalIisSlot = () => withDeploymentLock(async () => {
    const lease = await defaultIisSlotBrokerClient.inspect();
    const plan = determineIisDeploymentPlanFromBroker({ ...lease, projectRoot });
    const workspaceRun = createBuildRun("full-local-iis");
    const run = { ...workspaceRun, outputDirectory: plan.inactiveDirectory };
    try {
        prepareInactiveIisSlot(plan);
        console.log(
            `Building inactive IIS ${plan.inactiveSlot} slot while ${plan.activeSlot} remains active.`,
        );
        buildAndValidate(run);
        const switched = await defaultIisSlotBrokerClient.switch(lease.leaseId);
        console.log(
            `IIS now serves validated ${switched.activeState} slot; broker verification: ${switched.verified}.`,
        );
    } finally {
        cleanupBuildRun(run);
    }
});

const buildCloudflareArtifact = () => withDeploymentLock(() => {
    const workspaceRun = createBuildRun("full-cloudflare-artifact");
    const run = { ...workspaceRun, outputDirectory: cloudflareArtifactRoot };
    try {
        fs.rmSync(cloudflareArtifactRoot, { recursive: true, force: true });
        fs.mkdirSync(cloudflareArtifactRoot, { recursive: true });
        buildAndValidate(run);
        prepareCloudflarePagesArtifact(cloudflareArtifactRoot);
        const validation = runValidationCommand(
            process.execPath,
            ["tools/test-cloudflare-pages-artifact.mjs"],
            buildEnvironment(run, { STEAM_ENGINE_CLOUDFLARE_ARTIFACT: cloudflareArtifactRoot }),
        );
        if (validation.error) throw validation.error;
        if (validation.status !== 0) {
            throw new Error(`Cloudflare artifact validation failed with exit code ${validation.status ?? 1}.`);
        }
        console.log("Validated Cloudflare Pages artifact built in .build-runs/cloudflare-artifact.");
    } finally {
        cleanupBuildRun(run);
    }
});

try {
    if (cloudflareArtifact) await buildCloudflareArtifact();
    else await buildLocalIisSlot();
} catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
}
