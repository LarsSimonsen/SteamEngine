// presets.json is generated curated catalog data; see DATA-LICENSE.md and CONTRIBUTING.md#catalog-data.
import rawPresets from './presets.json';
import { isCatalogIntroduction, type CatalogEntryMetadata } from '../entry-metadata';
import { formatModDisplayName, type DefaultMod, type ModProperties } from './catalog';

type RawModPreset = Omit<ModProperties, 'displayName'> & {
    readonly introduction?: unknown;
    readonly initiallyVisible?: unknown;
};

const presetDefinitions = rawPresets as readonly RawModPreset[];

const entryMetadataFor = (preset: RawModPreset): CatalogEntryMetadata => {
    const { introduction, initiallyVisible } = preset;
    if (introduction !== undefined && introduction !== null && !isCatalogIntroduction(introduction)) {
        throw new Error(`Invalid introduction metadata for ${preset.id}`);
    }
    if (initiallyVisible !== undefined && typeof initiallyVisible !== 'boolean') {
        throw new Error(`Invalid initial visibility for ${preset.id}`);
    }
    return {
        ...(introduction !== undefined ? { introduction } : {}),
        ...(initiallyVisible !== undefined ? { initiallyVisible } : {}),
    };
};

export const builtInPresets: readonly DefaultMod[] = presetDefinitions.map((preset) => {
    const { introduction: _introduction, initiallyVisible: _initiallyVisible, ...properties } = preset;
    return {
        ...properties,
        ...entryMetadataFor(preset),
        displayName: formatModDisplayName(properties),
    };
});
