import { describe, expect, it } from "vitest";
import {
    createClaptonWire,
    createParallelWire,
    createSingleWire,
    createStaggeredClaptonWire,
    defaultSettings,
    dna200FileName,
    nextWireChildId,
    wireChildren,
    wrapWireInParallel,
} from "./domain";

describe("wire wizard state domain", () => {
    it("provides the expected default settings", () => {
        const settings = defaultSettings();
        expect(settings.root).toMatchObject({ id: "wire-1", kind: "single", materialId: "ka1" });
        expect(settings.temperatures).toEqual([-40, 20, 50, 100, 150, 200, 250, 300]);
    });

    it("uses the legacy filename for a single material", () => {
        const calculated = {
            kind: "single" as const,
            label: "Kanthal A1 / APM",
        } as never;
        expect(dna200FileName(calculated)).toBe("DNA200-Kanthal_A1 _APM-SteamEngine.csv");
    });

    it("wraps a single wire as the first member of a new parallel node", () => {
        const parallel = wrapWireInParallel(createSingleWire("root", "ss316l", "ribbon", 0.3, 0.8, 0.12));
        expect(parallel).toMatchObject({ id: "root", kind: "parallel" });
        expect(parallel.members).toHaveLength(2);
        expect(parallel.members[0]).toMatchObject({ id: "root-1", materialId: "ss316l", profile: "ribbon" });
        expect(parallel.members[1]).toMatchObject({ id: "root-2", kind: "single", materialId: "ka1" });
    });

    it("preserves composite child roles and allocates unique IDs", () => {
        const staggered = createStaggeredClaptonWire(
            "root", createSingleWire("root-1", "ss316l"), createSingleWire("root-2", "ka1"), createSingleWire("root-3", "n80"),
        );
        expect(wireChildren(staggered).map((child) => child.id)).toEqual(["root-1", "root-2", "root-3"]);
        const nested = createParallelWire("root-3", [createSingleWire("root-2"), createSingleWire("root-3-1")]);
        expect(nextWireChildId("root", [createSingleWire("root-1"), nested])).toBe("root-4");
    });

    it("clones a Clapton design without losing its child structure", () => {
        const parallel = wrapWireInParallel(createClaptonWire(
            "root", createSingleWire("root-1", "ss316l"), createSingleWire("root-2", "ka1"),
        ));
        const clone = parallel.members[0];
        expect(clone).toMatchObject({ id: "root-1", kind: "clapton" });
        if (clone.kind !== "clapton") return;
        expect(clone.core).toMatchObject({ id: "root-1-1", materialId: "ss316l" });
        expect(clone.wrap).toMatchObject({ id: "root-1-2", materialId: "ka1" });
    });
});
