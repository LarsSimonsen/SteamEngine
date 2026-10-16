import { catalogErrorFor } from "../../i18n/catalog-errors";
import { useState, type FormEvent, type ReactElement } from "react";
import type { CustomMod, DefaultMod, Mod, ModOperatingFeatures } from "./catalog";
import type { ModRepositoryResult } from "./repository";
import { validateCustomMod } from "./validation";
import { messagesFor } from "../../i18n/messages";
import { pageLocale } from "../../i18n/page-locale";

export type ModEditorMode =
    | { readonly kind: "create" }
    | { readonly kind: "clone"; readonly source: DefaultMod }
    | { readonly kind: "edit"; readonly source: CustomMod };

export type ModEditorProps = {
    readonly mode: ModEditorMode;
    readonly defaultMods: readonly DefaultMod[];
    readonly onSave: (mod: CustomMod) => ModRepositoryResult;
    readonly onSaved: (message: string) => void;
    readonly onCancel: () => void;
};

type EditorDraft = {
    readonly id: string;
    readonly manufacturer: string;
    readonly model: string;
    readonly variant: string;
    readonly weightGrams: string;
    readonly basedOnPresetId: string;
    readonly maximumOutputVoltageVolts: string;
    readonly maximumOutputPowerWatts: string;
    readonly maximumOutputCurrentAmps: string;
    readonly minimumAtomizerResistanceOhms: string;
    readonly maximumAtomizerResistanceOhms: string;
    readonly clonedFrom?: string;
    readonly operatingFeatures?: ModOperatingFeatures;
};

const newModId = (): string => globalThis.crypto?.randomUUID?.()
    ?? `custom-${Date.now()}-${Math.random().toString(16).slice(2)}`;

const initialDraft = (mode: ModEditorMode): EditorDraft => {
    if (mode.kind === "create") {
        return {
            id: newModId(),
            manufacturer: "",
            model: "",
            variant: "",
            weightGrams: "",
            basedOnPresetId: "",
            maximumOutputVoltageVolts: "",
            maximumOutputPowerWatts: "",
            maximumOutputCurrentAmps: "",
            minimumAtomizerResistanceOhms: "",
            maximumAtomizerResistanceOhms: "",
        };
    }
    const source: Mod = mode.source;
    return {
        id: mode.kind === "clone" ? newModId() : source.id,
        manufacturer: source.manufacturer ?? "",
        model: mode.kind === "clone" ? `${source.model} copy` : source.model,
        variant: source.variant ?? "",
        weightGrams: weightDraftValue(source.weightGrams),
        basedOnPresetId: source.basedOnPresetId ?? "",
        maximumOutputVoltageVolts: String(source.maximumOutputVoltageVolts),
        maximumOutputPowerWatts: String(source.maximumOutputPowerWatts),
        maximumOutputCurrentAmps: String(source.maximumOutputCurrentAmps),
        minimumAtomizerResistanceOhms: source.minimumAtomizerResistanceOhms === undefined
            ? "" : String(source.minimumAtomizerResistanceOhms),
        maximumAtomizerResistanceOhms: source.maximumAtomizerResistanceOhms === undefined
            ? "" : String(source.maximumAtomizerResistanceOhms),
        ...(mode.kind === "clone"
            ? { clonedFrom: source.id }
            : mode.source.clonedFrom === undefined
                ? {}
                : { clonedFrom: mode.source.clonedFrom }),
        ...(source.operatingFeatures === undefined ? {} : { operatingFeatures: source.operatingFeatures }),
    };
};

const optionalNumber = (value: string): number | undefined =>
    value.trim() === "" ? undefined : Number(value);

const weightDraftValue = (value: number | undefined): string => value === undefined
    ? ""
    : String(Math.round(value * 100) / 100);

const weightInputValue = (value: string): string => {
    const decimalIndex = value.indexOf(".");
    return decimalIndex === -1 ? value : value.slice(0, decimalIndex + 3);
};

export const ModEditor = ({
    mode,
    defaultMods,
    onSave,
    onSaved,
    onCancel,
}: ModEditorProps): ReactElement => {
    const messages = messagesFor(pageLocale()).catalogEditor;
    const noun = pageLocale() === "nb" ? "mod" : "mod";
    const [draft, setDraft] = useState<EditorDraft>(() => initialDraft(mode));
    const [error, setError] = useState<string>();
    const setField = <Key extends keyof EditorDraft>(field: Key, value: EditorDraft[Key]): void => {
        setDraft((current) => ({ ...current, [field]: value }));
        setError(undefined);
    };
    const submit = (event: FormEvent): void => {
        event.preventDefault();
        const validation = validateCustomMod({
            id: draft.id,
            manufacturer: draft.manufacturer.trim() === "" ? null : draft.manufacturer,
            model: draft.model,
            variant: draft.variant.trim() === "" ? undefined : draft.variant,
            weightGrams: optionalNumber(draft.weightGrams),
            basedOnPresetId: draft.basedOnPresetId === "" ? undefined : draft.basedOnPresetId,
            maximumOutputVoltageVolts: Number(draft.maximumOutputVoltageVolts),
            maximumOutputPowerWatts: Number(draft.maximumOutputPowerWatts),
            maximumOutputCurrentAmps: Number(draft.maximumOutputCurrentAmps),
            minimumAtomizerResistanceOhms: optionalNumber(draft.minimumAtomizerResistanceOhms),
            maximumAtomizerResistanceOhms: optionalNumber(draft.maximumAtomizerResistanceOhms),
            ...(draft.clonedFrom === undefined ? {} : { clonedFrom: draft.clonedFrom }),
            ...(draft.operatingFeatures === undefined ? {} : { operatingFeatures: draft.operatingFeatures }),
        }, defaultMods);
        if (validation.kind === "invalid") {
            setError(catalogErrorFor(pageLocale(), validation.message));
            return;
        }
        const result = onSave(validation.mod);
        if (result.kind !== "success") {
            setError(catalogErrorFor(pageLocale(),
                result.kind === "blocked" ? "The mod is currently in use." : result.message));
            return;
        }
        onSaved(messages.saved(noun));
    };

    return <form className="catalog-editor mod-editor" onSubmit={submit}>
        <header className="catalog-editor__header">
            <div>
                <p className="eyebrow">{mode.kind === "edit" ? messages.editCustom(noun) : messages.newCustom(noun)}</p>
                <h3>{mode.kind === "clone" ? messages.clone(mode.source.displayName) : mode.kind === "edit"
                    ? mode.source.displayName : messages.properties(pageLocale() === "nb" ? "Mod" : "Mod")}</h3>
            </div>
        </header>
        {error && <p className="catalog-manager__message catalog-manager__message--error" role="alert">
            {error}
        </p>}
        <div className="catalog-editor__grid">
            <label><span>{messages.manufacturer}</span><input value={draft.manufacturer} placeholder={messages.unknown}
                onChange={(event) => setField("manufacturer", event.target.value)} /></label>
            <label><span>{messages.model}</span><input value={draft.model} required
                onChange={(event) => setField("model", event.target.value)} /></label>
            <label><span>{messages.variant}</span><input value={draft.variant} placeholder={messages.optional}
                onChange={(event) => setField("variant", event.target.value)} /></label>
            <label><span>{messages.weightGrams}</span><span className="catalog-editor__input">
                <input aria-label={messages.weightGrams} type="number" min="0" step="0.01"
                    value={draft.weightGrams} placeholder={messages.optional}
                    onChange={(event) => setField("weightGrams", weightInputValue(event.target.value))} />
                </span></label>
            <label><span>{messages.basedOnPreset}</span><select aria-label={messages.basedOnPreset}
                value={draft.basedOnPresetId}
                onChange={(event) => setField("basedOnPresetId", event.target.value)}>
                <option value="">{messages.none}</option>
                {defaultMods.map((mod) => <option key={mod.id} value={mod.id}>{mod.displayName}</option>)}
            </select></label>
            <label><span>{messages.maxOutputVoltage}</span><span className="catalog-editor__input">
                <input aria-label={messages.maxOutputVoltage} type="number" min="0.1" step="0.1"
                    value={draft.maximumOutputVoltageVolts} required
                    onChange={(event) => setField("maximumOutputVoltageVolts", event.target.value)} />
                </span></label>
            <label><span>{messages.maxOutputPower}</span><span className="catalog-editor__input">
                <input aria-label={messages.maxOutputPower} type="number" min="1" step="1"
                    value={draft.maximumOutputPowerWatts} required
                    onChange={(event) => setField("maximumOutputPowerWatts", event.target.value)} />
                </span></label>
            <label><span>{messages.maxOutputCurrent}</span><span className="catalog-editor__input">
                <input aria-label={messages.maxOutputCurrent} type="number" min="0.1" step="0.1"
                    value={draft.maximumOutputCurrentAmps} required
                    onChange={(event) => setField("maximumOutputCurrentAmps", event.target.value)} />
                </span></label>
            <label><span>{messages.minAtomizerResistance}</span><span className="catalog-editor__input">
                <input aria-label={messages.minAtomizerResistance} type="number" min="0.05" step="0.05"
                    value={draft.minimumAtomizerResistanceOhms} placeholder={messages.optional}
                    onChange={(event) => setField("minimumAtomizerResistanceOhms", event.target.value)} />
                </span></label>
            <label><span>{messages.maxAtomizerResistance}</span><span className="catalog-editor__input">
                <input aria-label={messages.maxAtomizerResistance} type="number" min="0.05" step="0.05"
                    value={draft.maximumAtomizerResistanceOhms} placeholder={messages.optional}
                    onChange={(event) => setField("maximumAtomizerResistanceOhms", event.target.value)} />
                </span></label>
        </div>
        <div className="catalog-editor__actions">
            <button type="submit" className="catalog-manager__primary">{messages.save(noun)}</button>
            <button type="button" className="catalog-manager__quiet" onClick={onCancel}>{messages.cancel}</button>
        </div>
    </form>;
};
