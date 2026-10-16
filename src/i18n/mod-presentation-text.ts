import { builtInPresets } from "../catalogs/mods/presets";
import type { CatalogPresentationMap } from "./catalog-presentations";

const modTextIds = [
    "mod.profile.regulated",
    "mod.preset-9.profile",
    "mod.preset-10.profile",
    "mod.preset-231.profile",
    "mod.preset-234.profile",
    "mod.preset-235.profile",
    "mod.preset-236.profile",
    "mod.preset-237.profile",
    "mod.preset-238.profile",
] as const;

export type ModTextId = (typeof modTextIds)[number];

export type ModTextDictionary = Readonly<{
    readonly "mod.profile.regulated": (displayName: string) => string;
} & Record<Exclude<ModTextId, "mod.profile.regulated">, string>>;

const customProfileTextIds: Readonly<Record<string, Exclude<ModTextId, "mod.profile.regulated">>> = {
    "preset-9": "mod.preset-9.profile",
    "preset-10": "mod.preset-10.profile",
    "preset-231": "mod.preset-231.profile",
    "preset-234": "mod.preset-234.profile",
    "preset-235": "mod.preset-235.profile",
    "preset-236": "mod.preset-236.profile",
    "preset-237": "mod.preset-237.profile",
    "preset-238": "mod.preset-238.profile",
};

export const modPresentationsFor = (texts: ModTextDictionary): CatalogPresentationMap =>
    Object.fromEntries(builtInPresets.map((mod) => {
        const customTextId = customProfileTextIds[mod.id];
        if (mod.description && !customTextId) {
            throw new Error(`Missing semantic text ID for the description on ${mod.id}`);
        }
        const profile = customTextId
            ? texts[customTextId]
            : texts["mod.profile.regulated"](mod.displayName);
        return [mod.id, {
            displayName: mod.displayName,
            description: profile,
            summary: profile,
        }];
    }));

export const modTextKeys = (): readonly ModTextId[] => modTextIds;
