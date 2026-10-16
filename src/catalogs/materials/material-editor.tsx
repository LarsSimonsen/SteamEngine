import { catalogErrorFor } from "../../i18n/catalog-errors";
import { useState, type FormEvent, type ReactElement } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRemove } from "@fortawesome/free-solid-svg-icons";
import type { CustomMaterial, DefaultMaterial, Material, TemperaturePoint } from "./catalog";
import type { MaterialRepositoryResult } from "./repository";
import { validateCustomMaterial } from "./validation";
import { messagesFor } from "../../i18n/messages";
import { pageLocale } from "../../i18n/page-locale";

type TemperatureModel = "none" | "tcr" | "tfr";

type TfrDraftRow = {
    readonly id: number;
    readonly temperature: string;
    readonly factor: string;
};

export type MaterialEditorMode =
    | { readonly kind: "create" }
    | { readonly kind: "clone"; readonly source: DefaultMaterial }
    | { readonly kind: "edit"; readonly source: CustomMaterial };

export type MaterialEditorProps = {
    readonly mode: MaterialEditorMode;
    readonly defaultMaterials: readonly DefaultMaterial[];
    readonly onSave: (material: CustomMaterial) => MaterialRepositoryResult;
    readonly onSaved: (message: string) => void;
    readonly onCancel: () => void;
};

type EditorDraft = {
    readonly id: string;
    readonly name: string;
    readonly resistivity: string;
    readonly heatCapacity: string;
    readonly density: string;
    readonly temperatureModel: TemperatureModel;
    readonly tcr: string;
    readonly tfr: readonly TfrDraftRow[];
    readonly clonedFrom?: string;
};

let rowId = 0;
const makeRow = (temperature = "", factor = ""): TfrDraftRow => ({
    id: ++rowId,
    temperature,
    factor,
});

const newMaterialId = (): string => globalThis.crypto?.randomUUID?.()
    ?? `custom-${Date.now()}-${Math.random().toString(16).slice(2)}`;

const rowsFor = (points: readonly TemperaturePoint[] | undefined): readonly TfrDraftRow[] =>
    points?.map(([temperature, factor]) => makeRow(String(temperature), String(factor)))
    ?? [makeRow("20", "1"), makeRow("100", "")];

const initialDraft = (mode: MaterialEditorMode): EditorDraft => {
    if (mode.kind === "create") {
        return {
            id: newMaterialId(),
            name: "",
            resistivity: "",
            heatCapacity: "",
            density: "",
            temperatureModel: "none",
            tcr: "",
            tfr: rowsFor(undefined),
        };
    }
    const source: Material = mode.source;
    const temperatureModel: TemperatureModel = source.tfr
        ? "tfr"
        : source.tcr !== undefined
            ? "tcr"
            : "none";
    return {
        id: mode.kind === "clone" ? newMaterialId() : source.id,
        name: mode.kind === "clone" ? `${source.name} copy` : source.name,
        resistivity: String(source.resistivity),
        heatCapacity: source.heatCapacity === null ? "" : String(source.heatCapacity),
        density: source.density === null ? "" : String(source.density),
        temperatureModel,
        tcr: temperatureModel === "tcr" ? String(source.tcr) : "",
        tfr: rowsFor(temperatureModel === "tfr" ? source.tfr : undefined),
        ...(mode.kind === "clone"
            ? { clonedFrom: source.id }
            : mode.source.clonedFrom === undefined
                ? {}
                : { clonedFrom: mode.source.clonedFrom }),
    };
};

const optionalNumber = (raw: string): number | null => raw.trim() === "" ? null : Number(raw);

export const MaterialEditor = ({
    mode,
    defaultMaterials,
    onSave,
    onSaved,
    onCancel,
}: MaterialEditorProps): ReactElement => {
    const messages = messagesFor(pageLocale()).catalogEditor;
    const noun = pageLocale() === "nb" ? "materiale" : "material";
    const [draft, setDraft] = useState<EditorDraft>(() => initialDraft(mode));
    const [error, setError] = useState<string>();
    const setField = <Key extends keyof EditorDraft>(field: Key, value: EditorDraft[Key]): void => {
        setDraft((current) => ({ ...current, [field]: value }));
        setError(undefined);
    };
    const updateRow = (id: number, field: "temperature" | "factor", value: string): void => {
        setField("tfr", draft.tfr.map((row) => row.id === id ? { ...row, [field]: value } : row));
    };
    const submit = (event: FormEvent): void => {
        event.preventDefault();
        const temperatureData = draft.temperatureModel === "tcr"
            ? { tcr: Number(draft.tcr) }
            : draft.temperatureModel === "tfr"
                ? { tfr: draft.tfr.map((row) => [Number(row.temperature), Number(row.factor)]) }
                : {};
        const validation = validateCustomMaterial({
            id: draft.id,
            name: draft.name,
            resistivity: Number(draft.resistivity),
            heatCapacity: optionalNumber(draft.heatCapacity),
            density: optionalNumber(draft.density),
            ...temperatureData,
            ...(draft.clonedFrom === undefined ? {} : { clonedFrom: draft.clonedFrom }),
        }, defaultMaterials);
        if (validation.kind === "invalid") {
            setError(catalogErrorFor(pageLocale(), validation.message));
            return;
        }
        const result = onSave(validation.material);
        if (result.kind !== "success") {
            setError(catalogErrorFor(pageLocale(),
                result.kind === "blocked" ? "The material is currently in use." : result.message));
            return;
        }
        const normalization = validation.normalizationMethod === "interpolated"
            ? messages.normalizationInterpolated
            : validation.normalizationMethod === "extrapolated"
                ? messages.normalizationExtrapolated
                : validation.normalizationMethod === "existing"
                    ? messages.normalizationExisting
                    : "";
        onSaved(`${messages.saved(noun)}${normalization}`);
    };

    return <form className="catalog-editor" onSubmit={submit}>
        <header className="catalog-editor__header">
            <div>
                <p className="eyebrow">{mode.kind === "edit" ? messages.editCustom(noun) : messages.newCustom(noun)}</p>
                <h3>{mode.kind === "clone" ? messages.clone(mode.source.name) : mode.kind === "edit"
                    ? mode.source.name : messages.properties("Material")}</h3>
            </div>
        </header>
        {error && <p className="catalog-manager__message catalog-manager__message--error" role="alert">{error}</p>}
        <div className="catalog-editor__grid">
            <label><span>{messages.name}</span><input value={draft.name} required
                onChange={(event) => setField("name", event.target.value)} /></label>
            <label><span>{messages.resistivity}</span><span className="catalog-editor__input"><input type="number" min="0"
                step="any" value={draft.resistivity} required
                onChange={(event) => setField("resistivity", event.target.value)} /></span></label>
            <label><span>{messages.heatCapacity}</span><span className="catalog-editor__input"><input type="number" min="0"
                step="any" value={draft.heatCapacity} placeholder={messages.unknown}
                onChange={(event) => setField("heatCapacity", event.target.value)} /></span></label>
            <label><span>{messages.density}</span><span className="catalog-editor__input"><input type="number" min="0"
                step="any" value={draft.density} placeholder={messages.unknown}
                onChange={(event) => setField("density", event.target.value)} /></span></label>
        </div>
        <fieldset className="catalog-editor__temperature">
            <legend>{messages.temperatureModel}</legend>
            <div className="catalog-editor__choices">
                {(["none", "tcr", "tfr"] as const).map((model) => <label key={model}>
                    <input type="radio" name="temperature-model" value={model}
                        checked={draft.temperatureModel === model}
                        onChange={() => setField("temperatureModel", model)} />
                    {model === "none" ? messages.noTemperatureData : model.toUpperCase()}
                </label>)}
            </div>
            {draft.temperatureModel === "tcr" && <label className="catalog-editor__tcr"><span>{messages.tcrPerDegree}</span>
                <span className="catalog-editor__input"><input type="number" min="0" step="any" value={draft.tcr}
                    onChange={(event) => setField("tcr", event.target.value)} /></span></label>}
            {draft.temperatureModel === "tfr" && <div className="catalog-editor__tfr">
                <div className="catalog-editor__tfr-head"><span>{messages.temperature}</span>
                    <span>{messages.resistanceFactor}</span><span /></div>
                {draft.tfr.map((row) => <div className="catalog-editor__tfr-row" key={row.id}>
                    <input aria-label={messages.temperature} type="number" step="any" value={row.temperature}
                        onChange={(event) => updateRow(row.id, "temperature", event.target.value)} />
                    <input aria-label={messages.resistanceFactor} type="number" min="0" step="any" value={row.factor}
                        onChange={(event) => updateRow(row.id, "factor", event.target.value)} />
                    <button type="button" className="catalog-manager__quiet" title={messages.removeTfrPoint} aria-label={messages.removeTfrPoint}
                        disabled={draft.tfr.length <= 2}
                        onClick={() => setField("tfr", draft.tfr.filter((candidate) => candidate.id !== row.id))}>
                        <FontAwesomeIcon icon={faRemove} aria-hidden="true" />
                    </button>
                </div>)}
                <button type="button" className="catalog-manager__quiet"
                    onClick={() => setField("tfr", [...draft.tfr, makeRow()])}>{messages.addTfrPoint}</button>
                <p>{messages.normalizationHelp}</p>
            </div>}
        </fieldset>
        <div className="catalog-editor__actions">
            <button type="submit" className="catalog-manager__primary">{messages.save(noun)}</button>
            <button type="button" className="catalog-manager__quiet" onClick={onCancel}>{messages.cancel}</button>
        </div>
    </form>;
};
