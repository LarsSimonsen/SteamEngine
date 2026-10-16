import {
    cloneNode,
    createClaptonWire,
    createParallelWire,
    createSingleWire,
    createStaggeredClaptonWire,
    createTwistedWire,
    type CompositeWireKind,
    isValidCompositeMemberCount,
    defaultSettings,
    wireChildren,
    wireTreeLimits,
    type TemperatureScale,
    type WireNode,
    type WireProfile,
    type WizardSettings,
} from "./domain";
import { validateTemperaturePoints } from "./temperature-points";
import { canonicalMaterialId } from "../../catalogs/materials/catalog";

export const wireWizardStorageKey = "steamengine.wireWizard.design.v1";

export type StorageLike = {
    readonly getItem: (key: string) => string | null;
    readonly setItem: (key: string, value: string) => void;
};

type SingleWireData = {
    readonly kind: "single";
    readonly id: string;
    readonly materialId: string;
    readonly profile: WireProfile;
    readonly diameter: number;
    readonly width: number;
    readonly thickness: number;
};

type CompositeWireData = {
    readonly kind: CompositeWireKind;
    readonly id: string;
    readonly members: readonly WireNodeData[];
    readonly strands: number;
    readonly twistPitch: number;
    readonly wrapSpacing: number;
};

export type WireNodeData = SingleWireData | CompositeWireData;

export type WizardSettingsData = {
    readonly innerDiameter: number;
    readonly wraps: number;
    readonly legLength: number;
    readonly wrapSpacing: number;
    readonly temperatures: readonly number[];
    readonly scale: TemperatureScale;
    readonly showAllComponents: boolean;
    readonly root: WireNodeData;
};

export type WireWizardEnvelope = {
    readonly version: 1;
    readonly settings: WizardSettingsData;
};

export type LoadResult = {
    readonly settings: WizardSettings;
    readonly error?: string;
};

export type ImportResult =
    | { readonly kind: "valid"; readonly settings: WizardSettings }
    | { readonly kind: "invalid"; readonly message: string };

const isRecord = (value: unknown): value is Record<string, unknown> =>
    typeof value === "object" && value !== null && !Array.isArray(value);

const finiteNumber = (value: unknown, minimum: number, maximum = Number.POSITIVE_INFINITY): number | undefined =>
    typeof value === "number" && Number.isFinite(value) && value >= minimum && value <= maximum
        ? value
        : undefined;

const isCompositeWireKind = (value: unknown): value is CompositeWireKind =>
    value === "parallel"
    || value === "twisted"
    || value === "clapton"
    || value === "staggered-clapton";

const serializeNode = (node: WireNode): WireNodeData => {
    if (node.kind === "single") {
        const wire = node;
        return {
            kind: "single",
            id: wire.id,
            materialId: canonicalMaterialId(wire.materialId),
            profile: wire.profile,
            diameter: wire.diameter,
            width: wire.width,
            thickness: wire.thickness,
        };
    }
    const wire = node;
    return {
        kind: wire.kind,
        id: wire.id,
        members: wireChildren(wire).map(serializeNode),
        strands: wire.kind === "twisted" ? wire.strands : 2,
        twistPitch: wire.kind === "twisted" ? wire.twistPitch : 0.5,
        wrapSpacing: wire.kind === "clapton" || wire.kind === "staggered-clapton"
            ? wire.wrapSpacing
            : 0.05,
    };
};

export const serializeWizardSettings = (settings: WizardSettings): WizardSettingsData => ({
    innerDiameter: settings.innerDiameter,
    wraps: settings.wraps,
    legLength: settings.legLength,
    wrapSpacing: settings.wrapSpacing,
    temperatures: [...settings.temperatures],
    scale: settings.scale,
    showAllComponents: settings.showAllComponents,
    root: serializeNode(settings.root),
});

const parseNodeData = (
    value: unknown,
    ids: Set<string>,
    depth: number,
    nodeCount: { value: number },
): WireNodeData | undefined => {
    if (!isRecord(value) || depth > wireTreeLimits.maximumDepth
            || nodeCount.value >= wireTreeLimits.maximumNodes) return undefined;
    if (typeof value.id !== "string" || value.id.trim() === "" || ids.has(value.id)) return undefined;
    ids.add(value.id);
    nodeCount.value += 1;
    if (value.kind === "single") {
        const profile = value.profile === "round" || value.profile === "ribbon" ? value.profile : undefined;
        const diameter = finiteNumber(value.diameter, 0.000001);
        const width = finiteNumber(value.width, 0.000001);
        const thickness = finiteNumber(value.thickness, 0.000001);
        if (typeof value.materialId !== "string" || value.materialId.trim() === "" || profile === undefined
                || diameter === undefined || width === undefined || thickness === undefined) return undefined;
        return {
            kind: "single",
            id: value.id,
            materialId: canonicalMaterialId(value.materialId),
            profile,
            diameter,
            width,
            thickness,
        };
    }
    if (!isCompositeWireKind(value.kind) || !Array.isArray(value.members)
            || value.members.length === 0) return undefined;
    const strands = finiteNumber(
        value.strands,
        wireTreeLimits.minimumTwistedStrands,
        wireTreeLimits.maximumTwistedStrands,
    );
    const twistPitch = finiteNumber(value.twistPitch, 0);
    const wrapSpacing = finiteNumber(value.wrapSpacing, 0);
    if (strands === undefined || !Number.isInteger(strands)
            || twistPitch === undefined || wrapSpacing === undefined) return undefined;
    const members = value.members.map((member) => parseNodeData(member, ids, depth + 1, nodeCount));
    if (members.some((member) => member === undefined)) return undefined;
    const kind = value.kind;
    const acceptsLegacyTwistedShape = kind === "twisted" && members.length > 0;
    const acceptsLegacyParallelShape = kind === "parallel" && members.length === 1;
    if (!acceptsLegacyTwistedShape && !acceptsLegacyParallelShape
            && !isValidCompositeMemberCount(kind, members.length)) {
        return undefined;
    }
    return {
        kind,
        id: value.id,
        members: members as WireNodeData[],
        strands,
        twistPitch,
        wrapSpacing,
    };
};

const migrateImportedWireNodeData = (node: WireNodeData): WireNode | undefined => {
    if (node.kind === "single") {
        return createSingleWire(
            node.id,
            node.materialId,
            node.profile,
            node.diameter,
            node.width,
            node.thickness,
        );
    }
    const migratedMembers = node.members.map(migrateImportedWireNodeData);
    if (migratedMembers.some((member) => member === undefined)) return undefined;
    const members = migratedMembers as WireNode[];
    switch (node.kind) {
        case "parallel":
            if (members.length === 1) return cloneNode(members[0], node.id);
            return members.length >= 2
                ? createParallelWire(node.id, [members[0], members[1], ...members.slice(2)])
                : undefined;
        case "twisted":
            return members[0]
                ? createTwistedWire(node.id, members[0], node.strands, node.twistPitch)
                : undefined;
        case "clapton":
            return members.length === 2
                ? createClaptonWire(node.id, members[0], members[1], node.wrapSpacing)
                : undefined;
        case "staggered-clapton":
            return members.length === 3
                ? createStaggeredClaptonWire(
                        node.id,
                        members[0],
                        members[1],
                        members[2],
                        node.wrapSpacing,
                    )
                : undefined;
    }
};

const parseSettings = (value: unknown): WizardSettings | undefined => {
    if (!isRecord(value)) return undefined;
    const innerDiameter = finiteNumber(value.innerDiameter, 0.000001);
    const wraps = finiteNumber(value.wraps, 0.000001);
    const legLength = finiteNumber(value.legLength, 0);
    const wrapSpacing = finiteNumber(value.wrapSpacing, 0);
    if (innerDiameter === undefined || wraps === undefined || legLength === undefined
            || wrapSpacing === undefined || !Array.isArray(value.temperatures)
            || validateTemperaturePoints(value.temperatures as number[]).kind === "invalid"
            || (value.scale !== "celsius" && value.scale !== "fahrenheit")
            || typeof value.showAllComponents !== "boolean") return undefined;
    const importedRoot = parseNodeData(value.root, new Set(), 0, { value: 0 });
    if (!importedRoot) return undefined;
    const root = migrateImportedWireNodeData(importedRoot);
    if (!root) return undefined;
    return {
        innerDiameter,
        wraps,
        legLength,
        wrapSpacing,
        temperatures: [...value.temperatures] as number[],
        scale: value.scale,
        showAllComponents: value.showAllComponents,
        root,
    };
};

export const importWizardDesign = (text: string): ImportResult => {
    try {
        const parsed: unknown = JSON.parse(text);
        if (!isRecord(parsed) || parsed.version !== 1) {
            return { kind: "invalid", message: "The design uses an unsupported format version." };
        }
        const settings = parseSettings(parsed.settings);
        return settings
            ? { kind: "valid", settings }
            : { kind: "invalid", message: "The design contains invalid or unsafe values." };
    } catch {
        return { kind: "invalid", message: "The design file is not valid JSON." };
    }
};

export const exportWizardDesign = (settings: WizardSettings): string => JSON.stringify({
    version: 1,
    settings: serializeWizardSettings(settings),
} satisfies WireWizardEnvelope, undefined, 2);

export const saveWizardSettings = (
    settings: WizardSettings,
    storage: StorageLike | undefined = typeof localStorage === "undefined" ? undefined : localStorage,
): boolean => {
    if (!storage || importWizardDesign(exportWizardDesign(settings)).kind === "invalid") return false;
    try {
        storage.setItem(wireWizardStorageKey, exportWizardDesign(settings));
        return true;
    } catch {
        return false;
    }
};

export const loadWizardSettings = (
    storage: StorageLike | undefined = typeof localStorage === "undefined" ? undefined : localStorage,
): LoadResult => {
    if (!storage) return { settings: defaultSettings() };
    let raw: string | null;
    try {
        raw = storage.getItem(wireWizardStorageKey);
    } catch {
        return { settings: defaultSettings(), error: "Saved Wire Wizard data could not be read." };
    }
    if (!raw) return { settings: defaultSettings() };
    const result = importWizardDesign(raw);
    return result.kind === "valid"
        ? { settings: result.settings }
        : { settings: defaultSettings(), error: result.message };
};
