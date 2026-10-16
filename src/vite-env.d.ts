/// <reference types="vite/client" />

declare module "virtual:steam-engine-entity-records" {
    import type { BatteryEntityRecord } from "./catalogs/entity-records";
    import type { ModEntityRecord } from "./catalogs/entity-records";

    export const batteryEntityRecords: Readonly<Record<string, BatteryEntityRecord>>;
    export const modEntityRecords: Readonly<Record<string, ModEntityRecord>>;
}
