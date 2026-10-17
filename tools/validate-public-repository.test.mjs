import { describe, expect, it } from "vitest";
import { catalogViolations, deniedContentViolations, shapeViolations } from "./validate-public-repository.mjs";

describe("public repository validation", () => {
    it("accepts the generated catalog data and entity records", async () => {
        expect(await catalogViolations()).toEqual([]);
    });

    it("finds no private identifiers in repository files, trail learnings included", () => {
        expect(deniedContentViolations()).toEqual([]);
    });

    it("rejects fields that the public site does not display", () => {
        expect(shapeViolations(
            { id: "battery-1", introduction: { latest: { date: "2015" } }, popularity: { score: 40 } },
            { id: true, introduction: { latest: { date: true } } },
            "battery",
        )).toEqual(["battery.popularity is not a published catalog field"]);
        expect(shapeViolations({ tags: [{ hidden: 1 }] }, { tags: [true] }, "item"))
            .toEqual(["item.tags[0] must be a plain value"]);
    });
});
