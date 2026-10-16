import { useSyncExternalStore, type ReactElement } from "react";
import {
    CatalogManager,
    type CatalogEditorMode,
} from "../../shared/ui/catalog-manager";
import type { CustomBattery, DefaultBattery } from "./catalog";
import { BatteryEditor } from "./battery-editor";
import type { BatteryRepository } from "./repository";
import { localizedRouteHref, pageLocale } from "../../i18n/page-locale";

export type BatteryManagerProps = {
    readonly repository: BatteryRepository;
    readonly onClose: () => void;
};

export const BatteryManager = ({ repository, onClose }: BatteryManagerProps): ReactElement => {
    const snapshot = useSyncExternalStore(repository.subscribe, repository.getSnapshot, repository.getSnapshot);
    const renderEditor = (
        mode: CatalogEditorMode<DefaultBattery, CustomBattery>,
        onSaved: (message: string) => void,
        onCancel: () => void,
    ) => <BatteryEditor mode={mode} defaultBatteries={snapshot.defaultBatteries}
        onSave={(battery) => repository.saveCustomBattery(battery)} onSaved={onSaved} onCancel={onCancel} />;

    return <CatalogManager
        idPrefix="battery-manager"
        noun="Battery"
        pluralNoun="Batteries"
        onClose={onClose}
        storageKey="steamengine.batteries.v1"
        error={snapshot.error}
        defaultItems={snapshot.defaultBatteries}
        customItems={snapshot.customBatteries}
        hiddenDefaultIds={snapshot.hiddenDefaultBatteryIds}
        defaultItemLabel={(battery) => battery.displayName}
        defaultVisibilityControl="toggle"
        defaultItemHref={(battery) => battery.slug === undefined
            ? undefined
            : localizedRouteHref(pageLocale(), `catalog/battery/${battery.slug}`)}
        customItemLabel={(battery) => battery.displayName}
        customItemSummary={(battery) => <>{battery.ratedCapacityMah} mAh</>}
        customItemsDescription="Custom batteries are always shown in the calculator selector."
        setDefaultVisible={repository.setDefaultVisible}
        referencesFor={repository.referencesFor}
        deleteCustom={repository.deleteCustomBattery}
        reset={repository.reset}
        renderEditor={renderEditor}
    />;
};
