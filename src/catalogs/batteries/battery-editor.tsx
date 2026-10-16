import { catalogErrorFor } from "../../i18n/catalog-errors";
import { useState, type FormEvent, type ReactElement } from "react";
import type { Battery, CustomBattery, DefaultBattery } from "./catalog";
import type { BatteryRepositoryResult } from "./repository";
import { validateCustomBattery } from "./validation";
import type { BatteryAccess } from "./form-factor";
import { messagesFor } from "../../i18n/messages";
import { pageLocale } from "../../i18n/page-locale";

export type BatteryEditorMode =
    | { readonly kind: "create" }
    | { readonly kind: "clone"; readonly source: DefaultBattery }
    | { readonly kind: "edit"; readonly source: CustomBattery };

export type BatteryEditorProps = {
    readonly mode: BatteryEditorMode;
    readonly defaultBatteries: readonly DefaultBattery[];
    readonly onSave: (battery: CustomBattery) => BatteryRepositoryResult;
    readonly onSaved: (message: string) => void;
    readonly onCancel: () => void;
};

type FormFactorKind = "" | "cylindrical" | "prismatic";
type ProtectedStatus = "unknown" | "protected" | "unprotected";

type EditorDraft = {
    readonly id: string;
    readonly manufacturer: string;
    readonly model: string;
    readonly weightGrams: string;
    readonly batteryAccess: BatteryAccess;
    readonly formFactorKind: FormFactorKind;
    readonly sizeCode: string;
    readonly nominalDiameterMm: string;
    readonly nominalLengthMm: string;
    readonly terminalStyle: "" | "flat-top" | "button-top";
    readonly lengthMm: string;
    readonly widthMm: string;
    readonly thicknessMm: string;
    readonly protectedStatus: ProtectedStatus;
    readonly wrapperColor: string;
    readonly markings: string;
    readonly ratedCapacityMah: string;
    readonly continuousDischargeCurrentAmps: string;
    readonly continuousDischargeCRating: string;
    readonly nominalVoltageVolts: string;
    readonly safetyWarning: string;
    readonly dataNote: string;
    readonly clonedFrom?: string;
};

const newBatteryId = (): string => globalThis.crypto?.randomUUID?.()
    ?? `custom-${Date.now()}-${Math.random().toString(16).slice(2)}`;

const initialDraft = (mode: BatteryEditorMode): EditorDraft => {
    const source: Battery | undefined = mode.kind === "create" ? undefined : mode.source;
    const formFactor = source?.formFactor;
    const protectedStatus: ProtectedStatus = source?.protected === undefined
        ? "unknown" : source.protected ? "protected" : "unprotected";
    return {
        id: mode.kind === "edit" ? mode.source.id : newBatteryId(),
        manufacturer: source?.manufacturer ?? "",
        model: source ? mode.kind === "clone" ? `${source.model} copy` : source.model : "",
        weightGrams: weightDraftValue(source?.weightGrams),
        batteryAccess: source?.batteryAccess ?? "removable",
        formFactorKind: formFactor?.kind ?? "",
        sizeCode: formFactor?.kind === "cylindrical" ? formFactor.sizeCode ?? "" : "",
        nominalDiameterMm: formFactor?.kind === "cylindrical" ? String(formFactor.nominalDiameterMm) : "",
        nominalLengthMm: formFactor?.kind === "cylindrical" ? String(formFactor.nominalLengthMm) : "",
        terminalStyle: formFactor?.kind === "cylindrical" ? formFactor.terminalStyle ?? "" : "",
        lengthMm: formFactor?.kind === "prismatic" ? String(formFactor.lengthMm) : "",
        widthMm: formFactor?.kind === "prismatic" ? String(formFactor.widthMm) : "",
        thicknessMm: formFactor?.kind === "prismatic" ? String(formFactor.thicknessMm) : "",
        protectedStatus,
        wrapperColor: source?.appearance?.wrapperColor ?? "",
        markings: source?.appearance?.markings?.map((marking) => marking.text).join("\n") ?? "",
        ratedCapacityMah: source ? String(source.ratedCapacityMah) : "",
        continuousDischargeCurrentAmps: source?.continuousDischargeCurrentAmps === undefined
            ? "" : String(source.continuousDischargeCurrentAmps),
        continuousDischargeCRating: source?.continuousDischargeCRating === undefined
            ? "" : String(source.continuousDischargeCRating),
        nominalVoltageVolts: source?.nominalVoltageVolts === undefined
            ? "" : String(source.nominalVoltageVolts),
        safetyWarning: source?.safetyWarning ?? "",
        dataNote: source?.dataNote ?? "",
        ...(mode.kind === "clone" ? { clonedFrom: source?.id } : mode.kind === "edit"
            && mode.source.clonedFrom !== undefined ? { clonedFrom: mode.source.clonedFrom } : {}),
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

const optionalText = (value: string): string | undefined =>
    value.trim() === "" ? undefined : value;

const formFactorFromDraft = (draft: EditorDraft): Record<string, unknown> | null | undefined => {
    if (draft.batteryAccess === "integrated") return null;
    if (draft.formFactorKind === "cylindrical") {
        return {
            kind: "cylindrical",
            sizeCode: optionalText(draft.sizeCode),
            nominalDiameterMm: Number(draft.nominalDiameterMm),
            nominalLengthMm: Number(draft.nominalLengthMm),
            terminalStyle: optionalText(draft.terminalStyle),
        };
    }
    if (draft.formFactorKind === "prismatic") {
        return {
            kind: "prismatic",
            lengthMm: Number(draft.lengthMm),
            widthMm: Number(draft.widthMm),
            thicknessMm: Number(draft.thicknessMm),
        };
    }
    return undefined;
};

const appearanceFromDraft = (draft: EditorDraft): Record<string, unknown> | undefined => {
    const wrapperColor = optionalText(draft.wrapperColor);
    const markings = draft.markings.split("\n")
        .map((text) => text.trim())
        .filter(Boolean)
        .map((text) => ({ location: "wrapper", text }));
    return wrapperColor === undefined && markings.length === 0
        ? undefined
        : { wrapperColor, markings };
};

export const BatteryEditor = ({
    mode,
    defaultBatteries,
    onSave,
    onSaved,
    onCancel,
}: BatteryEditorProps): ReactElement => {
    const messages = messagesFor(pageLocale()).catalogEditor;
    const noun = pageLocale() === "nb" ? "batteri" : "battery";
    const [draft, setDraft] = useState<EditorDraft>(() => initialDraft(mode));
    const [error, setError] = useState<string>();
    const setField = <Key extends keyof EditorDraft>(field: Key, value: EditorDraft[Key]): void => {
        setDraft((current) => ({ ...current, [field]: value }));
        setError(undefined);
    };
    const submit = (event: FormEvent): void => {
        event.preventDefault();
        const formFactor = formFactorFromDraft(draft);
        const appearance = appearanceFromDraft(draft);
        const validation = validateCustomBattery({
            id: draft.id,
            manufacturer: draft.manufacturer,
            model: draft.model,
            weightGrams: optionalNumber(draft.weightGrams),
            batteryAccess: draft.batteryAccess,
            formFactor,
            protected: draft.protectedStatus === "unknown" ? undefined : draft.protectedStatus === "protected",
            appearance,
            ratedCapacityMah: Number(draft.ratedCapacityMah),
            continuousDischargeCurrentAmps: optionalNumber(draft.continuousDischargeCurrentAmps),
            continuousDischargeCRating: optionalNumber(draft.continuousDischargeCRating),
            nominalVoltageVolts: optionalNumber(draft.nominalVoltageVolts),
            safetyWarning: optionalText(draft.safetyWarning),
            dataNote: optionalText(draft.dataNote),
            ...(draft.clonedFrom === undefined ? {} : { clonedFrom: draft.clonedFrom }),
        }, defaultBatteries);
        if (validation.kind === "invalid") {
            setError(catalogErrorFor(pageLocale(), validation.message));
            return;
        }
        const result = onSave(validation.battery);
        if (result.kind !== "success") {
            setError(catalogErrorFor(pageLocale(),
                result.kind === "blocked" ? "The battery is currently in use." : result.message));
            return;
        }
        onSaved(messages.saved(noun));
    };

    return <form className="catalog-editor battery-editor" onSubmit={submit}>
        <header className="catalog-editor__header">
            <div>
                <p className="eyebrow">{mode.kind === "edit" ? messages.editCustom(noun) : messages.newCustom(noun)}</p>
                <h3>{mode.kind === "clone" ? messages.clone(mode.source.displayName) : mode.kind === "edit"
                    ? mode.source.displayName : messages.properties(pageLocale() === "nb" ? "Batteri" : "Battery")}</h3>
            </div>
        </header>
        {error && <p className="catalog-manager__message catalog-manager__message--error" role="alert">
            {error}
        </p>}
        <div className="catalog-editor__grid">
            <label><span>{messages.manufacturer}</span><input aria-label={messages.manufacturer} value={draft.manufacturer} required
                onChange={(event) => setField("manufacturer", event.target.value)} /></label>
            <label><span>{messages.model}</span><input aria-label={messages.model} value={draft.model} required
                onChange={(event) => setField("model", event.target.value)} /></label>
            <label><span>{messages.weightGrams}</span><span className="catalog-editor__input">
                <input aria-label={messages.weightGrams} type="number" min="0" step="0.01"
                    value={draft.weightGrams} placeholder={messages.optional}
                    onChange={(event) => setField("weightGrams", weightInputValue(event.target.value))} />
            </span></label>
            <label><span>{messages.batteryAccess}</span><select aria-label={messages.batteryAccess} value={draft.batteryAccess} required
                onChange={(event) => setField("batteryAccess", event.target.value as BatteryAccess)}>
                <option value="removable">{messages.removableCell}</option>
                <option value="integrated">{messages.integratedMod}</option>
            </select></label>
            <label><span>{messages.formFactor}</span><select aria-label={messages.formFactor} value={draft.formFactorKind}
                required={draft.batteryAccess !== "integrated"} disabled={draft.batteryAccess === "integrated"}
                onChange={(event) => setField("formFactorKind", event.target.value as FormFactorKind)}>
                <option value="">{draft.batteryAccess === "integrated" ? messages.notApplicable : messages.selectFormFactor}</option>
                <option value="cylindrical">{messages.cylindrical}</option>
                <option value="prismatic">{messages.prismatic}</option>
            </select></label>
            {draft.formFactorKind === "cylindrical" && <>
                <label><span>{messages.sizeCode}</span><input aria-label={messages.sizeCode} value={draft.sizeCode}
                    placeholder={messages.sizeCodePlaceholder ?? "Optional, e.g. 18650"}
                    onChange={(event) => setField("sizeCode", event.target.value)} /></label>
                <label><span>{messages.nominalDiameter}</span><span className="catalog-editor__input">
                    <input aria-label={messages.nominalDiameter} type="number" min="0" step="any"
                        value={draft.nominalDiameterMm} required
                        onChange={(event) => setField("nominalDiameterMm", event.target.value)} />
                </span></label>
                <label><span>{messages.nominalLength}</span><span className="catalog-editor__input">
                    <input aria-label={messages.nominalLength} type="number" min="0" step="any"
                        value={draft.nominalLengthMm} required
                        onChange={(event) => setField("nominalLengthMm", event.target.value)} />
                </span></label>
                <label><span>{messages.terminalStyle}</span><select aria-label={messages.terminalStyle} value={draft.terminalStyle}
                    onChange={(event) => setField("terminalStyle", event.target.value as EditorDraft["terminalStyle"])}>
                    <option value="">{messages.unknown}</option>
                    <option value="flat-top">{messages.flatTop}</option>
                    <option value="button-top">{messages.buttonTop}</option>
                </select></label>
            </>}
            {draft.formFactorKind === "prismatic" && <>
                <label><span>{messages.length}</span><span className="catalog-editor__input">
                    <input aria-label={messages.length} type="number" min="0" step="any" value={draft.lengthMm} required
                        onChange={(event) => setField("lengthMm", event.target.value)} />
                </span></label>
                <label><span>{messages.width}</span><span className="catalog-editor__input">
                    <input aria-label={messages.width} type="number" min="0" step="any" value={draft.widthMm} required
                        onChange={(event) => setField("widthMm", event.target.value)} />
                </span></label>
                <label><span>{messages.thickness}</span><span className="catalog-editor__input">
                    <input aria-label={messages.thickness} type="number" min="0" step="any" value={draft.thicknessMm}
                        required onChange={(event) => setField("thicknessMm", event.target.value)} />
                </span></label>
            </>}
            <label><span>{messages.protectedStatus}</span><select aria-label={messages.protectedStatus} value={draft.protectedStatus}
                onChange={(event) => setField("protectedStatus", event.target.value as ProtectedStatus)}>
                <option value="unknown">{messages.unknown}</option>
                <option value="protected">{messages.protectedCell}</option>
                <option value="unprotected">{messages.unprotectedCell}</option>
            </select></label>
            <label><span>{messages.wrapperColor}</span><input aria-label={messages.wrapperColor} value={draft.wrapperColor}
                placeholder={messages.wrapperColorPlaceholder ?? "Optional, descriptive"}
                onChange={(event) => setField("wrapperColor", event.target.value)} /></label>
            <label><span>{messages.markings}</span><textarea aria-label={messages.markings} value={draft.markings} rows={3}
                placeholder={messages.markingsPlaceholder ?? "Optional; one wrapper marking per line"}
                onChange={(event) => setField("markings", event.target.value)} /></label>
            <label><span>{messages.ratedCapacity}</span><span className="catalog-editor__input">
                <input aria-label={messages.ratedCapacity} type="number" min="0" step="any"
                    value={draft.ratedCapacityMah} required
                    onChange={(event) => setField("ratedCapacityMah", event.target.value)} />
            </span></label>
            <label><span>{messages.continuousCurrent}</span><span className="catalog-editor__input">
                <input aria-label={messages.continuousCurrent} type="number" min="0.1" step="0.1"
                    value={draft.continuousDischargeCurrentAmps}
                    placeholder={messages.currentWithCRatingPlaceholder ?? "Optional when C rating is set"}
                    onChange={(event) => setField("continuousDischargeCurrentAmps", event.target.value)} />
            </span></label>
            <label><span>{messages.continuousC}</span><span className="catalog-editor__input">
                <input aria-label={messages.continuousC} type="number" min="0" step="any"
                    value={draft.continuousDischargeCRating}
                    placeholder={messages.cRatingWithCurrentPlaceholder ?? "Optional when current is set"}
                    onChange={(event) => setField("continuousDischargeCRating", event.target.value)} />
            </span></label>
            <label><span>{messages.nominalVoltage}</span><span className="catalog-editor__input">
                <input aria-label={messages.nominalVoltage} type="number" min="0.1" step="0.1"
                    value={draft.nominalVoltageVolts}
                    placeholder={messages.optional}
                    onChange={(event) => setField("nominalVoltageVolts", event.target.value)} />
            </span></label>
            <label><span>{messages.safetyWarning}</span><textarea value={draft.safetyWarning} rows={3}
                placeholder={messages.optional}
                onChange={(event) => setField("safetyWarning", event.target.value)} /></label>
            <label><span>{messages.dataNote}</span><textarea value={draft.dataNote} rows={3} placeholder={messages.optional}
                onChange={(event) => setField("dataNote", event.target.value)} /></label>
        </div>
        <p className="catalog-editor__help">{messages.batteryHelp}</p>
        <div className="catalog-editor__actions">
            <button type="submit" className="catalog-manager__primary">{messages.save(noun)}</button>
            <button type="button" className="catalog-manager__quiet" onClick={onCancel}>{messages.cancel}</button>
        </div>
    </form>;
};
