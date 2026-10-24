import {
    useEffect,
    useMemo,
    useRef,
    useState,
    type ReactElement,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NumericDraftReset, NumericInput } from "../../shared/ui/numeric-input";
import {
    faDownload,
    faArrowDownUpAcrossLine,
    faCaretDown,
    faSliders,
    faFileImport,
    faPlus,
    faTrash,
    faRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import {
    compositeWireRules,
    defaultSettings,
    dna200FileName,
    wireChildren,
    wireTreeLimits,
    type CompositeWireKind,
    type CalculatedWire,
    type WireKind,
    type WireNode,
    type WizardSettings,
} from "./domain";
import {
    calculateWireWizard,
    emptyWireCalculation,
    type WireWizardApiResult,
} from "./api";
import type { EquivalentTemperatureResult } from "./domain";
import { createDebouncedRequest, debouncedRequestSuperseded } from "../../shared/debounced-request";
import {
    canWrapWireAtDepth,
    wireTreeReducer,
    type WireTreeAction,
} from "./tree-reducer";
import type { CustomMaterial, DefaultMaterial } from "../../catalogs/materials/catalog";
import { hasTemperatureData } from "../../catalogs/materials/temperature";
import { MaterialManager } from "../../catalogs/materials/material-manager";
import { createMaterialRepository } from "../../catalogs/materials/repository";
import { WireWizardGraph } from "./wirewiz-graph";
import "../../shared/styles/foundation.css";
import { useRepository } from "../../shared/hooks/use-repository";
import { CalculatorLegacyNote, CalculatorPageHeader } from "../../shared/ui/calculator-page-header";
import { CatalogSelectOptions } from "../../shared/ui/catalog-select-options";
import { EmbeddedConverter } from "../converter/embedded-converter";
import { SiteLayout } from "../../shared/ui/site-layout";
import { calculatorMessagesFor, type CalculatorRouteMessages } from "../../i18n/calculator-messages";
import { pageLocale } from "../../i18n/page-locale";
import { awgToMm, mmToAwg } from "../../shared/domain/wire-units";
import {
    celsiusToFahrenheit,
    fahrenheitToCelsius,
} from "../../shared/domain/temperature";
import {
    exportWizardDesign,
    importWizardDesign,
    loadWizardSettings,
    saveWizardSettings,
} from "./persistence";
import {
    parseTemperaturePointDraft,
    sameTemperaturePoints,
    type TemperaturePointIssue,
} from "./temperature-points";
import "./wirewiz.css";

type Tab = "tfr" | "graph" | "table" | "equivalents" | "dna";

const temperaturePointError = (
    issue: TemperaturePointIssue,
    messages: CalculatorRouteMessages,
): string => ({
    empty: messages.temperatureErrorEmpty,
    number: messages.temperatureErrorNumber,
    minimum: messages.temperatureErrorMinimum,
    maximum: messages.temperatureErrorMaximum,
    "absolute-zero": messages.temperatureErrorAbsoluteZero,
    duplicate: messages.temperatureErrorDuplicate,
    ascending: messages.temperatureErrorAscending,
})[issue];

const childRoleLabel = (
    kind: CompositeWireKind,
    index: number,
    messages: CalculatorRouteMessages,
): string => {
    if (kind === "parallel") return `${messages.parallel} ${index + 1}`;
    if (kind === "twisted") return messages.strandWire;
    if (kind === "clapton") return index === 0 ? "Core" : "Wrap";
    if (index === 0) return "Core (two identical wires)";
    if (index === 1) return "Primary wrap (one around each core)";
    return "Secondary wrap (around both cores)";
};

const materialIdsIn = (node: WireNode): string[] =>
    node.kind === "single"
        ? [node.materialId]
        : wireChildren(node).flatMap(materialIdsIn);

const makeDownload = (text: string, filename: string, type = "text/csv;charset=utf-8"): void => {
    const url = URL.createObjectURL(
        new Blob([text], { type }),
    );
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    anchor.click();
    URL.revokeObjectURL(url);
};

const formatResult = (value: number, decimals: number): string =>
    Number.isFinite(value) ? value.toFixed(decimals) : "—";

const formatAwg = (diameter: number): string =>
    Number.isFinite(diameter) && diameter > 0 ? mmToAwg(diameter).toFixed(2) : "";

const formatMillimeters = (value: number): string =>
    Number.isFinite(value) ? value.toFixed(2) : "";

const practicalDescription = (description: string): string => {
    const firstSentence = description.match(/^.*?[.!?。؟]/u);
    return firstSentence?.[0].trim() ?? description;
};

const WireEditor = ({
    node,
    calculatedWire,
    rootResistance,
    showAllComponents,
    depth,
    defaultMaterials,
    visibleDefaultMaterialIds,
    customMaterials,
    dispatch,
    parentId,
    parentKind,
    parallelParentCanAdd,
    messages,
}: {
    readonly node: WireNode;
    readonly calculatedWire?: CalculatedWire;
    readonly rootResistance?: number;
    readonly showAllComponents: boolean;
    readonly depth: number;
    readonly defaultMaterials: readonly DefaultMaterial[];
    readonly visibleDefaultMaterialIds: ReadonlySet<string>;
    readonly customMaterials: readonly CustomMaterial[];
    readonly dispatch: (action: WireTreeAction) => void;
    readonly parentId?: string;
    readonly parentKind?: CompositeWireKind;
    readonly parallelParentCanAdd?: boolean;
    readonly messages: CalculatorRouteMessages;
}): ReactElement => {
    const selectedMaterialId =
        node.kind === "single" ? node.materialId : undefined;
    const selectableDefaults = defaultMaterials.filter(
        (material) =>
            visibleDefaultMaterialIds.has(material.id) ||
            material.id === selectedMaterialId,
    );
    const wireTypeName = node.kind === "single"
        ? `${messages.single} wire`
        : (messages[node.kind] ?? node.kind).toLocaleLowerCase();
    const calculatedChildren = new Map(
        calculatedWire?.children.map((child) => [child.id, child]),
    );
    const currentPerVolt = calculatedWire ? 1 / calculatedWire.resistance : Number.NaN;
    const powerFraction = calculatedWire && rootResistance !== undefined
        ? rootResistance / calculatedWire.resistance
        : Number.NaN;
    const currentPerVoltUnit = currentPerVolt > 1 ? "A" : "mA";
    const currentPerVoltValue = currentPerVolt > 1 ? currentPerVolt : currentPerVolt * 1000;
    const showResults = calculatedWire !== undefined && (depth === 0 || showAllComponents);
    const addParallelAction: WireTreeAction | undefined = parentKind === "twisted"
        ? undefined
        : parentKind === "parallel" && parentId
            ? parallelParentCanAdd
                ? { type: "add-parallel-member", nodeId: parentId }
                : undefined
            : node.kind === "parallel"
                ? depth < wireTreeLimits.maximumDepth
                    ? { type: "add-parallel-member", nodeId: node.id }
                    : undefined
                : canWrapWireAtDepth(node, depth, parentKind)
                    ? { type: "wrap-wire-in-parallel", nodeId: node.id }
                    : undefined;
    return (
        <article
            className={`wirewiz-wire-card${showResults ? "" : " wirewiz-wire-card--without-results"}`}
            aria-label={`${wireTypeName} ${messages.configuration}`}
        >
            <header>
                <label className="wirewiz-wire-type">
                    <span className="sr-only">{messages.wireType}</span>
                    <select
                        value={node.kind}
                        onChange={(event) => dispatch({
                            type: "change-kind",
                            nodeId: node.id,
                            kind: event.target.value as WireKind,
                        })}
                    >
                        <option value="single">{messages.single}</option>
                        {(node.kind === "parallel"
                            || !parentKind
                            || compositeWireRules[parentKind].allowsParallelChild) && (
                            <option value="parallel" disabled={depth >= wireTreeLimits.maximumDepth}>
                                {messages.parallel}
                            </option>
                        )}
                        <option value="twisted" disabled={depth >= wireTreeLimits.maximumDepth}>
                            {messages.twisted}
                        </option>
                        <option value="clapton" disabled={depth >= wireTreeLimits.maximumDepth}>
                            {messages.clapton}
                        </option>
                        <option value="staggered-clapton" disabled={depth >= wireTreeLimits.maximumDepth}>
                            {messages.staggeredClapton}
                        </option>
                    </select>
                </label>
                <div className="wirewiz-wire-card__actions">
                    {node.kind === "parallel" && (
                        <span className="wirewiz-wire-card__count">
                            <span aria-hidden="true">{node.members.length}</span>
                            <span className="sr-only">{`${node.members.length} ${messages.parallelWires}`}</span>
                        </span>
                    )}
                    {parentId && parentKind && compositeWireRules[parentKind].variableMembers && (
                        <button
                            className="se-button se-button--bordered"
                            type="button"
                            onClick={() => dispatch({
                                type: "remove-parallel-member",
                                nodeId: parentId,
                                memberId: node.id,
                            })}
                            title={messages.removeWire}
                            aria-label={messages.removeWire}
                        >
                            <FontAwesomeIcon icon={faTrash} aria-hidden="true" />
                        </button>
                    )}
                </div>
            </header>
            {showResults && (
                <section id={depth === 0 ? "wirewiz-results" : undefined}
                    className="wirewiz-wire-card__results" aria-label={messages.results}>
                    <h4>{messages.results}</h4>
                    <dl className="wirewiz-wire-card__summary">
                        <div>
                            <dt>{messages.resistance}</dt>
                            <dd>{formatResult(calculatedWire.resistance, 3)} Ω</dd>
                        </div>
                        <div>
                            <dt>{messages.length}</dt>
                            <dd>{formatResult(calculatedWire.length, 0)} mm</dd>
                        </div>
                        <div>
                            <dt>{messages.heatFlux} <small>{messages.perWatt}</small></dt>
                            <dd>{formatResult((powerFraction * 1000) / calculatedWire.surfaceArea, 0)} mW/mm²</dd>
                        </div>
                        <div>
                            <dt>{messages.mass}</dt>
                            <dd>{formatResult(calculatedWire.mass ?? Number.NaN, 2)} mg</dd>
                        </div>
                    </dl>
                    <details>
                        <summary>{messages.electrical}</summary>
                        <dl>
                            <div>
                                <dt>{messages.perUnitLength}</dt>
                                <dd>{formatResult(calculatedWire.resistancePerLength, 2)} Ω/m</dd>
                            </div>
                            <div>
                                <dt>{messages.current} <small>{messages.perVolt}</small></dt>
                                <dd>{formatResult(currentPerVoltValue, 0)} {currentPerVoltUnit}</dd>
                            </div>
                            <div>
                                <dt>{messages.powerDissipated}</dt>
                                <dd>{formatResult(powerFraction * 100, 0)}%</dd>
                            </div>
                        </dl>
                    </details>
                    <details>
                        <summary>{messages.thermal}</summary>
                        <dl>
                            <div title={messages.tcrExplanation}>
                                <dt>TCR <small>{messages.vapingRange}</small></dt>
                                <dd>
                                    {calculatedWire.tcrSensitivity === null
                                        ? "?"
                                        : <>{formatResult(calculatedWire.tcrSensitivity, 0)} × 10⁻⁶</>}
                                </dd>
                            </div>
                            <div title={messages.tcExplanation}>
                                <dt>{messages.tcPrecision}</dt>
                                <dd>{formatResult(calculatedWire.tcPrecision ?? Number.NaN, 0)}</dd>
                            </div>
                            <div>
                                <dt>{messages.heatCapacity}</dt>
                                <dd>{formatResult(calculatedWire.heatCapacity ?? Number.NaN, 0)} mJ/K</dd>
                            </div>
                        </dl>
                    </details>
                    <details>
                        <summary>{messages.physical}</summary>
                        <dl>
                            {node.kind === "single" && node.profile === "round" ? (
                                <div>
                                    <dt>{messages.diameter}</dt>
                                    <dd>{formatResult(calculatedWire.width, 3)} mm</dd>
                                </div>
                            ) : (
                                <>
                                    <div>
                                        <dt>{messages.width}</dt>
                                        <dd>{formatResult(calculatedWire.width, 3)} mm</dd>
                                    </div>
                                    <div>
                                        <dt>{messages.thickness}</dt>
                                        <dd>{formatResult(calculatedWire.thickness, 3)} mm</dd>
                                    </div>
                                </>
                            )}
                            <div>
                                <dt>{messages.surfaceArea}</dt>
                                <dd>{formatResult(calculatedWire.surfaceArea, 2)} mm²</dd>
                            </div>
                            <div>
                                <dt>{messages.crossSectionArea}</dt>
                                <dd>{formatResult(calculatedWire.crossSectionArea, 3)} mm²</dd>
                            </div>
                            <div>
                                <dt>{messages.volume}</dt>
                                <dd>{formatResult(calculatedWire.volume, 2)} mm³</dd>
                            </div>
                            <div>
                                <dt>{messages.density}</dt>
                                <dd>{formatResult(calculatedWire.density ?? Number.NaN, 2)} g/cm³</dd>
                            </div>
                        </dl>
                    </details>
                </section>
            )}
            <div className="wirewiz-wire-card__body">
                {node.kind === "single" ? (
                    <>
                        <label className="wirewiz-field">
                            <span>{messages.material}</span>
                            <select
                                value={node.materialId}
                                onChange={(event) => dispatch({
                                    type: "set-material",
                                    nodeId: node.id,
                                    materialId: event.target.value,
                                })}
                            >
                                <CatalogSelectOptions
                                    defaultItems={selectableDefaults}
                                    customItems={customMaterials}
                                    defaultGroupLabel={messages.materialGroups}
                                    customGroupLabel={messages.customMaterials}
                                    optionLabel={(material) => material.name}
                                />
                            </select>
                        </label>
                        <label className="wirewiz-field">
                            <span>{messages.profile}</span>
                            <select
                                value={node.profile}
                                onChange={(event) => dispatch({
                                    type: "set-profile",
                                    nodeId: node.id,
                                    profile: event.target.value === "ribbon" ? "ribbon" : "round",
                                })}
                            >
                                <option value="round">{messages.round}</option>
                                <option value="ribbon">{messages.ribbon}</option>
                            </select>
                        </label>
                        {node.profile === "round" ? (
                            <div className="wirewiz-row">
                                <label className="wirewiz-field">
                                    <span>AWG</span>
                                    <NumericInput
                                        validChangesOnly
                                        min="-10"
                                        max="100"
                                        step="1"
                                        value={formatAwg(node.diameter)}
                                        onChange={(event) => {
                                            const awg = Math.min(100, Math.max(-10, Number(event.target.value)));
                                            dispatch({
                                                type: "set-diameter",
                                                nodeId: node.id,
                                                diameter: awgToMm(awg),
                                            });
                                        }}
                                    />
                                </label>
                                <label className="wirewiz-field">
                                    <span>{messages.diameter} (mm)</span>
                                    <NumericInput
                                        validChangesOnly
                                        min="0.01"
                                        step="0.01"
                                        value={formatMillimeters(node.diameter)}
                                        onChange={(event) => dispatch({
                                            type: "set-diameter",
                                            nodeId: node.id,
                                            diameter: Number(event.target.value),
                                        })}
                                    />
                                </label>
                            </div>
                        ) : (
                            <div className="wirewiz-row">
                                <label className="wirewiz-field">
                                    <span>{messages.width} (mm)</span>
                                    <NumericInput
                                        validChangesOnly
                                        min="0.01"
                                        step="0.01"
                                        value={node.width}
                                        onChange={(event) => dispatch({
                                            type: "set-width",
                                            nodeId: node.id,
                                            width: Number(event.target.value),
                                        })}
                                    />
                                </label>
                                <label className="wirewiz-field">
                                    <span>{messages.thickness} (mm)</span>
                                    <NumericInput
                                        validChangesOnly
                                        min="0.01"
                                        step="0.01"
                                        value={node.thickness}
                                        onChange={(event) => dispatch({
                                            type: "set-thickness",
                                            nodeId: node.id,
                                            thickness: Number(event.target.value),
                                        })}
                                    />
                                </label>
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        {node.kind === "twisted" && (
                            <div className="wirewiz-row">
                                <label className="wirewiz-field">
                                    <span>{messages.strands}</span>
                                    <NumericInput
                                        validChangesOnly
                                        integer min={wireTreeLimits.minimumTwistedStrands}
                                        max={wireTreeLimits.maximumTwistedStrands}
                                        step="1"
                                        value={node.strands}
                                        onChange={(event) => dispatch({
                                            type: "set-strands",
                                            nodeId: node.id,
                                            strands: Number(event.target.value),
                                        })}
                                    />
                                </label>
                                <label className="wirewiz-field">
                                    <span>{messages.twistPitch} (mm)</span>
                                    <NumericInput
                                        validChangesOnly
                                        min="0"
                                        step="0.01"
                                        value={node.twistPitch}
                                        onChange={(event) => dispatch({
                                            type: "set-twist-pitch",
                                            nodeId: node.id,
                                            twistPitch: Number(event.target.value),
                                        })}
                                    />
                                </label>
                            </div>
                        )}
                        {(node.kind === "clapton" || node.kind === "staggered-clapton") && (
                            <label className="wirewiz-field">
                                <span>{messages.wrapSpacing} (mm)</span>
                                <NumericInput
                                    validChangesOnly
                                    min="0"
                                    step="0.01"
                                    value={node.wrapSpacing}
                                    onChange={(event) => dispatch({
                                        type: "set-wrap-spacing",
                                        nodeId: node.id,
                                        wrapSpacing: Number(event.target.value),
                                    })}
                                />
                            </label>
                        )}
                        <div className="wirewiz-child-list">
                            {wireChildren(node).map((child, index) => (
                                <div className="wirewiz-child" key={child.id}>
                                    <p className="wirewiz-child__role">
                                        {childRoleLabel(node.kind, index, messages)}
                                    </p>
                                    <WireEditor
                                        node={child}
                                        calculatedWire={calculatedChildren.get(child.id)}
                                        rootResistance={rootResistance}
                                        showAllComponents={showAllComponents}
                                        depth={depth + 1}
                                        parentId={node.id}
                                        parentKind={node.kind}
                                        parallelParentCanAdd={node.kind === "parallel"
                                            && depth < wireTreeLimits.maximumDepth}
                                        defaultMaterials={defaultMaterials}
                                        visibleDefaultMaterialIds={visibleDefaultMaterialIds}
                                         customMaterials={customMaterials}
                                         messages={messages}
                                         dispatch={dispatch}
                                    />
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
            {addParallelAction && parentKind !== "parallel" && (
                <button
                    className="se-button se-button--bordered wirewiz-wire-card__add-parallel"
                    type="button"
                    onClick={() => dispatch(addParallelAction)}
                >
                    <FontAwesomeIcon icon={faPlus} aria-hidden="true" />
                    <span>{messages.addParallel}</span>
                </button>
            )}
        </article>
    );
};

export const WireWizard = (): ReactElement => {
    const [inputReset, setInputReset] = useState(0);
    const messages = calculatorMessagesFor(pageLocale()).wirewiz;
    const [materialRepository, materialSnapshot] = useRepository(createMaterialRepository);
    const [initialPersistence] = useState(loadWizardSettings);
    const [settings, setSettings] = useState<WizardSettings>(initialPersistence.settings);
    const [persistenceReady, setPersistenceReady] = useState(initialPersistence.error === undefined);
    const [persistenceMessage, setPersistenceMessage] = useState(initialPersistence.error ?? "");
    const [showMaterialManager, setShowMaterialManager] = useState(false);
    const [showConverter, setShowConverter] = useState(false);
    const [tab, setTab] = useState<Tab>("graph");
    const [equivalenceTemperatureCelsius, setEquivalenceTemperatureCelsius] = useState(210);
    const [equivalenceMaterialId, setEquivalenceMaterialId] = useState("ni200");
    const [temperatureDraft, setTemperatureDraft] = useState(
        initialPersistence.settings.temperatures.join(", "),
    );
    const temperatureValidation = useMemo(
        () => parseTemperaturePointDraft(temperatureDraft),
        [temperatureDraft],
    );
    const temperatureDraftChanged = temperatureValidation.kind === "valid"
        && !sameTemperaturePoints(temperatureValidation.values, settings.temperatures);
    const temperatureError = temperatureValidation.kind === "invalid"
        ? temperaturePointError(temperatureValidation.issue, messages)
        : "";
    const importInput = useRef<HTMLInputElement>(null);
    const calculationSettings = useMemo<Omit<WizardSettings, "showAllComponents">>(
        () => {
            const { showAllComponents: _showAllComponents, ...calculationOnlySettings } = settings;
            return calculationOnlySettings;
        },
        [
            settings.innerDiameter,
            settings.legLength,
            settings.root,
            settings.scale,
            settings.temperatures,
            settings.wrapSpacing,
            settings.wraps,
        ],
    );
    const [apiResult, setApiResult] = useState<WireWizardApiResult>({
        calculation: emptyWireCalculation(messages.calculating),
        csv: "",
        equivalent: { kind: "unavailable", message: messages.calculating } as EquivalentTemperatureResult,
    });
    const request = useMemo(() => createDebouncedRequest<typeof apiResult>(200), []);
    useEffect(() => () => request.cancel(), [request]);
    useEffect(() => {
        void request.schedule(() => calculateWireWizard(
            calculationSettings,
            materialSnapshot.allMaterials,
            equivalenceTemperatureCelsius,
            equivalenceMaterialId,
        )).then(setApiResult).catch((error: unknown) => {
            if (error === debouncedRequestSuperseded) return;
        });
    }, [calculationSettings, equivalenceMaterialId, equivalenceTemperatureCelsius, materialSnapshot.allMaterials, request]);
    const calculation = apiResult.calculation;
    const validCalculation = calculation.kind === "valid" ? calculation : undefined;
    const temperatureDataAvailable = validCalculation?.root.temperatureDataAvailable ?? false;
    const temperatureUnavailableMessage = calculation.kind === "invalid"
        ? calculation.message
        : "The selected material has no TCR or TFR data.";
    const dna = temperatureDataAvailable && validCalculation ? apiResult.csv ?? "" : "";
    const update = (next: Partial<WizardSettings>): void => {
        if (next.innerDiameter !== undefined && (!Number.isFinite(next.innerDiameter) || next.innerDiameter <= 0)) return;
        if (next.wraps !== undefined && (!Number.isFinite(next.wraps) || next.wraps <= 0)) return;
        if (next.legLength !== undefined && (!Number.isFinite(next.legLength) || next.legLength < 0)) return;
        if (next.wrapSpacing !== undefined && (!Number.isFinite(next.wrapSpacing) || next.wrapSpacing < 0)) return;
        setSettings((current) => ({ ...current, ...next }));
    };
    const updateEquivalentCelsius = (value: number): void => {
        if (Number.isFinite(value) && value > 0) setEquivalenceTemperatureCelsius(value);
    };
    const updateEquivalentFahrenheit = (value: number): void => {
        const celsius = fahrenheitToCelsius(value);
        if (Number.isFinite(value) && value > 0 && celsius > 0) {
            setEquivalenceTemperatureCelsius(celsius);
        }
    };
    const applyTemperaturePoints = (): void => {
        if (temperatureValidation.kind !== "valid" || !temperatureDraftChanged) return;
        update({ temperatures: temperatureValidation.values });
    };
    const dispatchWireAction = (action: WireTreeAction): void => {
        if (action.type === "set-diameter"
            && (!Number.isFinite(action.diameter) || action.diameter <= 0)) return;
        if (action.type === "set-width" && (!Number.isFinite(action.width) || action.width <= 0)) return;
        if (action.type === "set-thickness"
            && (!Number.isFinite(action.thickness) || action.thickness <= 0)) return;
        if (action.type === "set-wrap-spacing"
            && (!Number.isFinite(action.wrapSpacing) || action.wrapSpacing < 0)) return;
        setSettings((current) => ({
            ...current,
            root: wireTreeReducer(current.root, action),
        }));
    };
    const reset = () => {
        setInputReset((revision) => revision + 1);
        const next = defaultSettings();
        setSettings(next);
        setTemperatureDraft(next.temperatures.join(", "));
        setPersistenceReady(true);
        setPersistenceMessage("Default Wire Wizard design restored.");
        saveWizardSettings(next);
    };
    const importDesign = async (file: File | undefined): Promise<void> => {
        if (!file) return;
        const result = importWizardDesign(await file.text());
        if (result.kind === "invalid") {
            setPersistenceMessage(result.message);
            return;
        }
        setSettings(result.settings);
        setInputReset((revision) => revision + 1);
        setTemperatureDraft(result.settings.temperatures.join(", "));
        setPersistenceReady(true);
        setPersistenceMessage("Wire and coil design imported.");
        saveWizardSettings(result.settings);
        if (importInput.current) importInput.current.value = "";
    };
    useEffect(() => {
        if (persistenceReady) saveWizardSettings(settings);
    }, [persistenceReady, settings]);
    useEffect(
        () =>
            materialRepository.registerReferences("wirewiz-active-design", {
                label: "Current Wire Wizard design",
                materialIds: () => materialIdsIn(settings.root),
            }),
        [materialRepository, settings.root],
    );
    const visibleDefaultMaterialIds = useMemo(
        () =>
            new Set(
                materialSnapshot.visibleDefaultMaterials.map((material) => material.id),
            ),
        [materialSnapshot.visibleDefaultMaterials],
    );
    const equivalentDefaultMaterials = useMemo(
        () => materialSnapshot.defaultMaterials.filter(
            (material) => hasTemperatureData(material)
                && (visibleDefaultMaterialIds.has(material.id)
                    || material.id === equivalenceMaterialId),
        ),
        [equivalenceMaterialId, materialSnapshot.defaultMaterials, visibleDefaultMaterialIds],
    );
    const equivalentCustomMaterials = useMemo(
        () => materialSnapshot.customMaterials.filter(hasTemperatureData),
        [materialSnapshot.customMaterials],
    );
    const equivalentMaterials = useMemo(
        () => [...equivalentDefaultMaterials, ...equivalentCustomMaterials],
        [equivalentCustomMaterials, equivalentDefaultMaterials],
    );
    useEffect(() => {
        if (equivalentMaterials.some((material) => material.id === equivalenceMaterialId)) return;
        const fallback = equivalentMaterials.find((material) => material.id === "ni200")
            ?? equivalentMaterials[0];
        setEquivalenceMaterialId(fallback?.id ?? "");
    }, [equivalenceMaterialId, equivalentMaterials]);
    const equivalentMaterial = equivalentMaterials.find(
        (material) => material.id === equivalenceMaterialId,
    );
    const equivalentResult: EquivalentTemperatureResult = apiResult.equivalent
        ?? { kind: "unavailable", message: messages.calculating };
    const equivalentUnavailableMessage = validCalculation
        && (!validCalculation.root.temperatureDataAvailable || validCalculation.root.temperatureExtrapolated)
        ? messages.temperatureDataExtrapolationUnavailable
        : equivalentResult.kind === "unavailable" ? equivalentResult.message : "";
    const tableRows = temperatureDataAvailable && validCalculation
        ? settings.temperatures.map((temperature, index) => ({
                temperature,
                factor: validCalculation.root.normalizedFactors[index],
            }))
        : [];
    return (
        <NumericDraftReset.Provider value={inputReset}>
        <SiteLayout basePath="./" currentRoute="wirewiz" rootHref=".">
            <main id="main" className="page-content wirewiz-page">
                <CalculatorPageHeader className="wirewiz-header" copyClassName="wirewiz-header__copy"
                    eyebrow={messages.eyebrow} title={messages.title}
                    description={practicalDescription(messages.description)}
                    actionsClassName="wirewiz-header__actions" actions={<>
                        <button
                            className={`se-button se-button--bordered${showMaterialManager ? " active" : ""}`}
                            type="button"
                            aria-expanded={showMaterialManager}
                            aria-controls="wirewiz-material-manager"
                            onClick={() => setShowMaterialManager((visible) => !visible)}
                        >
                            <FontAwesomeIcon icon={faSliders} aria-hidden="true" /> {messages.manageMaterials}
                        </button>
                        <button
                            className="se-button se-button--bordered"
                            type="button"
                            aria-expanded={showConverter}
                            aria-controls="wirewiz-converter"
                            onClick={() => setShowConverter((visible) => !visible)}
                        >
                            <FontAwesomeIcon icon={faArrowDownUpAcrossLine} aria-hidden="true" />
                            {showConverter ? ` ${messages.hideConverter}` : ` ${messages.converter}`}
                        </button>
                        <details className="se-menu">
                            <summary>{messages.menu}
                                <FontAwesomeIcon icon={faCaretDown} aria-hidden="true" />
                            </summary>
                            <div className="se-menu__items">
                                <button
                                    type="button"
                                    onClick={() => makeDownload(
                                        exportWizardDesign(settings),
                                        "SteamEngine-WireWizard-design.json",
                                        "application/json;charset=utf-8",
                                    )}
                                >
                                    <FontAwesomeIcon icon={faDownload} aria-hidden="true" /> {messages.export}
                                </button>
                                <button type="button" onClick={() => importInput.current?.click()}>
                                    <FontAwesomeIcon icon={faFileImport} aria-hidden="true" /> {messages.import}
                                </button>
                                <input ref={importInput} className="wirewiz-import-input" type="file"
                                    accept="application/json,.json" aria-label={messages.importDesign}
                                    onChange={(event) => void importDesign(event.currentTarget.files?.[0])} />
                                <button type="button" onClick={reset}>
                                     <FontAwesomeIcon icon={faRotateLeft} aria-hidden="true" /> {messages.reset}
                                </button>
                            </div>
                        </details>
                    </>} />
                {persistenceMessage && <p className="se-alert se-alert--info wirewiz-persistence-message" role="status">
                    {persistenceMessage}
                    {!persistenceReady && ` ${messages.resetPersistence}`}
                </p>}
                {showMaterialManager && (
                    <div id="wirewiz-material-manager">
                        <MaterialManager repository={materialRepository}
                            onClose={() => setShowMaterialManager(false)} />
                    </div>
                )}
                {showConverter && <EmbeddedConverter idPrefix="wirewiz-converter" className="wirewiz-converter" />}
                <aside className="wirewiz-mobile-summary" aria-label={`${messages.results} summary`}>
                    {validCalculation ? <dl>
                        <div><dt>{messages.resistance}</dt>
                            <dd>{formatResult(validCalculation.root.resistance, 3)} Ω</dd></div>
                        <div><dt>{messages.length}</dt>
                            <dd>{formatResult(validCalculation.root.length, 1)} mm</dd></div>
                        <div><dt>{messages.heatCapacity}</dt>
                            <dd>{formatResult(validCalculation.root.heatCapacity ?? Number.NaN, 1)} mJ/K</dd></div>
                    </dl> : <span>{calculation.kind === "invalid" ? calculation.message : messages.calculating}</span>}
                    <a className="se-button se-button--bordered se-button--compact" href="#wirewiz-results">
                        {messages.results} ↓
                    </a>
                </aside>
                <div className="wirewiz-layout">
                    <section className="se-card wirewiz-panel wirewiz-coil-parameters">
                        <h2>{messages.coilParameters}</h2>
                        <label>
                                <span>{messages.innerDiameter} (mm)</span>
                                <NumericInput
                                    validChangesOnly
                                    min="0.1"
                                    step="0.1"
                                    value={settings.innerDiameter}
                                    onChange={(event) =>
                                        update({ innerDiameter: Number(event.target.value) })
                                    }
                                />
                        </label>
                        <label>
                                <span>{messages.wraps}</span>
                                <NumericInput
                                    validChangesOnly
                                    min="1"
                                    step="0.5"
                                    value={settings.wraps}
                                    onChange={(event) =>
                                        update({ wraps: Number(event.target.value) })
                                    }
                                />
                        </label>
                        <label>
                                <span>{messages.legLength} (mm)</span>
                                <NumericInput
                                    validChangesOnly
                                    min="0"
                                    step="0.5"
                                    value={settings.legLength}
                                    onChange={(event) =>
                                        update({ legLength: Number(event.target.value) })
                                    }
                                />
                        </label>
                        <label>
                                <span>{messages.wrapSpacing} (mm)</span>
                                <NumericInput
                                    validChangesOnly
                                    min="0"
                                    step="0.01"
                                    value={settings.wrapSpacing}
                                    onChange={(event) =>
                                        update({ wrapSpacing: Number(event.target.value) })
                                    }
                                />
                        </label>
                    </section>
                    <section className="wirewiz-design">
                        <header className="wirewiz-design__header">
                            <h2>{messages.wireDesign}</h2>
                            <label className="wirewiz-design__results-toggle">
                                <input
                                    type="checkbox"
                                    checked={settings.showAllComponents}
                                    onChange={(event) =>
                                        update({ showAllComponents: event.target.checked })
                                    }
                                />
                                {messages.showAllResults}
                            </label>
                        </header>
                        <WireEditor
                            node={settings.root}
                            calculatedWire={validCalculation?.root}
                            rootResistance={validCalculation?.root.resistance}
                            showAllComponents={settings.showAllComponents}
                            depth={0}
                            defaultMaterials={materialSnapshot.defaultMaterials}
                            visibleDefaultMaterialIds={visibleDefaultMaterialIds}
                            customMaterials={materialSnapshot.customMaterials}
                            messages={messages}
                            dispatch={dispatchWireAction}
                        />
                    </section>
                    <section className="se-card wirewiz-panel wirewiz-temperature">
                        <header className="wirewiz-temperature__header">
                            <h2>{messages.temperatureControl}</h2>
                            <div className="wirewiz-temperature__controls">
                                <div className="wirewiz-tabs" role="tablist">
                                    {(["tfr", "graph", "table", "equivalents", "dna"] as const).map((item) => (
                                        <button
                                            key={item}
                                            className="se-button se-button--compact"
                                            type="button"
                                            role="tab"
                                            aria-selected={tab === item}
                                            onClick={() => setTab(item)}
                                        >
                                            {item === "tfr"
                                                ? messages.tfrEditor
                                                : item === "dna"
                                                    ? messages.dna200
                                                    : messages[item] ?? item}
                                        </button>
                                        ))}
                                    </div>
                            </div>
                        </header>
                        {calculation.kind === "invalid" && (
                            <p className="wirewiz-note" role="alert">{calculation.message}</p>
                        )}
                        {tab === "tfr" && (
                            <form className="wirewiz-temperature-editor" onSubmit={(event) => {
                                event.preventDefault();
                                applyTemperaturePoints();
                            }}>
                                <label className="wirewiz-field">
                                    <span>{messages.temperaturePoints}</span>
                                    <input
                                        value={temperatureDraft}
                                        aria-invalid={temperatureValidation.kind === "invalid" || undefined}
                                        aria-describedby="wirewiz-temperature-help wirewiz-temperature-feedback"
                                        onChange={(event) => setTemperatureDraft(event.target.value)}
                                    />
                                </label>
                                <p className="wirewiz-note" id="wirewiz-temperature-help">
                                    {messages.temperatureHelp}
                                </p>
                                <div id="wirewiz-temperature-feedback">
                                    {temperatureError && (
                                        <p className="wirewiz-temperature-error" role="alert">
                                            {temperatureError}
                                        </p>
                                    )}
                                </div>
                                <button className="se-button se-button--bordered" type="submit"
                                    disabled={!temperatureDraftChanged}>
                                    {messages.applyTemperaturePoints}
                                </button>
                            </form>
                        )}
                        {tab === "graph" && (
                            <>
                                {temperatureDataAvailable && validCalculation ? (
                                    <WireWizardGraph
                                        temperatures={settings.temperatures}
                                        root={validCalculation.root}
                                        components={validCalculation.components}
                                        scale={settings.scale}
                                        showAll={settings.showAllComponents}
                                    />
                                ) : (
                                    <p className="wirewiz-note">
                                        {messages.temperatureUnavailable} {temperatureUnavailableMessage}
                                    </p>
                                )}
                                <div className="wirewiz-temperature__graph-controls">
                                    {validCalculation?.root.temperatureExtrapolated && (
                                        <p className="wirewiz-note">
                                            {messages.extrapolated}
                                        </p>
                                    )}
                                    <div className="wirewiz-scale-toggle" role="group" aria-label={messages.temperatureScale}>
                                        <button
                                            className="se-button se-button--compact"
                                            type="button"
                                            aria-pressed={settings.scale === "celsius"}
                                            onClick={() => update({ scale: "celsius" })}
                                        >
                                            °C
                                        </button>
                                        <button
                                            className="se-button se-button--compact"
                                            type="button"
                                            aria-pressed={settings.scale === "fahrenheit"}
                                            onClick={() => update({ scale: "fahrenheit" })}
                                        >
                                            °F
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                        {tab === "table" &&
                            (temperatureDataAvailable && validCalculation ? (
                                <table className="se-table wirewiz-table">
                                    <thead>
                                        <tr>
                                            <th>{messages.temperature}</th>
                                            <th>{messages.resistanceFactor}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tableRows.map((row) => (
                                            <tr key={row.temperature}>
                                                <td>{row.temperature}</td>
                                                <td>{row.factor.toFixed(6)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p className="wirewiz-note">
                                    {messages.tfrTable} {temperatureUnavailableMessage}
                                </p>
                            ))}
                        {tab === "equivalents" && (
                            <div className="wirewiz-equivalents">
                                <div className="wirewiz-equivalents__fields">
                                    <fieldset>
                                        <div className="wirewiz-equivalents__temperature">
                                            <label className="wirewiz-field">
                                                <span>{messages.celsius}</span>
                                                <NumericInput
                                                    aria-label={messages.celsius}
                                                    validChangesOnly
                                                    min="0.01"
                                                    max="1000"
                                                    step="5"
                                                    value={equivalenceTemperatureCelsius}
                                                    onChange={(event) => updateEquivalentCelsius(Number(event.target.value))}
                                                />
                                            </label>
                                            <span aria-hidden="true">=</span>
                                            <label className="wirewiz-field">
                                                <span>{messages.fahrenheit}</span>
                                                <NumericInput
                                                    aria-label={messages.fahrenheit}
                                                    validChangesOnly
                                                    min="0.01"
                                                    max="1832"
                                                    step="10"
                                                    value={Number(celsiusToFahrenheit(
                                                        equivalenceTemperatureCelsius,
                                                    ).toFixed(2))}
                                                    onChange={(event) => updateEquivalentFahrenheit(Number(event.target.value))}
                                                />
                                            </label>
                                        </div>
                                    </fieldset>
                                    <label className="wirewiz-field">
                                        <span>{messages.referenceMaterial}</span>
                                        <select
                                            value={equivalenceMaterialId}
                                            onChange={(event) => setEquivalenceMaterialId(event.target.value)}
                                        >
                                            <CatalogSelectOptions
                                                defaultItems={equivalentDefaultMaterials}
                                                customItems={equivalentCustomMaterials}
                                                optionLabel={(material) => material.name}
                                                defaultGroupLabel={messages.materialGroups}
                                                customGroupLabel={messages.customMaterials}
                                            />
                                        </select>
                                    </label>
                                </div>
                                {equivalentResult.sourceFactor !== undefined && (
                                    <p>
                                        {messages.sourceFactor}{" "}
                                        <strong>{equivalentResult.sourceFactor.toFixed(5)}</strong>{" "}
                                        {messages.sourceFactorSuffix ?? "at this temperature."}
                                    </p>
                                )}
                                {equivalentResult.kind === "valid" && equivalentMaterial && (
                                    <p className="wirewiz-equivalents__result" role="status">
                                        {messages.matchTemperature} {equivalentMaterial.name}, {messages.adjustTemperature}{" "}
                                        <strong>
                                            {Math.round(equivalentResult.targetTemperatureCelsius / 10) * 10}{" "}
                                            {messages.celsius} {messages.or}{" "}
                                            {Math.round(celsiusToFahrenheit(
                                                equivalentResult.targetTemperatureCelsius,
                                            ) / 10) * 10} {messages.fahrenheit}
                                        </strong>.
                                    </p>
                                )}
                                {equivalentResult.kind === "unavailable" && (
                                    <p className="wirewiz-warning" role="alert">{equivalentUnavailableMessage}</p>
                                )}
                            </div>
                        )}
                        {tab === "dna" &&
                            (temperatureDataAvailable && validCalculation ? (
                                <>
                                    <textarea
                                        className="wirewiz-dna"
                                        readOnly
                                        aria-readonly="true"
                                        value={dna}
                                        aria-label={messages.dna200}
                                    />
                                    <p>
                                        <button
                                            className="se-button se-button--primary"
                                            type="button"
                                            onClick={() =>
                                                makeDownload(dna, dna200FileName(validCalculation.root))
                                            }
                                        >
                                            <FontAwesomeIcon icon={faDownload} aria-hidden="true" />{" "}
                                            {messages.downloadCsv}
                                        </button>
                                    </p>
                                </>
                            ) : (
                                <p className="wirewiz-note">
                                    {messages.dnaUnavailable} {temperatureUnavailableMessage}
                                </p>
                            ))}
                    </section>
                </div>
                <CalculatorLegacyNote href="old/wirewiz" />
            </main>
        </SiteLayout>
        </NumericDraftReset.Provider>
    );
};
