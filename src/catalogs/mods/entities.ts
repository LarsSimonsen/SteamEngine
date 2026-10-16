import {
    modAdditionalCapabilities,
    modOutputControlModes,
    type DefaultMod,
    type ModBatteryConfiguration,
    type ModBatteryInput,
    type ModFeatureSupport,
    type ModOperatingFeatures,
} from "./catalog";
import { formatModDisplayName } from "./catalog";
import { builtInPresets } from "./presets";

export type ModCatalogEntity = Readonly<{
    readonly slug: string;
    readonly mod: DefaultMod;
    readonly profiles: readonly DefaultMod[];
}>;

const uniqueById = <T extends { readonly id: string }>(items: readonly T[]): readonly T[] =>
    [...new Map(items.map((item) => [item.id, item])).values()];

const finiteValues = (values: readonly (number | undefined)[]): readonly number[] =>
    values.filter((value): value is number => value !== undefined);

const minimum = (values: readonly (number | undefined)[]): number | undefined => {
    const defined = finiteValues(values);
    return defined.length === 0 ? undefined : Math.min(...defined);
};

const maximum = (values: readonly (number | undefined)[]): number | undefined => {
    const defined = finiteValues(values);
    return defined.length === 0 ? undefined : Math.max(...defined);
};

const mergedBatteryConfigurations = (
    profiles: readonly DefaultMod[],
): readonly ModBatteryConfiguration[] | undefined => {
    const configurations = uniqueById(profiles.flatMap((profile) => profile.batteryConfigurations ?? []));
    return configurations.length === 0 ? undefined : configurations;
};

const mergedBatteryInputs = (profiles: readonly DefaultMod[]): readonly ModBatteryInput[] | undefined => {
    const inputs = uniqueById(profiles.flatMap((profile) => profile.supportedBatteryInputs ?? []));
    return inputs.length === 0 ? undefined : inputs;
};

const mergeFeatureStatus = (statuses: readonly ModFeatureSupport[]): ModFeatureSupport =>
    statuses.length > 0 && statuses.every((status) => status === statuses[0]) ? statuses[0]! : "unknown";

const mergedOperatingFeatures = (profiles: readonly DefaultMod[]): ModOperatingFeatures | undefined => {
    const features = profiles.map((profile) => profile.operatingFeatures).filter((value) => value !== undefined);
    if (features.length === 0) return undefined;
    return {
        outputModes: Object.fromEntries(modOutputControlModes.map((mode) => [
            mode,
            features.length === profiles.length
                ? mergeFeatureStatus(features.map(({ outputModes }) => outputModes[mode]))
                : "unknown",
        ])) as unknown as ModOperatingFeatures["outputModes"],
        capabilities: Object.fromEntries(modAdditionalCapabilities.map((capability) => [
            capability,
            features.length === profiles.length
                ? mergeFeatureStatus(features.map(({ capabilities }) => capabilities[capability]))
                : "unknown",
        ])) as unknown as ModOperatingFeatures["capabilities"],
    };
};

const mergeProfiles = (profiles: readonly DefaultMod[]): DefaultMod => {
    const representative = profiles[0]!;
    if (profiles.length === 1) return representative;
    const displayName = formatModDisplayName({
        manufacturer: representative.manufacturer,
        model: representative.model,
    });
    const aliases = [...new Set(profiles.flatMap((profile) => [
        profile.displayName,
        ...(profile.aliases ?? []),
    ]).filter((alias) => alias !== displayName))];
    const minimumResistance = minimum(profiles.map((profile) => profile.minimumAtomizerResistanceOhms));
    const maximumResistance = maximum(profiles.map((profile) => profile.maximumAtomizerResistanceOhms));
    const batteryConfigurations = mergedBatteryConfigurations(profiles);
    const supportedBatteryInputs = mergedBatteryInputs(profiles);
    const operatingFeatures = mergedOperatingFeatures(profiles);
    return {
        ...representative,
        displayName,
        variant: undefined,
        aliases,
        maximumOutputVoltageVolts: Math.max(...profiles.map((profile) => profile.maximumOutputVoltageVolts)),
        maximumOutputPowerWatts: Math.max(...profiles.map((profile) => profile.maximumOutputPowerWatts)),
        maximumOutputCurrentAmps: Math.max(...profiles.map((profile) => profile.maximumOutputCurrentAmps)),
        ...(minimumResistance === undefined ? {} : { minimumAtomizerResistanceOhms: minimumResistance }),
        ...(maximumResistance === undefined ? {} : { maximumAtomizerResistanceOhms: maximumResistance }),
        ...(batteryConfigurations === undefined ? {} : { batteryConfigurations }),
        ...(supportedBatteryInputs === undefined ? {} : { supportedBatteryInputs }),
        ...(operatingFeatures === undefined ? {} : { operatingFeatures }),
    };
};

const profilesBySlug = new Map<string, DefaultMod[]>();
for (const profile of builtInPresets) {
    if (profile.slug === undefined) continue;
    const profiles = profilesBySlug.get(profile.slug) ?? [];
    profiles.push(profile);
    profilesBySlug.set(profile.slug, profiles);
}

export const modCatalogEntities: readonly ModCatalogEntity[] = [...profilesBySlug].map(([slug, profiles]) => ({
    slug,
    profiles,
    mod: mergeProfiles(profiles),
}));

export const modCatalogEntityForSlug = (slug: string): ModCatalogEntity | undefined =>
    modCatalogEntities.find((entity) => entity.slug === slug);
