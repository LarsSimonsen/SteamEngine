import fs from "node:fs";
import path from "node:path";
import type { Plugin } from "vite";
import type { BatteryEntityRecord, ModEntityRecord } from "../catalogs/entity-records";

export const entityRecordsModuleId = "virtual:steam-engine-entity-records";
const resolvedEntityRecordsModuleId = `\0${entityRecordsModuleId}`;

export type EntityRecordsPluginOptions = Readonly<{
    readonly batteryEntityIds?: readonly string[];
    readonly modEntityIds?: readonly string[];
    readonly outputDirectory?: string;
    readonly exposeRecordsToClient?: boolean;
    readonly loadRecords?: boolean;
}>;

/** Reads generated public records named `<catalog id>.json`, optionally limited to the given catalog ids. */
const readEntityRecords = <T>(
    recordDirectory: string,
    entityIds?: readonly string[],
): Readonly<Record<string, T>> => {
    const records: Record<string, T> = {};
    const ids = entityIds ?? fs.readdirSync(recordDirectory)
        .filter((file) => file.endsWith(".json"))
        .map((file) => decodeURIComponent(file.slice(0, -".json".length)));
    for (const id of ids) {
        const file = path.join(recordDirectory, `${encodeURIComponent(id)}.json`);
        if (fs.existsSync(file)) records[id] = JSON.parse(fs.readFileSync(file, "utf8")) as T;
    }
    return records;
};

export const createEntityRecordsPlugin = (
    recordDirectory: string,
    options: EntityRecordsPluginOptions = {},
): Plugin => {
    const batteryRecords = options.loadRecords === false
        ? {}
        : readEntityRecords<BatteryEntityRecord>(path.join(recordDirectory, "batteries"), options.batteryEntityIds);
    const modRecords = options.loadRecords === false
        ? {}
        : readEntityRecords<ModEntityRecord>(path.join(recordDirectory, "mods"), options.modEntityIds);
    let exposeRecordsToClient = options.exposeRecordsToClient;
    const moduleCode = (): string => {
        const clientRecords = exposeRecordsToClient === false
            ? { battery: {}, mods: {} }
            : { battery: batteryRecords, mods: modRecords };
        return `export const batteryEntityRecords = ${JSON.stringify(clientRecords.battery)};
export const modEntityRecords = ${JSON.stringify(clientRecords.mods)};`;
    };

    const writeRecordFiles = (
        category: "batteries" | "mods",
        records: Readonly<Record<string, unknown>>,
        entityIds: readonly string[] | undefined,
    ): void => {
        if (!options.outputDirectory) return;
        const categoryDirectory = path.join(options.outputDirectory, "catalog", "data", category);
        fs.rmSync(categoryDirectory, { recursive: true, force: true });
        fs.mkdirSync(categoryDirectory, { recursive: true });
        for (const entityId of entityIds ?? Object.keys(records)) {
            const record = records[entityId];
            if (!record) continue;
            fs.writeFileSync(
                path.join(categoryDirectory, `${encodeURIComponent(entityId)}.json`),
                `${JSON.stringify(record, null, 4)}\n`,
                "utf8",
            );
        }
    };

    return {
        name: "steam-engine-entity-records",
        configResolved(config) {
            exposeRecordsToClient ??= config.command === "serve";
        },
        resolveId(id) {
            return id === entityRecordsModuleId ? resolvedEntityRecordsModuleId : undefined;
        },
        load(id) {
            return id === resolvedEntityRecordsModuleId ? moduleCode() : undefined;
        },
        writeBundle() {
            writeRecordFiles("batteries", batteryRecords, options.batteryEntityIds);
            writeRecordFiles("mods", modRecords, options.modEntityIds);
        },
    };
};
