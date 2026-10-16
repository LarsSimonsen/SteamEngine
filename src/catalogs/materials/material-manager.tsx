import { useSyncExternalStore, type ReactElement } from "react";
import {
    CatalogManager,
    type CatalogEditorMode,
} from "../../shared/ui/catalog-manager";
import type { CustomMaterial, DefaultMaterial } from "./catalog";
import { MaterialEditor } from "./material-editor";
import type { MaterialRepository } from "./repository";

export type MaterialManagerProps = {
    readonly repository: MaterialRepository;
    readonly onClose: () => void;
};

export const MaterialManager = ({ repository, onClose }: MaterialManagerProps): ReactElement => {
    const snapshot = useSyncExternalStore(repository.subscribe, repository.getSnapshot, repository.getSnapshot);
    const renderEditor = (
        mode: CatalogEditorMode<DefaultMaterial, CustomMaterial>,
        onSaved: (message: string) => void,
        onCancel: () => void,
    ) => <MaterialEditor mode={mode} defaultMaterials={snapshot.defaultMaterials}
        onSave={(material) => repository.saveCustomMaterial(material)} onSaved={onSaved} onCancel={onCancel} />;

    return <CatalogManager
        idPrefix="material-manager"
        noun="Material"
        pluralNoun="Materials"
        onClose={onClose}
        storageKey="steamengine.materials.v1"
        error={snapshot.error}
        defaultItems={snapshot.defaultMaterials}
        customItems={snapshot.customMaterials}
        hiddenDefaultIds={snapshot.hiddenDefaultMaterialIds}
        defaultItemLabel={(material) => material.name}
        customItemLabel={(material) => material.name}
        customItemSummary={(material) => <>{material.resistivity} Ω mm²/m</>}
        customItemsDescription="Custom materials are always shown in calculator selectors."
        setDefaultVisible={repository.setDefaultVisible}
        referencesFor={repository.referencesFor}
        deleteCustom={repository.deleteCustomMaterial}
        reset={repository.reset}
        renderEditor={renderEditor}
    />;
};
