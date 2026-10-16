import { describe, expect, it } from "vitest";
import {
    createParallelWire,
    createSingleWire,
    createTwistedWire,
    defaultSettings,
    wireTreeLimits,
    type WireNode,
} from "./domain";
import {
    exportWizardDesign,
    importWizardDesign,
    loadWizardSettings,
    saveWizardSettings,
    wireWizardStorageKey,
    type StorageLike,
} from "./persistence";

const memoryStorage = (): StorageLike & { readonly values: Record<string, string> } => {
    const values: Record<string, string> = {};
    return {
        values,
        getItem: (key) => values[key] ?? null,
        setItem: (key, value) => { values[key] = value; },
    };
};

const nestedTwistedWire = (remainingDepth: number, id = "root"): WireNode =>
    remainingDepth === 0
        ? createSingleWire(id)
        : createTwistedWire(
                id,
                nestedTwistedWire(remainingDepth - 1, `${id}-1`),
            );

describe("Wire Wizard persistence", () => {
    it("saves, reloads, and exports large parallel groups within the overall node limit", () => {
        const members = Array.from({ length: wireTreeLimits.maximumNodes - 1 }, (_, index) =>
            createSingleWire(`root-${index + 1}`));
        const settings = {
            ...defaultSettings(),
            root: createParallelWire("root", [members[0], members[1], ...members.slice(2)]),
        };
        const storage = memoryStorage();
        expect(saveWizardSettings(settings, storage)).toBe(true);
        expect(loadWizardSettings(storage).settings.root).toEqual(settings.root);
        expect(importWizardDesign(exportWizardDesign(settings))).toMatchObject({
            kind: "valid", settings: { root: settings.root },
        });
        const oversized = {
            ...settings,
            root: createParallelWire("root", [...settings.root.members, createSingleWire("overflow")]),
        };
        expect(importWizardDesign(exportWizardDesign(oversized))).toMatchObject({ kind: "invalid" });
    });

    it("round-trips recursive wire and coil settings", () => {
        const settings = {
            ...defaultSettings(),
            innerDiameter: 3.5,
            root: createParallelWire("root", [
                createSingleWire("root-1", "ss316l", "round", 0.32),
                createTwistedWire("root-2", createSingleWire("root-2-1"), 3, 0.8),
            ]),
        };
        const imported = importWizardDesign(exportWizardDesign(settings));
        expect(imported.kind).toBe("valid");
        if (imported.kind !== "valid") return;
        expect(imported.settings.innerDiameter).toBe(3.5);
        expect(imported.settings.root.kind).toBe("parallel");
        if (imported.settings.root.kind !== "parallel") throw new Error("Expected a parallel wire.");
        expect(imported.settings.root.members[0]).toMatchObject({ kind: "single" });
    });

    it("preserves the version-one composite JSON shape", () => {
        const exported = JSON.parse(exportWizardDesign({
            ...defaultSettings(),
            root: createTwistedWire("root", createSingleWire("root-1"), 3, 0.8),
        }));

        expect(exported.settings.root).toMatchObject({
            kind: "twisted",
            id: "root",
            strands: 3,
            twistPitch: 0.8,
            wrapSpacing: 0.05,
            members: [{ kind: "single", id: "root-1" }],
        });
    });

    it("rejects malformed, unsupported, duplicate-id, and over-deep designs", () => {
        expect(importWizardDesign("{broken")).toMatchObject({ kind: "invalid" });
        expect(importWizardDesign(JSON.stringify({ version: 2, settings: {} }))).toMatchObject({ kind: "invalid" });
        const duplicate = JSON.parse(exportWizardDesign(defaultSettings()));
        duplicate.settings.root = {
            kind: "parallel",
            id: "same",
            strands: 2,
            twistPitch: 0.5,
            wrapSpacing: 0.05,
            members: [
                { ...duplicate.settings.root, id: "same" },
            ],
        };
        expect(importWizardDesign(JSON.stringify(duplicate))).toMatchObject({ kind: "invalid" });

        const atDepthLimit = exportWizardDesign({
            ...defaultSettings(),
            root: nestedTwistedWire(wireTreeLimits.maximumDepth),
        });
        expect(importWizardDesign(atDepthLimit)).toMatchObject({ kind: "valid" });
        const overDepthLimit = exportWizardDesign({
            ...defaultSettings(),
            root: nestedTwistedWire(wireTreeLimits.maximumDepth + 1),
        });
        expect(importWizardDesign(overDepthLimit)).toMatchObject({ kind: "invalid" });
    });

    it("rejects temperature lists outside the editor contract", () => {
        const envelope = JSON.parse(exportWizardDesign(defaultSettings()));
        for (const temperatures of [
            [20],
            [20, 20],
            [100, 20],
            [-274, 20],
            Array.from({ length: 21 }, (_, index) => index),
        ]) {
            envelope.settings.temperatures = temperatures;
            expect(importWizardDesign(JSON.stringify(envelope))).toMatchObject({ kind: "invalid" });
        }
    });

    it("uses the recovered two-to-four whole-strand range during import", () => {
        const envelope = JSON.parse(exportWizardDesign({
            ...defaultSettings(),
            root: createTwistedWire("root", createSingleWire("root-1")),
        }));

        for (const strands of [1, 2.5, 5]) {
            envelope.settings.root.strands = strands;
            expect(importWizardDesign(JSON.stringify(envelope))).toMatchObject({ kind: "invalid" });
        }
        for (const strands of [2, 3, 4]) {
            envelope.settings.root.strands = strands;
            expect(importWizardDesign(JSON.stringify(envelope))).toMatchObject({ kind: "valid" });
        }
    });

    it("saves and reloads only the versioned validated envelope", () => {
        const storage = memoryStorage();
        expect(saveWizardSettings({ ...defaultSettings(), wraps: 10 }, storage)).toBe(true);
        expect(JSON.parse(storage.values[wireWizardStorageKey]).version).toBe(1);
        expect(loadWizardSettings(storage).settings.wraps).toBe(10);
        storage.values[wireWizardStorageKey] = "{broken";
        expect(loadWizardSettings(storage)).toMatchObject({
            settings: { innerDiameter: 2 },
            error: "The design file is not valid JSON.",
        });
    });

    it("collapses imported one-child parallel nodes", () => {
        const envelope = JSON.parse(exportWizardDesign(defaultSettings()));
        envelope.settings.root = {
            kind: "parallel",
            id: "root",
            strands: 2,
            twistPitch: 0.5,
            wrapSpacing: 0.05,
            members: [{
                ...envelope.settings.root,
                id: "child",
                materialId: "ss316l",
            }],
        };

        const imported = importWizardDesign(JSON.stringify(envelope));
        expect(imported.kind).toBe("valid");
        if (imported.kind !== "valid") return;
        expect(imported.settings.root).toMatchObject({
            id: "root",
            kind: "single",
            materialId: "ss316l",
        });
    });

    it("migrates retired material IDs throughout imported recursive designs", () => {
        const envelope = JSON.parse(exportWizardDesign({
            ...defaultSettings(),
            root: createParallelWire("root", [
                createSingleWire("root-1", "ni200lin"),
                createTwistedWire("root-2", createSingleWire("root-2-1", "ni200lin")),
            ]),
        }));

        const imported = importWizardDesign(JSON.stringify(envelope));
        expect(imported.kind).toBe("valid");
        if (imported.kind !== "valid" || imported.settings.root.kind !== "parallel") return;
        expect(imported.settings.root.members[0]).toMatchObject({ materialId: "ni200" });
        expect(imported.settings.root.members[1]).toMatchObject({
            kind: "twisted",
            wire: { materialId: "ni200" },
        });
    });

    it("migrates older two-child twisted designs only at the import boundary", () => {
        const envelope = JSON.parse(exportWizardDesign(defaultSettings()));
        envelope.settings.root = {
            kind: "twisted",
            id: "root",
            strands: 2,
            twistPitch: 0.5,
            wrapSpacing: 0.05,
            members: [
                { ...envelope.settings.root, id: "root-1", materialId: "ss316l" },
                { ...envelope.settings.root, id: "root-2", materialId: "ka1" },
            ],
        };

        const imported = importWizardDesign(JSON.stringify(envelope));
        expect(imported.kind).toBe("valid");
        if (imported.kind !== "valid") return;
        expect(imported.settings.root.kind).toBe("twisted");
        if (imported.settings.root.kind !== "twisted") throw new Error("Expected a twisted wire.");
        expect(imported.settings.root.wire).toMatchObject({
            materialId: "ss316l",
        });
    });

    it("rejects incomplete fixed-shape Clapton designs", () => {
        const envelope = JSON.parse(exportWizardDesign(defaultSettings()));
        const single = envelope.settings.root;
        envelope.settings.root = {
            kind: "clapton",
            id: "root",
            strands: 2,
            twistPitch: 0.5,
            wrapSpacing: 0.05,
            members: [{ ...single, id: "root-1" }],
        };
        expect(importWizardDesign(JSON.stringify(envelope))).toMatchObject({
            kind: "invalid",
            message: "The design contains invalid or unsafe values.",
        });

        envelope.settings.root.kind = "staggered-clapton";
        envelope.settings.root.members.push({ ...single, id: "root-2" });
        expect(importWizardDesign(JSON.stringify(envelope))).toMatchObject({
            kind: "invalid",
            message: "The design contains invalid or unsafe values.",
        });
    });
});
