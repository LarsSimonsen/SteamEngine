import {
    compositeWireRules,
    cloneNode,
    createClaptonWire,
    createParallelWire,
    createSingleWire,
    createStaggeredClaptonWire,
    createTwistedWire,
    mapWireChildren,
    nextWireChildId,
    wireChildren,
    wireTreeLimits,
    wrapWireInParallel,
    type CompositeWireKind,
    type SingleWire,
    type WireKind,
    type WireNode,
    type WireProfile,
} from "./domain";

export type WireTreeAction =
    | { readonly type: "change-kind"; readonly nodeId: string; readonly kind: WireKind }
    | { readonly type: "set-material"; readonly nodeId: string; readonly materialId: string }
    | { readonly type: "set-profile"; readonly nodeId: string; readonly profile: WireProfile }
    | { readonly type: "set-diameter"; readonly nodeId: string; readonly diameter: number }
    | { readonly type: "set-width"; readonly nodeId: string; readonly width: number }
    | { readonly type: "set-thickness"; readonly nodeId: string; readonly thickness: number }
    | { readonly type: "set-strands"; readonly nodeId: string; readonly strands: number }
    | { readonly type: "set-twist-pitch"; readonly nodeId: string; readonly twistPitch: number }
    | { readonly type: "set-wrap-spacing"; readonly nodeId: string; readonly wrapSpacing: number }
    | { readonly type: "wrap-wire-in-parallel"; readonly nodeId: string }
    | { readonly type: "add-parallel-member"; readonly nodeId: string }
    | {
            readonly type: "remove-parallel-member";
            readonly nodeId: string;
            readonly memberId: string;
        };

type NodeContext = {
    readonly depth: number;
    readonly parentKind?: CompositeWireKind;
};

const createWireNode = (id: string, kind: WireKind): WireNode => {
    switch (kind) {
        case "single":
            return createSingleWire(id);
        case "parallel":
            return createParallelWire(id, [
                createSingleWire(`${id}-1`),
                createSingleWire(`${id}-2`),
            ]);
        case "twisted":
            return createTwistedWire(id, createSingleWire(`${id}-1`));
        case "clapton":
            return createClaptonWire(
                id,
                createSingleWire(`${id}-1`),
                createSingleWire(`${id}-2`),
            );
        case "staggered-clapton":
            return createStaggeredClaptonWire(
                id,
                createSingleWire(`${id}-1`),
                createSingleWire(`${id}-2`),
                createSingleWire(`${id}-3`),
            );
    }
};

const copySingleWire = (
    wire: SingleWire,
    changes: Partial<Pick<
        SingleWire,
        "materialId" | "profile" | "diameter" | "width" | "thickness"
    >>,
): SingleWire => ({ ...wire, ...changes });

const canCreateComposite = (
    kind: CompositeWireKind,
    context: NodeContext,
): boolean => context.depth < wireTreeLimits.maximumDepth
    && (kind !== "parallel"
        || !context.parentKind
        || compositeWireRules[context.parentKind].allowsParallelChild);

const relativeMaximumDepth = (node: WireNode): number =>
    node.kind === "single"
        ? 0
        : 1 + Math.max(...wireChildren(node).map(relativeMaximumDepth), 0);

export const canWrapWireAtDepth = (
    node: WireNode,
    depth: number,
    parentKind?: CompositeWireKind,
): boolean => parentKind !== "parallel"
    && parentKind !== "twisted"
    && depth + relativeMaximumDepth(node) < wireTreeLimits.maximumDepth;

const reduceTargetNode = (
    node: WireNode,
    action: WireTreeAction,
    context: NodeContext,
): WireNode => {
    switch (action.type) {
        case "change-kind":
            if (node.kind === action.kind) return node;
            if (action.kind !== "single" && !canCreateComposite(action.kind, context)) return node;
            return createWireNode(node.id, action.kind);
        case "set-material":
            return node.kind === "single"
                ? copySingleWire(node, { materialId: action.materialId })
                : node;
        case "set-profile":
            return node.kind === "single" ? copySingleWire(node, { profile: action.profile }) : node;
        case "set-diameter":
            return node.kind === "single" ? copySingleWire(node, { diameter: action.diameter }) : node;
        case "set-width":
            return node.kind === "single" ? copySingleWire(node, { width: action.width }) : node;
        case "set-thickness":
            return node.kind === "single" ? copySingleWire(node, { thickness: action.thickness }) : node;
        case "set-strands":
            return node.kind === "twisted" ? { ...node, strands: action.strands } : node;
        case "set-twist-pitch":
            return node.kind === "twisted"
                ? { ...node, twistPitch: action.twistPitch }
                : node;
        case "set-wrap-spacing":
            return node.kind === "clapton" || node.kind === "staggered-clapton"
                ? { ...node, wrapSpacing: action.wrapSpacing }
                : node;
        case "wrap-wire-in-parallel":
            return canWrapWireAtDepth(node, context.depth, context.parentKind)
                ? wrapWireInParallel(node)
                : node;
        case "add-parallel-member":
            if (node.kind !== "parallel"
                    || context.depth >= wireTreeLimits.maximumDepth) return node;
            return createParallelWire(node.id, [
                ...node.members,
                createSingleWire(nextWireChildId(node.id, node.members)),
            ]);
        case "remove-parallel-member":
            if (node.kind !== "parallel"
                    || !node.members.some((member) => member.id === action.memberId)) return node;
            const remaining = node.members.filter((member) => member.id !== action.memberId);
            if (remaining.length === 1) return cloneNode(remaining[0], node.id);
            return createParallelWire(node.id, [remaining[0], remaining[1], ...remaining.slice(2)]);
    }
};

const updateNode = (
    node: WireNode,
    action: WireTreeAction,
    context: NodeContext,
): WireNode => {
    if (node.id === action.nodeId) return reduceTargetNode(node, action, context);
    if (node.kind === "single") return node;
    let changed = false;
    const updated = mapWireChildren(node, (member) => {
        const next = updateNode(member, action, {
            depth: context.depth + 1,
            parentKind: node.kind,
        });
        if (next !== member) changed = true;
        return next;
    });
    return changed ? updated : node;
};

const countNodes = (node: WireNode): number =>
    node.kind === "single"
        ? 1
        : 1 + wireChildren(node).reduce((count, member) => count + countNodes(member), 0);

export const wireTreeReducer = (root: WireNode, action: WireTreeAction): WireNode => {
    const updated = updateNode(root, action, { depth: 0 });
    if (updated === root) return root;
    return countNodes(updated) <= wireTreeLimits.maximumNodes ? updated : root;
};
