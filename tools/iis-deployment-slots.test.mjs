import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
    determineIisDeploymentPlan,
    determineIisDeploymentPlanFromBroker,
    localIisSlotDirectories,
    parseAppCmdVirtualDirectories,
    prepareInactiveIisSlot,
} from "./iis-deployment-slots.mjs";

const projectRoot = "C:\\htdocs\\steamengine";
const root = (name, physicalPath) => ({ name: `${name}/`, path: "/", physicalPath });

afterEach(() => vi.restoreAllMocks());

describe("IIS deployment slots", () => {
    it("parses AppCmd virtual-directory XML", () => {
        const roots = parseAppCmdVirtualDirectories(
            '<appcmd><VDIR path="/" physicalPath="C:\\sites\\a&amp;b" '
            + 'APP.NAME="Steam Engine/" VDIR.NAME="Steam Engine/" /></appcmd>',
        );

        expect(roots).toEqual([{
            name: "Steam Engine/",
            path: "/",
            physicalPath: "C:\\sites\\a&b",
        }]);
    });

    it("bootstraps from the legacy public directory into blue", () => {
        const plan = determineIisDeploymentPlan({
            roots: [root("Steam Engine", path.join(projectRoot, "public"))],
            projectRoot,
        });

        expect(plan.activeSlot).toBe("legacy-public");
        expect(plan.inactiveSlot).toBe("blue");
        expect(plan.inactiveDirectory).toBe(localIisSlotDirectories(projectRoot).blue);
    });

    it("alternates from blue to green", () => {
        const slots = localIisSlotDirectories(projectRoot);
        const plan = determineIisDeploymentPlan({
            roots: [root("Steam Engine", slots.blue)],
            projectRoot,
        });

        expect(plan.activeSlot).toBe("blue");
        expect(plan.inactiveSlot).toBe("green");
        expect(plan.inactiveDirectory).toBe(slots.green);
    });

    it("derives a blue-to-green plan from broker state without reading IIS directly", () => {
        const slots = localIisSlotDirectories(projectRoot);
        const plan = determineIisDeploymentPlanFromBroker({
            activeState: "blue",
            inactiveTarget: "green",
            projectRoot,
        });

        expect(plan.activeDirectory).toBe(slots.blue);
        expect(plan.inactiveDirectory).toBe(slots.green);
        expect(plan.inactiveSlot).toBe("green");
    });

    it("derives the initial legacy-public-to-blue plan from broker state", () => {
        const plan = determineIisDeploymentPlanFromBroker({
            activeState: "legacy-public",
            inactiveTarget: "blue",
            projectRoot,
        });

        expect(plan.activeDirectory).toBe(path.join(projectRoot, "public"));
        expect(plan.inactiveDirectory).toBe(localIisSlotDirectories(projectRoot).blue);
    });

    it("rejects an invalid broker slot combination", () => {
        expect(() => determineIisDeploymentPlanFromBroker({
            activeState: "green",
            inactiveTarget: "green",
            projectRoot,
        })).toThrow(/invalid active\/inactive slot combination/);
    });

    it("fails when an explicitly named IIS site points somewhere unexpected", () => {
        expect(() => determineIisDeploymentPlan({
            roots: [root("Steam Engine", "D:\\unrelated")],
            projectRoot,
            siteName: "Steam Engine",
        })).toThrow(/unexpected directory/);
    });

    it("fails rather than choosing between multiple matching sites", () => {
        const slots = localIisSlotDirectories(projectRoot);
        expect(() => determineIisDeploymentPlan({
            roots: [
                root("First", slots.blue),
                root("Second", slots.green),
            ],
            projectRoot,
        })).toThrow(/exactly one Steam Engine IIS site/);
    });

    it("refuses to clean a path outside the two configured slots", () => {
        expect(() => prepareInactiveIisSlot({
            projectRoot,
            activeDirectory: path.join(projectRoot, "public"),
            inactiveDirectory: "D:\\unrelated",
        })).toThrow(/unexpected IIS slot path/);
    });

    it("cleans a verified inactive slot in place when Windows locks its root directory", () => {
        const temporaryRoot = fs.mkdtempSync(path.join(os.tmpdir(), "steamengine-iis-slot-"));
        const slots = localIisSlotDirectories(temporaryRoot);
        fs.mkdirSync(path.join(slots.green, "assets"), { recursive: true });
        fs.writeFileSync(path.join(slots.green, "assets", "old.js"), "old");
        const originalRmSync = fs.rmSync.bind(fs);
        const remove = vi.spyOn(fs, "rmSync").mockImplementation((target, options) => {
            if (path.resolve(String(target)) === path.resolve(slots.green)) {
                throw Object.assign(new Error("locked"), { code: "EBUSY" });
            }
            originalRmSync(target, options);
        });

        try {
            prepareInactiveIisSlot({
                projectRoot: temporaryRoot,
                activeDirectory: slots.blue,
                inactiveDirectory: slots.green,
            });

            expect(fs.readdirSync(slots.green)).toEqual([]);
            expect(remove).toHaveBeenCalled();
        } finally {
            remove.mockRestore();
            originalRmSync(temporaryRoot, { recursive: true, force: true });
        }
    });
});
