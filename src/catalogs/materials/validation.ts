import {
    canonicalMaterialId,
    isLegacyDefaultMaterialId,
    type CustomMaterial,
    type DefaultMaterial,
} from "./catalog";
import { normalizeTfr, type TfrNormalizationMethod } from "./temperature";

export type CustomMaterialValidation =
    | {
            readonly kind: "valid";
            readonly material: CustomMaterial;
            readonly normalizationMethod?: TfrNormalizationMethod;
        }
    | { readonly kind: "invalid"; readonly message: string };

const positiveNumber = (value: unknown): value is number =>
    typeof value === "number" && Number.isFinite(value) && value > 0;

const nullablePositive = (value: unknown): value is number | null => value === null || positiveNumber(value);

export const validateCustomMaterial = (
    value: unknown,
    defaultMaterials: readonly DefaultMaterial[],
): CustomMaterialValidation => {
    if (!value || typeof value !== "object") {
        return { kind: "invalid", message: "The custom material must be an object." };
    }
    const candidate = value as Record<string, unknown>;
    if (typeof candidate.id !== "string" || candidate.id.trim() === "") {
        return { kind: "invalid", message: "The custom material needs an ID." };
    }
    if (defaultMaterials.some((material) => material.id === candidate.id)
            || isLegacyDefaultMaterialId(candidate.id)) {
        return { kind: "invalid", message: "A custom material ID cannot replace a built-in material." };
    }
    if (typeof candidate.name !== "string" || candidate.name.trim() === "") {
        return { kind: "invalid", message: "Enter a material name." };
    }
    if (!positiveNumber(candidate.resistivity)) {
        return { kind: "invalid", message: "Resistivity must be greater than zero." };
    }
    if (!nullablePositive(candidate.heatCapacity)) {
        return { kind: "invalid", message: "Heat capacity must be blank or greater than zero." };
    }
    if (!nullablePositive(candidate.density)) {
        return { kind: "invalid", message: "Density must be blank or greater than zero." };
    }
    if (candidate.tcr !== undefined && candidate.tfr !== undefined) {
        return { kind: "invalid", message: "Choose either TCR or TFR, not both." };
    }
    if (candidate.tcr !== undefined && !positiveNumber(candidate.tcr)) {
        return { kind: "invalid", message: "TCR must be greater than zero." };
    }
    const clonedFrom = typeof candidate.clonedFrom === "string"
        ? canonicalMaterialId(candidate.clonedFrom)
        : candidate.clonedFrom;
    if (clonedFrom !== undefined && (
        typeof clonedFrom !== "string"
        || !defaultMaterials.some((material) => material.id === clonedFrom)
    )) {
        return { kind: "invalid", message: "The cloned-from material is unavailable." };
    }

    const common = {
        id: candidate.id.trim(),
        name: candidate.name.trim(),
        resistivity: candidate.resistivity,
        heatCapacity: candidate.heatCapacity,
        density: candidate.density,
        ...(clonedFrom === undefined ? {} : { clonedFrom }),
    } as const;
    if (candidate.tfr !== undefined) {
        const normalization = normalizeTfr(candidate.tfr);
        if (normalization.kind === "invalid") return normalization;
        return {
            kind: "valid",
            material: { ...common, tfr: normalization.points },
            normalizationMethod: normalization.method,
        };
    }
    if (candidate.tcr !== undefined) {
        return { kind: "valid", material: { ...common, tcr: candidate.tcr as number } };
    }
    return { kind: "valid", material: common };
};
