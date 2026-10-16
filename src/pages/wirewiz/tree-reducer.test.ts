import { describe, expect, it } from "vitest";
import {
    createClaptonWire,
    createSingleWire,
    createTwistedWire,
    wireTreeLimits,
    type WireNode,
} from "./domain";
import { wireTreeReducer, type WireTreeAction } from "./tree-reducer";

const reduce = (root: WireNode, ...actions: WireTreeAction[]): WireNode =>
    actions.reduce(wireTreeReducer, root);

describe("Wire Wizard tree reducer", () => {
    it("adds parallel wires beyond seven while retaining the overall node limit", () => {
        let root: WireNode = reduce(createSingleWire("root"), {
            type: "wrap-wire-in-parallel", nodeId: "root",
        });
        for (let count = 2; count < wireTreeLimits.maximumNodes - 1; count += 1) {
            root = reduce(root, { type: "add-parallel-member", nodeId: "root" });
        }
        expect(root.kind).toBe("parallel");
        if (root.kind !== "parallel") throw new Error("Expected a parallel wire.");
        expect(root.members).toHaveLength(wireTreeLimits.maximumNodes - 1);
        expect(new Set(root.members.map((member) => member.id)).size).toBe(root.members.length);
        expect(reduce(root, { type: "add-parallel-member", nodeId: "root" })).toBe(root);
    });

    it("updates a nested field while preserving untouched branches", () => {
        const untouched = createSingleWire("root-2", "ss316l");
        const root = createClaptonWire(
            "root",
            createSingleWire("root-1"),
            untouched,
        );

        const updated = reduce(root, {
            type: "set-material",
            nodeId: "root-1",
            materialId: "ni200",
        });

        expect(updated).not.toBe(root);
        expect(updated.kind).toBe("clapton");
        if (updated.kind !== "clapton") throw new Error("Expected a Clapton wire.");
        expect(updated.core).toMatchObject({ materialId: "ni200" });
        expect(updated.wrap).toBe(untouched);
    });

    it("dispatches explicit single and composite setting actions", () => {
        const single = reduce(
            createSingleWire("root"),
            { type: "set-profile", nodeId: "root", profile: "ribbon" },
            { type: "set-width", nodeId: "root", width: 0.8 },
            { type: "set-thickness", nodeId: "root", thickness: 0.12 },
        );
        expect(single).toMatchObject({ profile: "ribbon", width: 0.8, thickness: 0.12 });

        const twisted = reduce(
            createTwistedWire("root", createSingleWire("root-1")),
            { type: "set-strands", nodeId: "root", strands: 3 },
            { type: "set-twist-pitch", nodeId: "root", twistPitch: 0.8 },
        );
        expect(twisted).toMatchObject({ strands: 3, twistPitch: 0.8 });

        const clapton = reduce(
            createClaptonWire(
                "root",
                createSingleWire("root-1"),
                createSingleWire("root-2"),
            ),
            { type: "set-wrap-spacing", nodeId: "root", wrapSpacing: 0.12 },
        );
        expect(clapton).toMatchObject({ wrapSpacing: 0.12 });
    });

    it("wraps, adds, removes, and collapses parallel wire through actions", () => {
        const wrapped = reduce(createSingleWire("root", "ss316l"), {
            type: "wrap-wire-in-parallel",
            nodeId: "root",
        });
        expect(wrapped.kind).toBe("parallel");
        if (wrapped.kind !== "parallel") throw new Error("Expected a parallel wire.");

        const added = reduce(wrapped, { type: "add-parallel-member", nodeId: "root" });
        expect(added.kind).toBe("parallel");
        if (added.kind !== "parallel") throw new Error("Expected a parallel wire.");
        expect(added.members.map((member) => member.id)).toEqual(["root-1", "root-2", "root-3"]);

        const reduced = reduce(added, {
            type: "remove-parallel-member",
            nodeId: "root",
            memberId: "root-2",
        });
        const collapsed = reduce(reduced, {
            type: "remove-parallel-member",
            nodeId: "root",
            memberId: "root-3",
        });
        expect(collapsed).toMatchObject({ id: "root", kind: "single", materialId: "ss316l" });
    });

    it("wraps a complete compound wire as one parallel member", () => {
        const clapton = createClaptonWire(
            "root",
            createSingleWire("root-1", "ss316l"),
            createSingleWire("root-2", "ka1"),
        );

        const wrapped = reduce(clapton, {
            type: "wrap-wire-in-parallel",
            nodeId: "root",
        });

        expect(wrapped.kind).toBe("parallel");
        if (wrapped.kind !== "parallel") throw new Error("Expected a parallel wire.");
        expect(wrapped.members[0]).toMatchObject({ kind: "clapton", id: "root-1" });
        expect(wrapped.members[1]).toMatchObject({ kind: "single", id: "root-2" });
    });

    it("enforces nesting and depth rules independently of the UI", () => {
        const twisted = createTwistedWire("root", createSingleWire("root-1"));
        expect(reduce(twisted, {
            type: "change-kind",
            nodeId: "root-1",
            kind: "parallel",
        })).toBe(twisted);
        expect(reduce(twisted, {
            type: "wrap-wire-in-parallel",
            nodeId: "root-1",
        })).toBe(twisted);

        let deep: WireNode = createSingleWire(`root-${wireTreeLimits.maximumDepth}`);
        for (let depth = wireTreeLimits.maximumDepth - 1; depth >= 0; depth -= 1) {
            deep = createTwistedWire(`root-${depth}`, deep);
        }
        expect(reduce(deep, {
            type: "change-kind",
            nodeId: `root-${wireTreeLimits.maximumDepth}`,
            kind: "clapton",
        })).toBe(deep);
        expect(reduce(deep, {
            type: "wrap-wire-in-parallel",
            nodeId: "root-0",
        })).toBe(deep);
    });
});
