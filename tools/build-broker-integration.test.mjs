import fs from "node:fs";
import { describe, expect, it } from "vitest";

const read = (file) => fs.readFileSync(new URL(file, import.meta.url), "utf8");

describe("local IIS broker build integration", () => {
    it("uses the broker for regular and sharded local switches", () => {
        for (const file of ["./build.mjs", "./build-sharded.mjs"]) {
            const source = read(file);
            expect(source).toContain("defaultIisSlotBrokerClient.inspect()");
            expect(source).toContain("defaultIisSlotBrokerClient.switch(lease.leaseId)");
            expect(source).not.toContain("readIisDeploymentPlan");
            expect(source).not.toContain("switchIisToValidatedSlot");
        }
    });

    it("keeps the Cloudflare artifact path independent from the broker", () => {
        const source = read("./build.mjs");
        const cloudflareStart = source.indexOf("const buildCloudflareArtifact");
        const cloudflareEnd = source.indexOf("try {");
        const cloudflareSource = source.slice(cloudflareStart, cloudflareEnd);

        expect(cloudflareStart).toBeGreaterThanOrEqual(0);
        expect(cloudflareSource).not.toContain("defaultIisSlotBrokerClient");
        expect(cloudflareSource).not.toContain("iis-deployment-slots");
    });

    it("does not retain the old environment-overridable AppCmd path", () => {
        expect(read("./build.mjs")).not.toContain("STEAM_ENGINE_APPCMD");
        expect(read("./build-sharded.mjs")).not.toContain("STEAM_ENGINE_APPCMD");
    });

    it("routes production requests through the installed authenticated native client", () => {
        const source = read("./iis-slot-broker-client.mjs");

        expect(source).toContain("SteamEngineIisSlotBrokerClient.exe");
        expect(source).toContain("execFileAsync(BROKER_NATIVE_CLIENT_PATH");
        expect(source).not.toContain("node:net");
        expect(read("./iis-slot-broker-client/Program.cs")).toContain("GetNamedPipeServerProcessId");
        expect(read("./iis-slot-broker-client/Program.cs")).toContain("QueryServiceStatusEx");
        expect(read("./iis-slot-broker-client/Program.cs")).toContain("TokenImpersonationLevel.Impersonation");
    });

    it("installs into newly created verified administrator-owned directories", () => {
        const source = read("./iis-slot-broker/install-broker.ps1");

        expect(source).toContain("Refusing to use pre-existing broker directory");
        expect(source).toContain("SetAccessRuleProtection($true, $false)");
        expect(source).toContain("GetOwner([Security.Principal.SecurityIdentifier])");
        expect(source).toContain("FileAttributes]::ReparsePoint");
        expect(source).toContain("does not match the reviewed publish artifact");
        expect(source).not.toContain("icacls");
    });
});
