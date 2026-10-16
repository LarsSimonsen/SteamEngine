import { materials, type Material } from "../../catalogs/materials/catalog";
import type { TemperatureScale } from "../../shared/domain/temperature";
import { awgToMm } from "../../shared/domain/wire-units";

export { materials };
export type { Material as WireMaterial };
export type { TemperatureScale } from "../../shared/domain/temperature";

export type WireKind =
    "single" | "parallel" | "twisted" | "clapton" | "staggered-clapton";
export type CompositeWireKind = Exclude<WireKind, "single">;
export type WireProfile = "round" | "ribbon";

type CompositeWireRule = {
    readonly minimumMemberCount: number;
    readonly maximumMemberCount: number | null;
    readonly variableMembers: boolean;
    readonly allowsParallelChild: boolean;
};

export const wireTreeLimits = {
    maximumDepth: 5,
    maximumNodes: 100,
    minimumTwistedStrands: 2,
    maximumTwistedStrands: 4,
} as const;

export const compositeWireRules: Readonly<Record<
    CompositeWireKind,
    CompositeWireRule
>> = {
    parallel: {
        minimumMemberCount: 2,
        maximumMemberCount: null,
        variableMembers: true,
        allowsParallelChild: false,
    },
    twisted: {
        minimumMemberCount: 1,
        maximumMemberCount: 1,
        variableMembers: false,
        allowsParallelChild: false,
    },
    clapton: {
        minimumMemberCount: 2,
        maximumMemberCount: 2,
        variableMembers: false,
        allowsParallelChild: true,
    },
    "staggered-clapton": {
        minimumMemberCount: 3,
        maximumMemberCount: 3,
        variableMembers: false,
        allowsParallelChild: true,
    },
};

export const isValidCompositeMemberCount = (
    kind: CompositeWireKind,
    count: number,
): boolean => {
    const rule = compositeWireRules[kind];
    return count >= rule.minimumMemberCount
        && (rule.maximumMemberCount === null || count <= rule.maximumMemberCount);
};

export type SingleWire = {
    readonly kind: "single";
    readonly id: string;
    readonly materialId: string;
    readonly profile: WireProfile;
    readonly diameter: number;
    readonly width: number;
    readonly thickness: number;
};

export type ParallelWire = {
    readonly kind: "parallel";
    readonly id: string;
    readonly members: readonly [WireNode, WireNode, ...WireNode[]];
};

export type TwistedWire = {
    readonly kind: "twisted";
    readonly id: string;
    readonly wire: WireNode;
    readonly strands: number;
    readonly twistPitch: number;
};

export type ClaptonWire = {
    readonly kind: "clapton";
    readonly id: string;
    readonly core: WireNode;
    readonly wrap: WireNode;
    readonly wrapSpacing: number;
};

export type StaggeredClaptonWire = {
    readonly kind: "staggered-clapton";
    readonly id: string;
    readonly core: WireNode;
    readonly primaryWrap: WireNode;
    readonly secondaryWrap: WireNode;
    readonly wrapSpacing: number;
};

export type CompositeWire = ParallelWire | TwistedWire | ClaptonWire | StaggeredClaptonWire;
export type WireNode = SingleWire | CompositeWire;

export const createSingleWire = (
    id: string,
    materialId = "ka1",
    profile: WireProfile = "round",
    diameter = awgToMm(30),
    width = 0.5,
    thickness = 0.1,
): SingleWire => ({
    kind: "single",
    id,
    materialId,
    profile,
    diameter,
    width,
    thickness,
});

export const createParallelWire = (
    id: string,
    members: readonly [WireNode, WireNode, ...WireNode[]],
): ParallelWire => ({ kind: "parallel", id, members: [...members] });

export const createTwistedWire = (
    id: string,
    wire: WireNode,
    strands = 2,
    twistPitch = 0.5,
): TwistedWire => ({ kind: "twisted", id, wire, strands, twistPitch });

export const createClaptonWire = (
    id: string,
    core: WireNode,
    wrap: WireNode,
    wrapSpacing = 0.05,
): ClaptonWire => ({ kind: "clapton", id, core, wrap, wrapSpacing });

export const createStaggeredClaptonWire = (
    id: string,
    core: WireNode,
    primaryWrap: WireNode,
    secondaryWrap: WireNode,
    wrapSpacing = 0.05,
): StaggeredClaptonWire => ({
    kind: "staggered-clapton",
    id,
    core,
    primaryWrap,
    secondaryWrap,
    wrapSpacing,
});

export const wireChildren = (node: WireNode): readonly WireNode[] => {
    switch (node.kind) {
        case "single":
            return [];
        case "parallel":
            return node.members;
        case "twisted":
            return [node.wire];
        case "clapton":
            return [node.core, node.wrap];
        case "staggered-clapton":
            return [node.core, node.primaryWrap, node.secondaryWrap];
    }
};

export const mapWireChildren = (
    node: WireNode,
    mapChild: (child: WireNode, index: number) => WireNode,
): WireNode => {
    switch (node.kind) {
        case "single":
            return node;
        case "parallel": {
            const [first, second, ...rest] = node.members;
            return createParallelWire(node.id, [
                mapChild(first, 0),
                mapChild(second, 1),
                ...rest.map((child, index) => mapChild(child, index + 2)),
            ]);
        }
        case "twisted":
            return createTwistedWire(
                node.id,
                mapChild(node.wire, 0),
                node.strands,
                node.twistPitch,
            );
        case "clapton":
            return createClaptonWire(
                node.id,
                mapChild(node.core, 0),
                mapChild(node.wrap, 1),
                node.wrapSpacing,
            );
        case "staggered-clapton":
            return createStaggeredClaptonWire(
                node.id,
                mapChild(node.core, 0),
                mapChild(node.primaryWrap, 1),
                mapChild(node.secondaryWrap, 2),
                node.wrapSpacing,
            );
    }
};

export type WizardSettings = {
    readonly innerDiameter: number;
    readonly wraps: number;
    readonly legLength: number;
    readonly wrapSpacing: number;
    readonly temperatures: readonly number[];
    readonly scale: TemperatureScale;
    readonly showAllComponents: boolean;
    readonly root: WireNode;
};

export const defaultTemperaturePoints = [
    -40, 20, 50, 100, 150, 200, 250, 300,
] as const;
export const defaultSettings = (): WizardSettings => ({
    innerDiameter: 2,
    wraps: 8,
    legLength: 5,
    wrapSpacing: 0.05,
    temperatures: [...defaultTemperaturePoints],
    scale: "celsius",
    showAllComponents: false,
    root: createSingleWire("wire-1"),
});

export const cloneNode = (node: WireNode, id: string): WireNode => {
    if (node.kind === "single") return { ...node, id };
    return {
        ...mapWireChildren(node, (child, index) => cloneNode(child, `${id}-${index + 1}`)),
        id,
    };
};

const collectWireNodeIds = (nodes: readonly WireNode[]): Set<string> => {
    const ids = new Set<string>();
    const visit = (node: WireNode): void => {
        ids.add(node.id);
        wireChildren(node).forEach(visit);
    };
    nodes.forEach(visit);
    return ids;
};

export const nextWireChildId = (
    parentId: string,
    existingNodes: readonly WireNode[],
): string => {
    const existingIds = collectWireNodeIds(existingNodes);
    let suffix = 1;
    while (existingIds.has(`${parentId}-${suffix}`)) suffix += 1;
    return `${parentId}-${suffix}`;
};

export const wrapWireInParallel = (wire: WireNode): ParallelWire =>
    createParallelWire(wire.id, [
        cloneNode(wire, `${wire.id}-1`),
        createSingleWire(`${wire.id}-2`),
    ]);

export type CalculatedWire = {
    readonly id: string;
    readonly kind: WireKind;
    readonly label: string;
    readonly resistance: number;
    readonly resistancePerLength: number;
    readonly tcrSensitivity: number | null;
    readonly tcPrecision: number | null;
    readonly length: number;
    readonly surfaceArea: number;
    readonly crossSectionArea: number;
    readonly volume: number;
    readonly mass: number | null;
    readonly density: number | null;
    readonly heatCapacity: number | null;
    readonly normalizedFactors: readonly number[];
    readonly temperatureDataAvailable: boolean;
    readonly temperatureDataRangeCelsius: readonly [number, number] | undefined;
    readonly temperatureExtrapolated: boolean;
    readonly width: number;
    readonly thickness: number;
    readonly children: readonly CalculatedWire[];
};

export type WizardCalculation =
    | {
            readonly kind: "valid";
            readonly root: CalculatedWire;
            readonly components: readonly CalculatedWire[];
        }
    | { readonly kind: "invalid"; readonly message: string };

export type EquivalentTemperatureResult =
    | {
            readonly kind: "valid";
            readonly sourceFactor: number;
            readonly targetTemperatureCelsius: number;
        }
    | {
            readonly kind: "unavailable";
            readonly sourceFactor?: number;
            readonly message: string;
        };

const filePart = (value: string): string =>
    value
        .replace(/ /g, "_")
        .replace(/\//g, "_")
        .replace(/__/g, " ")
        .replace(/__/g, " ");
export const dna200FileName = (root: CalculatedWire): string => {
    if (root.kind === "single")
        return `DNA200-${filePart(root.label)}-SteamEngine.csv`;
    const kind =
        root.kind === "staggered-clapton"
            ? "StaggeredClapton"
            : root.kind[0].toUpperCase() + root.kind.slice(1);
    const children = root.children
        .slice(0, 2)
        .map((child) => `-${filePart(child.label)}`)
        .join("");
    return `DNA200-${kind}${children}-SteamEngine.csv`;
};
