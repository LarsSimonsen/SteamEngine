import { batteryEntityRecords, modEntityRecords } from "virtual:steam-engine-entity-records";
import type { BatteryEntityRecord, ModEntityRecord } from "../../catalogs/entity-records";

export type EntityRecordCategory = "batteries" | "mods";
export type EntityRecord = BatteryEntityRecord | ModEntityRecord;

const staticRecordFor = (category: EntityRecordCategory, id: string): EntityRecord | undefined =>
    category === "batteries" ? batteryEntityRecords[id] : modEntityRecords[id];

export const getStaticEntityRecord = (
    category: EntityRecordCategory,
    id: string,
): EntityRecord | undefined => staticRecordFor(category, id);

export const loadEntityRecord = async (
    category: EntityRecordCategory,
    id: string,
): Promise<EntityRecord | undefined> => {
    if (!import.meta.env.PROD) return staticRecordFor(category, id);

    try {
        const response = await fetch(`../../catalog/data/${category}/${encodeURIComponent(id)}.json`);
        if (!response.ok) return undefined;
        return await response.json() as EntityRecord;
    } catch {
        return undefined;
    }
};
