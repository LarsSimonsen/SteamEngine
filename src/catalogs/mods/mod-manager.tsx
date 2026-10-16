import { useSyncExternalStore, type ReactElement } from "react";
import {
    CatalogManager,
    type CatalogEditorMode,
} from "../../shared/ui/catalog-manager";
import type { CustomMod, DefaultMod } from "./catalog";
import { ModEditor } from "./mod-editor";
import type { ModRepository } from "./repository";
import { localizedRouteHref, pageLocale } from "../../i18n/page-locale";

export type ModManagerProps = {
    readonly repository: ModRepository;
    readonly onClose: () => void;
};

export const ModManager = ({ repository, onClose }: ModManagerProps): ReactElement => {
    const snapshot = useSyncExternalStore(repository.subscribe, repository.getSnapshot, repository.getSnapshot);
    const renderEditor = (
        mode: CatalogEditorMode<DefaultMod, CustomMod>,
        onSaved: (message: string) => void,
        onCancel: () => void,
    ) => <ModEditor mode={mode} defaultMods={snapshot.defaultMods}
        onSave={(mod) => repository.saveCustomMod(mod)} onSaved={onSaved} onCancel={onCancel} />;

    return <CatalogManager
        idPrefix="mod-manager"
        noun="Mod"
        pluralNoun="Mods"
        onClose={onClose}
        storageKey="steamengine.mods.v1"
        error={snapshot.error}
        defaultItems={snapshot.defaultMods}
        customItems={snapshot.customMods}
        hiddenDefaultIds={snapshot.hiddenDefaultModIds}
        defaultItemLabel={(mod) => mod.displayName}
        defaultVisibilityControl="toggle"
        defaultItemHref={(mod) => mod.slug === undefined
            ? undefined
            : localizedRouteHref(pageLocale(), `catalog/mod/${mod.slug}`)}
        customItemLabel={(mod) => mod.displayName}
        customItemSummary={(mod) => <>{mod.maximumOutputPowerWatts} W</>}
        customItemsDescription="Custom mods are always shown in the calculator selector."
        setDefaultVisible={repository.setDefaultVisible}
        referencesFor={repository.referencesFor}
        deleteCustom={repository.deleteCustomMod}
        reset={repository.reset}
        renderEditor={renderEditor}
    />;
};
