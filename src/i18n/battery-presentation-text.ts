import { batteryPresets } from "../catalogs/batteries/defaults";
import type { CatalogPresentationMap } from "./catalog-presentations";

const batteryTextIds = [
    "battery.summary.removable",
    "battery.summary.integrated",
    "battery.note.approvedResearch",
    "battery.note.capacityBelowLabel",
    "battery.note.battery-71.evidence",
    "battery.note.battery-77.evidence",
    "battery.note.battery-78.evidence",
    "battery.note.battery-79.evidence",
    "battery.note.battery-80.evidence",
    "battery.note.battery-81.evidence",
    "battery.note.battery-82.evidence",
    "battery.note.battery-83.evidence",
    "battery.note.battery-84.evidence",
    "battery.note.battery-85.evidence",
    "battery.note.battery-86.evidence",
    "battery.note.battery-87.evidence",
    "battery.note.battery-88.evidence",
    "battery.note.battery-89.evidence",
    "battery.note.battery-90.evidence",
    "battery.note.battery-91.evidence",
    "battery.note.battery-92.evidence",
    "battery.note.battery-93.evidence",
    "battery.note.battery-94.evidence",
    "battery.note.battery-95.evidence",
    "battery.note.battery-96.evidence",
    "battery.safety.lowDrain",
] as const;

export type BatteryTextId = (typeof batteryTextIds)[number];

export type BatteryTextDictionary = Readonly<Record<BatteryTextId, string>>;

const noteTextIds: Readonly<Record<string, BatteryTextId>> = {
    "battery-71": "battery.note.battery-71.evidence",
    "battery-72": "battery.note.capacityBelowLabel",
    "battery-73": "battery.note.capacityBelowLabel",
    "battery-77": "battery.note.battery-77.evidence",
    "battery-78": "battery.note.battery-78.evidence",
    "battery-79": "battery.note.battery-79.evidence",
    "battery-80": "battery.note.battery-80.evidence",
    "battery-81": "battery.note.battery-81.evidence",
    "battery-82": "battery.note.battery-82.evidence",
    "battery-83": "battery.note.battery-83.evidence",
    "battery-84": "battery.note.battery-84.evidence",
    "battery-85": "battery.note.battery-85.evidence",
    "battery-86": "battery.note.battery-86.evidence",
    "battery-87": "battery.note.battery-87.evidence",
    "battery-88": "battery.note.battery-88.evidence",
    "battery-89": "battery.note.battery-89.evidence",
    "battery-90": "battery.note.battery-90.evidence",
    "battery-91": "battery.note.battery-91.evidence",
    "battery-92": "battery.note.battery-92.evidence",
    "battery-93": "battery.note.battery-93.evidence",
    "battery-94": "battery.note.battery-94.evidence",
    "battery-95": "battery.note.battery-95.evidence",
    "battery-96": "battery.note.battery-96.evidence",
    ...Object.fromEntries(Array.from({ length: 28 }, (_, index) => [
        `battery-${index + 97}`,
        "battery.note.approvedResearch" as BatteryTextId,
    ])),
};

const textIdForNote = (batteryId: string): BatteryTextId | undefined => noteTextIds[batteryId];

export const batteryPresentationsFor = (texts: BatteryTextDictionary): CatalogPresentationMap =>
    Object.fromEntries(batteryPresets.map((battery) => {
        const noteTextId = textIdForNote(battery.id);
        if (battery.dataNote && !noteTextId) {
            throw new Error(`Missing semantic text ID for the data note on ${battery.id}`);
        }
        const summaryTextId = battery.batteryAccess === "integrated"
            ? "battery.summary.integrated"
            : "battery.summary.removable";
        return [battery.id, {
            displayName: battery.displayName,
            summary: texts[summaryTextId],
            notes: noteTextId ? [texts[noteTextId]] : undefined,
            safetyText: battery.safetyWarning ? texts["battery.safety.lowDrain"] : undefined,
        }];
    }));

export const batteryTextKeys = (): readonly BatteryTextId[] => batteryTextIds;
