import type { ReactElement, ReactNode } from "react";

export type CatalogOptionItem = {
    readonly id: string;
};

export type CatalogSelectOptionsProps<DefaultItem extends CatalogOptionItem, CustomItem extends CatalogOptionItem> = {
    readonly defaultItems: readonly DefaultItem[];
    readonly customItems: readonly CustomItem[];
    readonly optionLabel: (item: DefaultItem | CustomItem) => ReactNode;
    readonly defaultGroupLabel: string;
    readonly customGroupLabel: string;
    readonly placeholder?: { readonly value: string; readonly label: ReactNode };
};

export const CatalogSelectOptions = <
    DefaultItem extends CatalogOptionItem,
    CustomItem extends CatalogOptionItem,
>({
    defaultItems,
    customItems,
    optionLabel,
    defaultGroupLabel,
    customGroupLabel,
    placeholder,
}: CatalogSelectOptionsProps<DefaultItem, CustomItem>): ReactElement => <>
    {placeholder && <option value={placeholder.value}>{placeholder.label}</option>}
    <optgroup label={defaultGroupLabel}>
        {defaultItems.map((item) => <option key={item.id} value={item.id}>{optionLabel(item)}</option>)}
    </optgroup>
    {customItems.length > 0 && <optgroup label={customGroupLabel}>
        {customItems.map((item) => <option key={item.id} value={item.id}>{optionLabel(item)}</option>)}
    </optgroup>}
</>;
