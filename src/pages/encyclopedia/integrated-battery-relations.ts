export type IntegratedBatteryModRelation = {
    readonly batterySlug: string;
    readonly modSlug: string;
};

/** Exact non-removable battery/mod identities preserved by the recovered catalogs. */
export const integratedBatteryModRelations: readonly IntegratedBatteryModRelation[] = [
    {
        batterySlug: "innokin-itaste-mvp-2-0",
        modSlug: "innokin-itaste-mvp-2-0",
    },
    {
        batterySlug: "innokin-itaste-vv-v3-0",
        modSlug: "innokin-itaste-vv-v3-0",
    },
];

export const relationForBattery = (batterySlug: string): IntegratedBatteryModRelation | undefined =>
    integratedBatteryModRelations.find((relation) => relation.batterySlug === batterySlug);

export const relationForMod = (modSlug: string): IntegratedBatteryModRelation | undefined =>
    integratedBatteryModRelations.find((relation) => relation.modSlug === modSlug);
