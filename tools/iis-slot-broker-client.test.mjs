import { describe, expect, it } from "vitest";
import {
    createIisSlotBrokerClient,
    IisSlotBrokerHostIdentityError,
    IisSlotBrokerOperationError,
    IisSlotBrokerUnavailableError,
} from "./iis-slot-broker-client.mjs";

describe("IIS slot broker client", () => {
    it("sends the exact inspect schema and returns a lease", async () => {
        const requests = [];
        const client = createIisSlotBrokerClient({
            exchange: async (request) => {
                requests.push(request);
                return JSON.stringify({
                    protocolVersion: 1,
                    ok: true,
                    operation: "inspect",
                    correlationId: "c1",
                    activeState: "blue",
                    inactiveTarget: "green",
                    leaseId: "lease-1",
                    leaseExpiresAt: "2026-08-09T12:00:00Z",
                });
            },
        });

        const response = await client.inspect();

        expect(response.leaseId).toBe("lease-1");
        expect(requests).toEqual([{ protocolVersion: 1, operation: "inspect" }]);
    });

    it("sends switch with only the broker-generated lease ID", async () => {
        const requests = [];
        const client = createIisSlotBrokerClient({
            exchange: async (request) => {
                requests.push(request);
                return JSON.stringify({
                    protocolVersion: 1,
                    ok: true,
                    operation: "switch",
                    correlationId: "c2",
                    activeState: "green",
                    previousState: "blue",
                    intendedTarget: "green",
                    verified: true,
                });
            },
        });

        await client.switch("lease-1");

        expect(requests).toEqual([{ protocolVersion: 1, operation: "switch", leaseId: "lease-1" }]);
    });

    it("fails concisely when the broker is absent", async () => {
        const client = createIisSlotBrokerClient({
            exchange: async () => { throw new Error("ENOENT"); },
        });

        await expect(client.inspect()).rejects.toBeInstanceOf(IisSlotBrokerUnavailableError);
        await expect(client.inspect()).rejects.toThrow(/Install and start it/);
    });

    it("distinguishes a running broker hidden from the sandbox identity", async () => {
        const hiddenClient = Object.assign(new Error("hidden client"), { code: "ENOENT" });
        const client = createIisSlotBrokerClient({
            exchange: async () => { throw hiddenClient; },
            serviceProbe: async () => true,
        });

        await expect(client.inspect()).rejects.toBeInstanceOf(IisSlotBrokerHostIdentityError);
        await expect(client.inspect()).rejects.toThrow(/host\/unsandboxed execution approval/);
    });

    it("does not allow a caller to add target, path, executable, or arguments", async () => {
        const client = createIisSlotBrokerClient({
            exchange: async () => JSON.stringify({
                protocolVersion: 1,
                ok: false,
                operation: "switch",
                correlationId: "c3",
                error: { code: "unknown-field", message: "unknown" },
            }),
        });

        await expect(client.switch("lease-1")).rejects.toEqual(
            expect.objectContaining({ code: "unknown-field" }),
        );
        expect(() => client.switch("../../target")).toThrow(/opaque broker-generated/);
    });
});
