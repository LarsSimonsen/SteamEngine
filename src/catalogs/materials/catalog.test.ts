import { describe, expect, it } from "vitest";
import { materials as coilMaterials } from "../../pages/coil/domain";
import { materials as wireMaterials } from "../../pages/wirewiz/domain";
import { excludedDefaultMaterialIds, materials, materialFor, type CustomMaterial } from "./catalog";

const expectedIds = [
    "ka1",
    "ka",
    "kd",
    "n20",
    "n40",
    "n60",
    "n70",
    "n80",
    "ss304",
    "ss316",
    "ss316l",
    "ss317l",
    "ss430",
    "ti1",
    "ti2",
    "tie",
    "w",
    "nio",
    "ni200",
    "nife30",
    "dicodes",
    "reactor",
    "nife30stealth",
    "nft70",
    "nft52",
    "zr",
    "n90",
    "ss904l",
] as const;

describe("canonical material catalog", () => {
    it("contains every published default material in catalog order", () => {
        expect(materials.map((material) => material.id)).toEqual(expectedIds);
        expect([...excludedDefaultMaterialIds]).toEqual(["ss321", "au", "ag", "cu", "invar36", "nidh"]);
    });

    it("preserves physical properties and temperature models", () => {
        expect(materialFor("ka1")).toMatchObject({
            name: "Kanthal A1 / APM",
            resistivity: 1.45,
            density: 7.1,
            heatCapacity: 0.46,
            tfr: expect.any(Array),
        });
        expect(materialFor("n20")).not.toHaveProperty("tcr");
        expect(materialFor("n20")).not.toHaveProperty("tfr");
        expect(materialFor("ni200")).toMatchObject({
            name: "Nickel 200 / Ni200 (UNS N02200)",
            tfr: expect.any(Array),
        });
        expect(materialFor("ni200")).not.toHaveProperty("tcr");
        expect(materialFor("ni200lin")).toBe(materialFor("ni200"));
        expect(materialFor("n90")).toMatchObject({
            resistivity: 0.706,
            heatCapacity: 0.448,
            density: 8.72,
            tcr: 0.0003,
        });
        expect(materialFor("ss904l")).toMatchObject({
            resistivity: 1,
            heatCapacity: 0.45,
            density: 8,
            tfr: [[20, 1], [300, 1.25], [500, 1.5]],
        });
    });

    it("exposes only descriptive canonical properties", () => {
        const allowedProperties = new Set([
            "id",
            "slug",
            "name",
            "resistivity",
            "heatCapacity",
            "density",
            "meltingPoint",
            "tcr",
            "tfr",
            "initiallyVisible",
        ]);
        for (const material of materials) {
            expect(Object.keys(material).every((property) => allowedProperties.has(property))).toBe(true);
            expect(material.meltingPoint).toBeNull();
        }
    });

    it("publishes the curated initial visibility without changing catalog order", () => {
        expect(materials.filter((material) => material.initiallyVisible === true).map((material) => material.id))
            .toEqual(["ka1", "n80", "ss316", "ss316l", "ss317l", "ss430", "ni200", "nife30stealth", "zr", "n90"]);
        expect(materialFor("ag")).toBeUndefined();
    });

    it("defines the custom material property contract", () => {
        const customMaterial: CustomMaterial = {
            id: "99559e05-a77b-4f46-a60c-43c640ef6900",
            name: "Example material",
            resistivity: 0.42,
            heatCapacity: null,
            density: null,
            tcr: 0.0042,
            clonedFrom: "ss316l",
        };

        expect(customMaterial).toMatchObject({
            name: "Example material",
            tcr: 0.0042,
            clonedFrom: "ss316l",
        });
    });

    it("allows custom materials without temperature data", () => {
        const customMaterial: CustomMaterial = {
            id: "ed9667f7-95f1-4122-ae4a-44ca41dd8554",
            name: "Resistance-only material",
            resistivity: 0.8,
            heatCapacity: null,
            density: null,
        };

        expect(customMaterial).not.toHaveProperty("tcr");
        expect(customMaterial).not.toHaveProperty("tfr");
    });

    it("is the same catalog consumed by Coil calculator and Wire Wizard", () => {
        expect(coilMaterials).toBe(materials);
        expect(wireMaterials).toBe(materials);
    });
});
