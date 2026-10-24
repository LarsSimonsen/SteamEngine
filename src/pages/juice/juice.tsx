import { useEffect, useMemo, useRef, useState, type ReactElement } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCheck,
    faCaretDown,
    faFloppyDisk,
    faFolderOpen,
    faPlus,
    faRotateLeft,
    faTrash,
    faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import {
    cloneSettings,
    defaultSettings,
    fromLegacyExport,
    legacyRound,
    type IngredientTable,
    type JuiceCalculation,
    type JuiceSettings,
} from "./domain";
import { calculateJuiceFromApi } from "./api";
import { createDebouncedRequest, debouncedRequestSuperseded } from "../../shared/debounced-request";
import "../../shared/styles/foundation.css";
import { SiteLayout } from "../../shared/ui/site-layout";
import { NumericField } from "../../shared/ui/form-fields";
import { NumericDraftReset, NumericInput } from "../../shared/ui/numeric-input";
import { CalculatorLegacyNote, CalculatorPageHeader } from "../../shared/ui/calculator-page-header";
import { ResultAnnouncement, resultSummary } from "../../shared/ui/result-announcement";
import { TransientMessage, useTransientMessage } from "../../shared/ui/transient-message";
import { useStickyScrollPadding } from "../../shared/ui/sticky-scroll-padding";
import { calculatorMessagesFor, type CalculatorRouteMessages } from "../../i18n/calculator-messages";
import { pageLocale } from "../../i18n/page-locale";
import "./juice.css";

const storageKey = "steamengine.juice.settings.v1";
const legacyCookieKey = "steamengine-ej2";

const emptyTable: IngredientTable = { rows: [], totalVolume: 0, totalWeight: 0, density: 0 };
const emptyCalculation = (): JuiceCalculation => ({
    nicBase: emptyTable,
    target: emptyTable,
    recipe: emptyTable,
    canMix: true,
    targetNicotineWarning: false,
});

type Drafts = {
    readonly batchSize: string;
    readonly baseStrength: string;
    readonly basePg: string;
    readonly baseVg: string;
    readonly targetStrength: string;
    readonly targetPg: string;
    readonly targetVg: string;
};

type FlavorDraft = {
    readonly id: number;
    readonly nm: string;
    readonly percentage: string;
    readonly vg: boolean;
};

const parseNumber = (value: string): number => Number.parseFloat(value.replace(",", "."));

const draftValues = (settings: JuiceSettings): Drafts => ({
    batchSize: String(settings.batchSize),
    baseStrength: String(settings.baseStrength * 10),
    basePg: String(settings.basePg),
    baseVg: String(100 - settings.basePg),
    targetStrength: String(settings.targetStrength * 10),
    targetPg: String(settings.targetPg),
    targetVg: String(100 - settings.targetPg),
});

const validFlavorSettings = (drafts: readonly FlavorDraft[]): JuiceSettings["flavors"] =>
    drafts.flatMap((draft) => {
        const percentage = parseNumber(draft.percentage);
        return draft.nm.trim() === "" || !Number.isFinite(percentage) || percentage < 0 || percentage > 100
            ? []
            : [{ nm: draft.nm, perc: percentage, vg: draft.vg }];
    });

const readCookie = (): string | undefined => {
    const prefix = `${encodeURIComponent(legacyCookieKey)}=`;
    for (const cookie of document.cookie.split(";")) {
        const trimmed = cookie.trim();
        if (trimmed.startsWith(prefix)) return decodeURIComponent(trimmed.slice(prefix.length));
    }
    return undefined;
};

const readStoredSettings = (): JuiceSettings | null => {
    try {
        const saved = localStorage.getItem(storageKey);
        if (saved) {
            const parsed: unknown = JSON.parse(saved);
            if (parsed && typeof parsed === "object" && "version" in parsed && parsed.version === 1) {
                const migrated = fromLegacyExport(parsed);
                if (migrated) return migrated;
            }
        }
    } catch {
        // Continue to the legacy cookie reader.
    }
    try {
        const legacy = readCookie();
        return legacy ? fromLegacyExport(JSON.parse(legacy)) : null;
    } catch {
        return null;
    }
};

const writeStoredSettings = (settings: JuiceSettings): void => {
    localStorage.setItem(storageKey, JSON.stringify({ version: 1, ...settings }));
};

const DetailTable = ({ id, table, messages }: {
    readonly id: string;
    readonly table: IngredientTable;
    readonly messages: CalculatorRouteMessages;
}): ReactElement => (
    <div className="juice-details" id={id}>
        <table className="se-table">
            <thead><tr><th>{messages.ingredient}</th><th>{messages.ml}</th><th>{messages.grams}</th></tr></thead>
            <tbody>{table.rows.map((item, index) => (
                <RecipeRowView key={`${item.name}-${index}`} item={item} messages={messages} />
            ))}</tbody>
            <tfoot><tr><th>{messages.sum}</th>
                <th>{legacyRound(table.totalVolume)}</th><th>{legacyRound(table.totalWeight)}</th>
            </tr></tfoot>
        </table>
        <p>{messages.densityUnit} {legacyRound(table.density)} g/ml.</p>
    </div>
);

const recipeRowName = (item: IngredientTable["rows"][number], messages: CalculatorRouteMessages): string =>
    item.italic
        ? item.name
        : item.name === "Nicotine"
            ? messages.nicotine
            : item.name.startsWith("Nicotine base")
                ? item.name.replace("Nicotine base", messages.nicotineBaseIngredient)
                : item.name;

const RecipeRowView = ({ item, messages }: {
    readonly item: IngredientTable["rows"][number];
    readonly messages: CalculatorRouteMessages;
}): ReactElement => {
    const negative = item.volume < 0;
    const title = negative ? messages.negativeValue : undefined;
    const localizedName = recipeRowName(item, messages);
    return <tr>
        <td className={item.italic ? "juice-italic" : undefined}>{localizedName}</td>
        <td className={negative ? "juice-negative" : undefined} title={title}>{legacyRound(item.volume)}</td>
        <td className={negative ? "juice-negative" : undefined} title={title}>{legacyRound(item.weight)}</td>
    </tr>;
};

export const JuiceCalculator = (): ReactElement => {
    const [inputReset, setInputReset] = useState(0);
    const messages = calculatorMessagesFor(pageLocale()).juice;
    const nextFlavorId = useRef(0);
    const mixWarning = useRef<HTMLDivElement>(null);
    const createFlavorDraft = (flavor: JuiceSettings["flavors"][number]): FlavorDraft => ({
        id: nextFlavorId.current++,
        nm: flavor.nm,
        percentage: String(flavor.perc),
        vg: flavor.vg,
    });
    const [settings, setSettings] = useState<JuiceSettings>(() => cloneSettings(defaultSettings));
    const [drafts, setDrafts] = useState<Drafts>(() => draftValues(defaultSettings));
    const [flavorDrafts, setFlavorDrafts] = useState<readonly FlavorDraft[]>(() => [
        createFlavorDraft({ nm: "Flavor", perc: 0, vg: false }),
    ]);
    const [calculation, setCalculation] = useState<JuiceCalculation>(emptyCalculation);
    useStickyScrollPadding(mixWarning, !calculation.canMix);
    const debouncedCalculation = useMemo(() => createDebouncedRequest<JuiceCalculation>(200), []);
    useEffect(() => {
        void debouncedCalculation.schedule(() => calculateJuiceFromApi(settings))
            .then(setCalculation)
            .catch((error: unknown) => {
                if (error !== debouncedRequestSuperseded) return;
            });
        return () => debouncedCalculation.cancel();
    }, [debouncedCalculation, settings]);
    const [showBaseDetails, setShowBaseDetails] = useState(false);
    const [showTargetDetails, setShowTargetDetails] = useState(false);
    const [savedSettings, setSavedSettings] = useState<JuiceSettings | null>(() => readStoredSettings());
    const { message, showMessage, clearMessage } = useTransientMessage();
    const applySettings = (next: JuiceSettings): void => {
        setInputReset((revision) => revision + 1);
        const copy = cloneSettings(next);
        setSettings(copy);
        setDrafts(draftValues(copy));
        setFlavorDrafts(copy.flavors.length === 0
            ? [createFlavorDraft({ nm: "Flavor", perc: 0, vg: false })]
            : copy.flavors.map(createFlavorDraft));
    };

    const updateNumeric = (
        draftKey: keyof Drafts,
        field: "batchSize" | "baseStrength" | "targetStrength",
        value: string,
        divisor = 1,
    ): void => {
        setDrafts((current) => ({ ...current, [draftKey]: value }));
        const parsed = parseNumber(value);
        if (!Number.isFinite(parsed) || parsed < 0 || (field === "batchSize" && parsed === 0)) return;
        const normalized = Math.max(0, parsed);
        setSettings((current) => ({ ...current, [field]: normalized / divisor }));
    };

    const updateComposition = (
        draftKey: "basePg" | "targetPg",
        oppositeDraftKey: "baseVg" | "targetVg",
        field: "basePg" | "targetPg",
        value: string,
    ): void => {
        setDrafts((current) => ({ ...current, [draftKey]: value }));
        const parsed = parseNumber(value);
        if (!Number.isFinite(parsed) || parsed < 0 || parsed > 100) return;
        const normalized = Math.min(100, Math.max(0, parsed));
        setDrafts((current) => ({
            ...current,
            [draftKey]: value,
            [oppositeDraftKey]: String(100 - normalized),
        }));
        setSettings((current) => ({ ...current, [field]: normalized }));
    };

    const updateVgComposition = (
        draftKey: "baseVg" | "targetVg",
        oppositeDraftKey: "basePg" | "targetPg",
        field: "basePg" | "targetPg",
        value: string,
    ): void => {
        setDrafts((current) => ({ ...current, [draftKey]: value }));
        const parsed = parseNumber(value);
        if (!Number.isFinite(parsed) || parsed < 0 || parsed > 100) return;
        const vg = Math.min(100, Math.max(0, parsed));
        const pg = 100 - vg;
        setDrafts((current) => ({
            ...current,
            [draftKey]: value,
            [oppositeDraftKey]: String(pg),
        }));
        setSettings((current) => ({ ...current, [field]: pg }));
    };

    const updateFlavor = (
        index: number,
        change: { readonly nm?: string; readonly percentage?: string; readonly vg?: boolean },
    ): void => {
        const nextDrafts = [...flavorDrafts];
        nextDrafts[index] = {
            ...nextDrafts[index],
            ...change,
        };
        setFlavorDrafts(nextDrafts);
        setSettings((current) => ({ ...current, flavors: validFlavorSettings(nextDrafts) }));
    };

    const deleteFlavor = (index: number): void => {
        const nextDrafts = flavorDrafts.filter((_, itemIndex) => itemIndex !== index);
        setFlavorDrafts(nextDrafts);
        setSettings((current) => ({ ...current, flavors: validFlavorSettings(nextDrafts) }));
    };

    const addFlavor = (): void => {
        const nextName = `Flavor ${flavorDrafts.length + 1}`;
        const nextDrafts = [...flavorDrafts, createFlavorDraft({ nm: nextName, perc: 0, vg: false })];
        setFlavorDrafts(nextDrafts);
        setSettings((current) => ({ ...current, flavors: validFlavorSettings(nextDrafts) }));
    };

    const save = (): void => {
        try {
            writeStoredSettings(settings);
            setSavedSettings(cloneSettings(settings));
            showMessage(messages.saved);
        } catch {
            showMessage(messages.saveFailed);
        }
    };

    const load = (): void => {
        const saved = readStoredSettings();
        if (!saved) {
            showMessage(messages.noSaved);
            return;
        }
        applySettings(saved);
        setSavedSettings(cloneSettings(saved));
        showMessage(messages.loaded);
    };

    const reset = (): void => {
        applySettings(defaultSettings);
        showMessage(messages.defaultsRestored);
    };

    const settingsSignature = JSON.stringify(settings);
    const isSaved = savedSettings !== null && JSON.stringify(savedSettings) === settingsSignature;
    const isDefault = JSON.stringify(defaultSettings) === settingsSignature;

    return <NumericDraftReset.Provider value={inputReset}>
        <SiteLayout basePath="./" className="juice-app" currentRoute="juice" rootHref=".">
        <main id="main" className="page-content">
            <TransientMessage message={message} onDismiss={clearMessage} />
            <CalculatorPageHeader className="juice-page-header" eyebrow={messages.eyebrow}
                title={messages.title} description={messages.description}
                actions={<details className="se-menu"><summary>{messages.menu}
                    <FontAwesomeIcon icon={faCaretDown} aria-hidden="true" />
                </summary>
                        <div className="se-menu__items">
                            <button type="button" onClick={reset} disabled={isDefault}>
                                <FontAwesomeIcon icon={faRotateLeft} /> {messages.reset}
                            </button>
                            <button type="button" onClick={load} disabled={savedSettings === null || isSaved}>
                                <FontAwesomeIcon icon={faFolderOpen} /> {messages.load}
                            </button>
                            <button type="button" onClick={save} disabled={isSaved}>
                                <FontAwesomeIcon icon={faFloppyDisk} /> {messages.save}
                            </button>
                        </div>
                    </details>} />
            {/* The results status announces this; a second alert would repeat it. */}
            {!calculation.canMix && <div className="juice-mix-warning" ref={mixWarning}>
                <FontAwesomeIcon icon={faTriangleExclamation} aria-hidden="true" />
                <span>{messages.cannotMix}</span>
            </div>}
            <div className="juice-grid">
                <section className="se-card se-card--soft-shadow juice-panel juice-panel--primary juice-panel--batch"
                    aria-labelledby="juice-batch-title">
                    <h2 id="juice-batch-title">{messages.batch}</h2>
                    <NumericField fieldClassName="juice-field" inputWrapperClassName="juice-input-with-unit"
                        label={messages.amount} ariaLabel={`${messages.amount} mL`} value={drafts.batchSize}
                        unit="mL" unitTag="span" min="0.01" step="0.01"
                        onChange={(value) => updateNumeric("batchSize", "batchSize", value)} />
                </section>

                <section className="se-card se-card--soft-shadow juice-panel juice-panel--warning juice-panel--base"
                    aria-labelledby="juice-base-title">
                    <h2 id="juice-base-title">{messages.nicBase} <small>— {messages.baseLabel}</small></h2>
                    <NumericField fieldClassName="juice-field" inputWrapperClassName="juice-input-with-unit"
                        label={messages.nicStrength} ariaLabel={`${messages.nicStrength} mg/mL`}
                        value={drafts.baseStrength} unit="mg/mL" unitTag="span"
                        min="0" max="1000" step="any"
                        onChange={(value) => updateNumeric("baseStrength", "baseStrength", value, 10)} />
                    <CompositionFields messages={messages} prefix="base" pgValue={drafts.basePg}
                        vgValue={drafts.baseVg}
                        onPgChange={(value) => updateComposition("basePg", "baseVg", "basePg", value)}
                        onVgChange={(value) => updateVgComposition("baseVg", "basePg", "basePg", value)} />
                    <button className="se-button se-button--link juice-details-button" type="button"
                        aria-expanded={showBaseDetails} aria-controls="juice-base-details"
                        onClick={() => setShowBaseDetails((visible) => !visible)}>
                        {showBaseDetails ? messages.hideDetails : messages.showDetails}
                    </button>
                    {showBaseDetails && <DetailTable id="juice-base-details" table={calculation.nicBase}
                        messages={messages} />}
                </section>

                <section className="se-card se-card--soft-shadow juice-panel juice-panel--info juice-panel--target"
                    aria-labelledby="juice-target-title">
                    <h2 id="juice-target-title">{messages.target} <small>— {messages.targetLabel}</small></h2>
                    <NumericField fieldClassName="juice-field" inputWrapperClassName="juice-input-with-unit"
                        label={messages.nicStrength} ariaLabel={`${messages.nicStrength} mg/mL`}
                        value={drafts.targetStrength} unit="mg/mL" unitTag="span"
                        min="0" max="100" step="any"
                        onChange={(value) => updateNumeric("targetStrength", "targetStrength", value, 10)} />
                    <CompositionFields messages={messages} prefix="target" pgValue={drafts.targetPg}
                        vgValue={drafts.targetVg}
                        onPgChange={(value) => updateComposition("targetPg", "targetVg", "targetPg", value)}
                        onVgChange={(value) => updateVgComposition("targetVg", "targetPg", "targetPg", value)} />
                    <button className="se-button se-button--link juice-details-button" type="button"
                        aria-expanded={showTargetDetails} aria-controls="juice-target-details"
                        onClick={() => setShowTargetDetails((visible) => !visible)}>
                        {showTargetDetails ? messages.hideDetails : messages.showDetails}
                    </button>
                    {showTargetDetails && <DetailTable id="juice-target-details" table={calculation.target}
                        messages={messages} />}
                </section>

                <section className="se-card se-card--soft-shadow juice-panel juice-panel--success juice-panel--flavor"
                    aria-labelledby="juice-flavor-title">
                    <div className="se-split-heading se-split-heading--center juice-panel-heading">
                        <h2 id="juice-flavor-title">{messages.flavoring}</h2>
                        <button className="se-button se-button--link juice-link-button" type="button"
                            onClick={addFlavor}>
                            <FontAwesomeIcon icon={faPlus} /> {messages.add}
                        </button>
                    </div>
                    <div className="se-table-scroll juice-table-scroll">
                        <table className="se-table juice-flavor-table">
                        <thead><tr><th><span className="sr-only">{messages.remove}</span></th>
                        <th colSpan={2}><div className="juice-flavor-input-headings">
                            <span>{messages.flavor}</span><span>{messages.percentage}</span>
                        </div></th>
                        <th><span className="sr-only">{messages.vg} / {messages.pg}</span></th></tr></thead>
                        <tbody>{flavorDrafts.map((flavor, index) => <tr key={flavor.id}>
                            <td><button className="juice-icon-button" type="button"
                                aria-label={`${messages.delete} ${flavor.nm}`}
                                onClick={() => deleteFlavor(index)}><FontAwesomeIcon icon={faTrash} /></button></td>
                            <td colSpan={2}><div className="juice-flavor-input-group">
                                <input aria-label={`${messages.flavorName} ${index + 1}`} value={flavor.nm}
                                    onChange={(event) => updateFlavor(index, { nm: event.target.value })} />
                                <NumericInput aria-label={`${messages.flavorPercentage} ${index + 1}`}
                                    min="0" max="100" step="0.01" value={flavor.percentage}
                                    onChange={(event) => updateFlavor(index, {
                                        percentage: event.target.value,
                                    })} />
                            </div></td>
                            <td><fieldset className="juice-carrier-options">
                                <legend className="sr-only">{messages.vg} / {messages.pg}</legend>
                                <label className={flavor.vg ? "juice-carrier-option--selected" : undefined}>
                                    <input className="sr-only" type="radio" name={`flavor-carrier-${flavor.id}`}
                                    checked={flavor.vg}
                                    onChange={() => updateFlavor(index, { vg: true })} /> {messages.vg}</label>
                                <label className={!flavor.vg ? "juice-carrier-option--selected" : undefined}>
                                    <input className="sr-only" type="radio" name={`flavor-carrier-${flavor.id}`}
                                    checked={!flavor.vg}
                                    onChange={() => updateFlavor(index, { vg: false })} /> {messages.pg}</label>
                            </fieldset></td>
                        </tr>)}</tbody>
                        </table>
                    </div>
                </section>

                <section className="se-card se-card--soft-shadow juice-panel juice-panel--primary juice-recipe-panel"
                    aria-labelledby="juice-recipe-title">
                    <h2 id="juice-recipe-title">{messages.recipe}</h2>
                    <ResultAnnouncement summary={calculation.canMix
                        ? resultSummary(pageLocale(), calculation.recipe.rows.filter((item) => !item.italic).map(
                            (item) => `${recipeRowName(item, messages)} ${legacyRound(item.volume)} ${messages.ml}`))
                        : undefined} />
                    <div className="se-table-scroll juice-table-scroll">
                        <table className="se-table juice-recipe-table">
                        <thead><tr><th>{messages.addColumn}</th><th>{messages.ml}</th>
                            <th>{messages.grams}</th></tr></thead>
                        <tbody>{calculation.recipe.rows.map((item, index) => (
                            <RecipeRowView key={`${item.name}-${index}`} item={item} messages={messages} />
                        ))}</tbody>
                        <tfoot><tr><th>{messages.sum}</th>
                            <th>{legacyRound(calculation.recipe.totalVolume)}</th>
                            <th>{legacyRound(calculation.recipe.totalWeight)}</th>
                        </tr></tfoot>
                        </table>
                    </div>
                    <div className={calculation.canMix
                        ? "juice-status juice-status--ok"
                        : "juice-status juice-status--error"} role="status">
                        {calculation.canMix ? <><FontAwesomeIcon icon={faCheck} /> {messages.canMix}</> : <>
                            <FontAwesomeIcon icon={faTriangleExclamation} /> {messages.cannotMix} {messages.adjustMix}
                            {calculation.targetNicotineWarning && <span>
                                {messages.targetNicWarning}
                            </span>}
                        </>}
                    </div>
                </section>
            </div>
            <section className="juice-safety" id="juice-safety"><h2>{messages.safety}</h2>
                <p>{messages.safetyText}</p>
            </section>
            <CalculatorLegacyNote href="old/juice" />
        </main>
        </SiteLayout>
    </NumericDraftReset.Provider>;
};

type CompositionFieldsProps = {
    readonly messages: CalculatorRouteMessages;
    readonly prefix: string;
    readonly pgValue: string;
    readonly vgValue: string;
    readonly onPgChange: (value: string) => void;
    readonly onVgChange: (value: string) => void;
};

const CompositionFields = ({
    messages,
    prefix,
    pgValue,
    vgValue,
    onPgChange,
    onVgChange,
}: CompositionFieldsProps): ReactElement => (
    <div className="juice-composition"><span>{messages.ratio}</span>
        <label><NumericInput aria-label={`${prefix} ${messages.vg}`} min="0" max="100" step="any"
            value={vgValue}
            onChange={(event) => onVgChange(event.target.value)} /><span>% {messages.vg}</span></label>
        <label><NumericInput aria-label={`${prefix} ${messages.pg}`} min="0" max="100" step="any"
            value={pgValue}
            onChange={(event) => onPgChange(event.target.value)} /><span>% {messages.pg}</span></label>
    </div>
);
