import {
    useEffect,
    useMemo,
    useRef,
    useState,
    type Dispatch,
    type ReactElement,
    type ReactNode,
    type SetStateAction,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBatteryFull,
    faSliders,
    faRotateLeft,
    faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import {
    applyPreset,
    applyModBatteryOption,
    batteryPresetFormat,
    batteryDefaults,
    defaultState,
    deviceDefaults,
    modBatteryCompatibility,
    modBatteryOptions,
    modDeviceModeStatus,
    modLimitViolations,
    preferredDeviceModeForMod,
    recommendedBatteryVoltage,
    updateBatteryField,
    type BatteryDrainState,
    type BatteryField,
    type BatteryPreset,
    type BatteryRatingMethod,
    type DeviceMode,
    type ModBatteryOption,
    type ModLimitViolation,
} from "./domain";
import { calculateBatteryFromApi } from "./api";
import { BatteryManager } from "../../catalogs/batteries/battery-manager";
import { createBatteryRepository } from "../../catalogs/batteries/repository";
import type { ModProperties } from "../../catalogs/mods/catalog";
import { ModManager } from "../../catalogs/mods/mod-manager";
import { createModRepository } from "../../catalogs/mods/repository";
import "../../shared/styles/foundation.css";
import { useRepository } from "../../shared/hooks/use-repository";
import { CalculatorLegacyNote, CalculatorPageHeader } from "../../shared/ui/calculator-page-header";
import { NumericField, SelectField, type NumericFieldProps } from "../../shared/ui/form-fields";
import { NumericDraftReset } from "../../shared/ui/numeric-input";
import { SiteLayout } from "../../shared/ui/site-layout";
import "./battery-drain.css";
import { createDebouncedRequest, debouncedRequestSuperseded } from "../../shared/debounced-request";
import { formatDisplayNumber, parseNumericInput } from "../../shared/domain/numeric";
import { pageLocale } from "../../i18n/page-locale";
import {
    calculatorMessagesFor,
    pluralFormKey,
    type CalculatorRouteMessages,
} from "../../i18n/calculator-messages";
import { batteryDrainHandoff } from "./handoff";

const storageKey = "steamengine.batteryDrain.settings.v7";
const legacyStorageKeys = [
    "steamengine.batteryDrain.settings.v6",
    "steamengine.batteryDrain.settings.v5",
    "steamengine.batteryDrain.settings.v4",
    "steamengine.batteryDrain.settings.v3",
    "steamengine.batteryDrain.settings.v2",
    "steamengine.batteryDrain.settings.v1",
];
const defaultRatingMethod: BatteryRatingMethod = "amps";

export const cellCountLabel = (count: number, locale: string, messages: CalculatorRouteMessages): string => {
    const category = new Intl.PluralRules(locale).select(count);
    if (count === 1 || category === "one") return messages.cell;
    return messages[pluralFormKey("cells", category)] ?? messages.cells;
};

type DeviceField = "atomizerResistance" | "outputVoltage" | "outputPower" | "outputCurrent" | "efficiency";
type Drafts = Record<DeviceField | BatteryField, string>;
type SavedSettings = {
    readonly state: BatteryDrainState;
    readonly ratingMethod: BatteryRatingMethod;
    readonly selectedModId: string;
    readonly selectedModConfigurationId: string;
    readonly usesCustomModConfiguration: boolean;
};

const defaultSavedSettings = {
    state: defaultState,
    ratingMethod: defaultRatingMethod,
    selectedModId: "",
    selectedModConfigurationId: "",
    usesCustomModConfiguration: false,
} as const satisfies SavedSettings;

const makeDrafts = (state: BatteryDrainState): Drafts => ({
    atomizerResistance: String(state.device.atomizerResistance),
    outputVoltage: String(state.device.outputVoltage),
    outputPower: String(state.device.outputPower),
    outputCurrent: String(state.device.outputCurrent),
    efficiency: String(state.device.efficiency * 100),
    voltage: String(state.battery.voltage),
    capacityMah: String(state.battery.capacityMah),
    maximumCurrent: String(state.battery.maximumCurrent),
    cRating: format(state.battery.cRating, 2),
    nominalVoltage: String(state.battery.nominalVoltage),
});

const loadSettings = (): SavedSettings => {
    try {
        const currentRaw = localStorage.getItem(storageKey);
        const legacyValues = legacyStorageKeys.map((key) => localStorage.getItem(key));
        const legacyRaw = legacyValues.find(Boolean);
        const raw = currentRaw ?? legacyRaw;
        if (!raw) return defaultSavedSettings;
        const parsed = JSON.parse(raw) as Partial<SavedSettings> & Partial<BatteryDrainState> & {
            device?: Partial<BatteryDrainState["device"]> & { regulationMode?: "power" | "voltage" };
        };
        const wrappedSettings = currentRaw !== null || legacyValues.slice(0, 3).some((value) => value !== null);
        const savedState = (wrappedSettings ? parsed.state ?? {} : parsed) as Partial<BatteryDrainState> & {
            device?: Partial<BatteryDrainState["device"]> & { regulationMode?: "power" | "voltage" };
        };
        const { regulationMode, ...savedDevice } = savedState.device ?? {};
        const savedModeName = (savedDevice as { mode?: string }).mode;
        const savedMode = savedModeName === "regulated"
            ? regulationMode === "voltage" ? "voltage-regulated" : "power-regulated"
            : savedModeName === "voltage-regulated" || savedModeName === "current-regulated"
                || savedModeName === "unregulated"
                || savedModeName === "power-regulated"
                ? savedModeName
                : deviceDefaults.mode;
        const savedBattery = { ...batteryDefaults, ...(savedState.battery ?? {}) };
        const isVersionOne = currentRaw === null && legacyValues.slice(0, 5).every((value) => value === null);
        if (isVersionOne && savedMode !== "unregulated"
            && savedBattery.voltage === 4.2) {
            savedBattery.voltage = recommendedBatteryVoltage(savedMode as DeviceMode);
        }
        return {
            state: {
                device: { ...deviceDefaults, ...savedDevice, mode: savedMode as DeviceMode },
                battery: savedBattery,
            },
            ratingMethod: parsed.ratingMethod === "c-rating" ? "c-rating" : defaultRatingMethod,
            selectedModId: typeof parsed.selectedModId === "string" ? parsed.selectedModId : "",
            selectedModConfigurationId: typeof parsed.selectedModConfigurationId === "string"
                ? parsed.selectedModConfigurationId
                : "",
            usesCustomModConfiguration: parsed.usesCustomModConfiguration === true,
        };
    } catch {
        return defaultSavedSettings;
    }
};

const format = (value: number, decimals = 2): string => formatDisplayNumber(value, decimals, pageLocale());

const sameState = (left: BatteryDrainState, right: BatteryDrainState): boolean =>
    JSON.stringify(left) === JSON.stringify(right);

type BatteryNumberFieldProps = Omit<NumericFieldProps,
    "label" | "fieldClassName" | "inputWrapperClassName" | "ariaLabel" | "onCommit"> & {
    readonly label: ReactNode;
    readonly ariaLabel?: string;
    readonly onCommit: () => void;
};

const NumberField = ({
    onCommit,
    min = "0.1",
    step = "0.1",
    ariaLabel,
    ...props
}: BatteryNumberFieldProps): ReactElement =>
    <NumericField {...props} min={min} step={step}
        ariaLabel={ariaLabel ?? (typeof props.label === "string" ? props.label : undefined)} onCommit={onCommit}
        fieldClassName="se-field battery-field" inputWrapperClassName="se-input-with-unit battery-input" />;

const OutputTable = ({ values, messages }: {
    readonly values: {
        readonly voltage: number;
        readonly current: number;
        readonly power: number;
    };
    readonly messages: CalculatorRouteMessages;
}): ReactElement => <dl className="se-result-list battery-result-list">
    <div><dt>{messages.voltageLabel}</dt><dd>{format(values.voltage)} V</dd></div>
    <div><dt>{messages.currentLabel}</dt><dd>{format(values.current)} A</dd></div>
    <div><dt>{messages.powerLabel}</dt><dd>{format(values.power)} W</dd></div>
</dl>;

const modPresetLabel = (preset: ModProperties, presetById: ReadonlyMap<string, ModProperties>): string => {
    const basedOn = preset.basedOnPresetId === undefined ? undefined : presetById.get(preset.basedOnPresetId);
    return basedOn === undefined ? preset.displayName : `${preset.displayName} (${basedOn.displayName})`;
};

const modConfigurationLabel = (option: ModBatteryOption): string => {
    const topology = option.parallelStrings === undefined
        ? `${option.seriesCells}S`
        : `${option.seriesCells}S${option.parallelStrings}P`;
    return option.format === undefined ? topology : `${option.format} · ${topology}`;
};

const useManagerDialog = (visible: boolean, setVisible: Dispatch<SetStateAction<boolean>>) => {
    const dialogRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    useEffect(() => {
        if (!visible) return;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        dialogRef.current?.focus();
        const handleDialogKeyDown = (event: KeyboardEvent): void => {
            if (event.key === "Escape") {
                setVisible(false);
                return;
            }
            if (event.key !== "Tab") return;
            const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
                "a[href], button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled)",
            );
            if (!focusable || focusable.length === 0) return;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        };
        document.addEventListener("keydown", handleDialogKeyDown);
        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener("keydown", handleDialogKeyDown);
            buttonRef.current?.focus();
        };
    }, [setVisible, visible]);
    return [dialogRef, buttonRef] as const;
};

export const BatteryDrainCalculator = (): ReactElement => {
    const [inputReset, setInputReset] = useState(0);
    const calculatorMessages = calculatorMessagesFor(pageLocale());
    const messages = calculatorMessages.batt;
    const modMessages = calculatorMessages.modrange;
    const [batteryRepository, batterySnapshot] = useRepository(createBatteryRepository);
    const [modRepository, modSnapshot] = useRepository(createModRepository);
    const loadedSettingsRef = useRef<SavedSettings | null>(null);
    if (loadedSettingsRef.current === null) {
        const savedSettings = loadSettings();
        const handoff = batteryDrainHandoff(
            typeof window === "undefined" ? "" : window.location.search,
            modRepository.getSnapshot().allMods,
            batteryRepository.getSnapshot().allBatteries,
            savedSettings.state,
        );
        loadedSettingsRef.current = handoff === undefined ? savedSettings : {
            ...savedSettings,
            state: handoff.state,
            selectedModId: handoff.selectedModId ?? savedSettings.selectedModId,
            selectedModConfigurationId: handoff.selectedModConfigurationId
                ?? savedSettings.selectedModConfigurationId,
            usesCustomModConfiguration: handoff.selectedModId === undefined
                ? savedSettings.usesCustomModConfiguration
                : false,
        };
    }
    const [state, setState] = useState<BatteryDrainState>(loadedSettingsRef.current.state);
    const [drafts, setDrafts] = useState<Drafts>(() => makeDrafts(loadedSettingsRef.current!.state));
    const [ratingMethod, setRatingMethod] = useState<BatteryRatingMethod>(
        loadedSettingsRef.current.ratingMethod,
    );
    const [selectedModId, setSelectedModId] = useState(loadedSettingsRef.current.selectedModId);
    const [selectedModConfigurationId, setSelectedModConfigurationId] = useState(
        loadedSettingsRef.current.selectedModConfigurationId,
    );
    const [usesCustomModConfiguration, setUsesCustomModConfiguration] = useState(
        loadedSettingsRef.current.usesCustomModConfiguration,
    );
    const [showBatteryManager, setShowBatteryManager] = useState(false);
    const [showModManager, setShowModManager] = useState(false);
    const [editingCustomConfiguration, setEditingCustomConfiguration] = useState(false);
    const [managerDialogRef, managerButtonRef] = useManagerDialog(showBatteryManager, setShowBatteryManager);
    const [modManagerDialogRef, modManagerButtonRef] = useManagerDialog(showModManager, setShowModManager);
    const draftsRef = useRef(drafts);
    const [result, setResult] = useState<
        ReturnType<typeof calculateBatteryFromApi> extends Promise<infer T> ? T : never
    >({
        kind: "invalid", message: messages.calculating
    });
    const debouncedCalculation = useMemo(() => createDebouncedRequest<typeof result>(200), []);

    useEffect(() => {
        let current = true;
        void debouncedCalculation.schedule(() => calculateBatteryFromApi(state)).then((next) => {
            if (current) setResult(next);
        }).catch((error: unknown) => {
            if (current && error !== debouncedRequestSuperseded) return;
        });
        return () => {
            current = false;
            debouncedCalculation.cancel();
        };
    }, [debouncedCalculation, state]);

    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify({
            state,
            ratingMethod,
            selectedModId,
            selectedModConfigurationId,
            usesCustomModConfiguration,
        } satisfies SavedSettings));
    }, [ratingMethod, selectedModConfigurationId, selectedModId, state, usesCustomModConfiguration]);
    useEffect(
        () => batteryRepository.registerReferences("battery-drain-active-settings", {
            label: "Current Battery Drain settings",
            batteryIds: () => state.battery.presetId === "" ? [] : [state.battery.presetId],
        }),
        [batteryRepository, state.battery.presetId],
    );
    useEffect(
        () => modRepository.registerReferences("battery-drain-active-settings", {
            label: "Current Battery Drain settings",
            modIds: () => selectedModId === "" ? [] : [selectedModId],
        }),
        [modRepository, selectedModId],
    );
    useEffect(() => {
        if (state.battery.presetId === "") return;
        const preset = batterySnapshot.allBatteries.find(
            (battery) => battery.id === state.battery.presetId,
        );
        if (!preset) return;
        const nextBattery = applyPreset(state.battery, preset);
        const nextDrafts = makeDrafts({ device: state.device, battery: nextBattery });
        setState((current) => ({ ...current, battery: applyPreset(current.battery, preset) }));
        draftsRef.current = nextDrafts;
        setDrafts(nextDrafts);
    }, [batterySnapshot.allBatteries, state.battery.presetId]);
    useEffect(() => {
        if (selectedModId === "") return;
        const mod = modSnapshot.allMods.find(({ id }) => id === selectedModId);
        if (mod === undefined) {
            setSelectedModId("");
            setSelectedModConfigurationId("");
            setUsesCustomModConfiguration(false);
            return;
        }
        if (selectedModConfigurationId === "") return;
        const option = modBatteryOptions(mod).find(({ id }) => id === selectedModConfigurationId);
        if (option === undefined) {
            setSelectedModConfigurationId("");
            return;
        }
        setState((current) => ({ ...current, battery: applyModBatteryOption(current.battery, option) }));
    }, [modSnapshot.allMods, selectedModConfigurationId, selectedModId]);

    const updateDraft = (field: DeviceField | BatteryField, raw: string) => {
        const next = { ...draftsRef.current, [field]: raw };
        draftsRef.current = next;
        setDrafts(next);
        const parsed = parseNumericInput(raw);
        if (parsed === undefined) return;
        if (parsed <= 0 || (field === "efficiency" && parsed > 100)) return;
        if (field in state.device) {
            const deviceField = field as DeviceField;
            const value = deviceField === "efficiency" ? parsed / 100 : parsed;
            setState((current) => ({ ...current, device: { ...current.device, [deviceField]: value } }));
            return;
        }
        const batteryField = field as BatteryField;
        const nextBattery = updateBatteryField(state.battery, batteryField, parsed, ratingMethod);
        setState((current) => ({ ...current, battery: nextBattery }));
        if (field === "capacityMah" || field === "maximumCurrent" || field === "cRating") {
            const nextDrafts = {
                ...draftsRef.current,
                maximumCurrent: field === "cRating" || (field === "capacityMah" && ratingMethod === "c-rating")
                    ? format(nextBattery.maximumCurrent, 2)
                    : draftsRef.current.maximumCurrent,
                cRating: field === "maximumCurrent" || (field === "capacityMah" && ratingMethod === "amps")
                    ? format(nextBattery.cRating, 2)
                    : draftsRef.current.cRating,
            };
            draftsRef.current = nextDrafts;
            setDrafts(nextDrafts);
        }
    };

    const commitField = (field: DeviceField | BatteryField) => {
        const raw = draftsRef.current[field];
        if (parseNumericInput(raw) !== undefined) setDrafts({ ...draftsRef.current, [field]: raw });
    };

    const selectRatingMethod = (method: BatteryRatingMethod) => {
        setRatingMethod(method);
        const nextDrafts = {
            ...draftsRef.current,
            maximumCurrent: format(state.battery.maximumCurrent, 2),
            cRating: format(state.battery.cRating, 2),
        };
        draftsRef.current = nextDrafts;
        setDrafts(nextDrafts);
    };

    const setDeviceMode = (mode: DeviceMode) => {
        const voltage = recommendedBatteryVoltage(mode);
        setState((current) => ({
            device: { ...current.device, mode },
            battery: { ...current.battery, voltage },
        }));
        const nextDrafts = { ...draftsRef.current, voltage: String(voltage) };
        draftsRef.current = nextDrafts;
        setDrafts(nextDrafts);
    };
    const reset = () => {
        setInputReset((revision) => revision + 1);
        setState(defaultState);
        setRatingMethod(defaultRatingMethod);
        setSelectedModId("");
        setSelectedModConfigurationId("");
        setUsesCustomModConfiguration(false);
        setEditingCustomConfiguration(false);
        const nextDrafts = makeDrafts(defaultState);
        draftsRef.current = nextDrafts;
        setDrafts(nextDrafts);
    };
    const choosePreset = (id: string) => {
        setInputReset((revision) => revision + 1);
        if (id === "") {
            setState((current) => ({
                ...current,
                battery: { ...current.battery, presetId: "" },
            }));
            return;
        }
        const preset = batterySnapshot.allBatteries.find((item) => item.id === id);
        if (!preset) return;
        const modForBattery = modSnapshot.allMods.find((mod) => mod.id === selectedModId);
        const matchingModOptions = selectedModConfigurationId !== "" || usesCustomModConfiguration
            || modForBattery === undefined
            ? []
            : modBatteryOptions(modForBattery)
                .filter((option) => option.format === batteryPresetFormat(preset));
        const matchingModOption = matchingModOptions.length === 1 ? matchingModOptions[0] : undefined;
        const presetBattery = applyPreset(state.battery, preset);
        const nextBattery = matchingModOption === undefined
            ? presetBattery
            : applyModBatteryOption(presetBattery, matchingModOption);
        const nextDrafts = makeDrafts({ device: state.device, battery: nextBattery });
        setState((current) => {
            const appliedPreset = applyPreset(current.battery, preset);
            return {
                ...current,
                battery: matchingModOption === undefined
                    ? appliedPreset
                    : applyModBatteryOption(appliedPreset, matchingModOption),
            };
        });
        if (matchingModOption !== undefined) {
            setSelectedModConfigurationId(matchingModOption.id);
            setUsesCustomModConfiguration(false);
            setEditingCustomConfiguration(false);
        }
        setRatingMethod(preset.continuousDischargeCurrentAmps === undefined ? "c-rating" : "amps");
        draftsRef.current = nextDrafts;
        setDrafts(nextDrafts);
    };
    const selectablePresets = useMemo(() => [
        ...batterySnapshot.defaultBatteries.filter(
            (preset) => batterySnapshot.visibleDefaultBatteries.some(({ id }) => id === preset.id)
                || preset.id === state.battery.presetId,
        ),
        ...batterySnapshot.customBatteries,
    ], [
        batterySnapshot.customBatteries,
        batterySnapshot.defaultBatteries,
        batterySnapshot.visibleDefaultBatteries,
        state.battery.presetId,
    ]);
    const selectedPreset = batterySnapshot.allBatteries.some(
        (preset) => preset.id === state.battery.presetId,
    )
        ? state.battery.presetId
        : "";
    const selectedDefaultBattery = batterySnapshot.defaultBatteries.find(
        ({ id }) => id === selectedPreset,
    );
    const selectedCustomBattery = batterySnapshot.customBatteries.find(
        ({ id }) => id === selectedPreset,
    );
    const modPresetById = useMemo(
        () => new Map(modSnapshot.allMods.map((preset) => [preset.id, preset])),
        [modSnapshot.allMods],
    );
    const selectableMods = useMemo(() => [
        ...modSnapshot.defaultMods.filter(
            (preset) => modSnapshot.visibleDefaultMods.some(({ id }) => id === preset.id)
                || preset.id === selectedModId,
        ),
        ...modSnapshot.customMods,
    ], [
        modSnapshot.customMods,
        modSnapshot.defaultMods,
        modSnapshot.visibleDefaultMods,
        selectedModId,
    ]);
    const selectedMod = modSnapshot.allMods.find(({ id }) => id === selectedModId);
    const selectedDefaultMod = modSnapshot.defaultMods.find(({ id }) => id === selectedModId);
    const selectedCustomMod = modSnapshot.customMods.find(({ id }) => id === selectedModId);
    const selectedModOptions = selectedMod === undefined ? [] : modBatteryOptions(selectedMod);
    const selectedModOption = selectedModOptions.find(({ id }) => id === selectedModConfigurationId);
    const selectedModOptionSource = selectedModOption?.source
        ?? (selectedModOptions.length > 0 && selectedModOptions.every(({ source }) => source === "board")
            ? "board"
            : "device");
    const configurationLockedByDevice = selectedModOption?.source === "device";
    const seriesConstrainedByBoard = selectedModOption?.source === "board";
    const selectedBattery = batterySnapshot.allBatteries.find(({ id }) => id === selectedPreset);
    const batteryCompatibility = modBatteryCompatibility(selectedBattery, selectedModOption);
    const limitViolations = modLimitViolations(state.device, selectedMod);
    const resetVisible = !sameState(state, defaultState) || ratingMethod !== defaultRatingMethod
        || selectedModId !== "" || selectedModConfigurationId !== "";

    const applySelectedModOption = (option: ModBatteryOption) => {
        setSelectedModConfigurationId(option.id);
        setUsesCustomModConfiguration(false);
        setEditingCustomConfiguration(false);
        setState((current) => ({
            ...current,
            battery: applyModBatteryOption(current.battery, option),
        }));
    };
    const chooseMod = (id: string) => {
        setInputReset((revision) => revision + 1);
        setSelectedModId(id);
        setSelectedModConfigurationId("");
        setUsesCustomModConfiguration(false);
        setEditingCustomConfiguration(false);
        if (id === "") return;
        const mod = modSnapshot.allMods.find((item) => item.id === id);
        if (mod === undefined) return;
        const options = modBatteryOptions(mod);
        const selectedFormat = batteryPresetFormat(selectedBattery);
        const matchingOptions = selectedFormat === undefined
            ? []
            : options.filter((option) => option.format === selectedFormat);
        const option = options.length === 1 ? options[0]
            : matchingOptions.length === 1 ? matchingOptions[0] : undefined;
        const mode = preferredDeviceModeForMod(mod, state.device.mode);
        const voltage = mode === "unregulated"
            ? recommendedBatteryVoltage(mode)
            : state.device.mode === "unregulated"
                ? recommendedBatteryVoltage(mode)
                : state.battery.voltage;
        setState((current) => ({
            device: { ...current.device, mode },
            battery: option === undefined
                ? { ...current.battery, voltage }
                : applyModBatteryOption({ ...current.battery, voltage }, option),
        }));
        if (option !== undefined) {
            setSelectedModConfigurationId(option.id);
            setUsesCustomModConfiguration(false);
            setEditingCustomConfiguration(false);
        }
        if (voltage !== state.battery.voltage) {
            const nextDrafts = { ...draftsRef.current, voltage: String(voltage) };
            draftsRef.current = nextDrafts;
            setDrafts(nextDrafts);
        }
    };
    const chooseModConfiguration = (id: string) => {
        setInputReset((revision) => revision + 1);
        if (id === "") {
            setSelectedModConfigurationId("");
            setUsesCustomModConfiguration(true);
            setEditingCustomConfiguration(true);
            return;
        }
        const option = selectedModOptions.find((candidate) => candidate.id === id);
        if (option !== undefined) applySelectedModOption(option);
    };
    const limitViolationText = (violation: ModLimitViolation): ReactNode => {
        if (violation.field === "power") {
            return <>{messages.outputPower}: {format(violation.actual)} W &gt; {modMessages.maxPower}:
                {` ${format(violation.limit)} W`}</>;
        }
        if (violation.field === "voltage") {
            return <>{messages.outputVoltage}: {format(violation.actual)} V &gt; {modMessages.maxVoltage}:
                {` ${format(violation.limit)} V`}</>;
        }
        if (violation.field === "current") {
            return <>{messages.currentLabel}: {format(violation.actual)} A &gt; {modMessages.maxCurrent}:
                {` ${format(violation.limit)} A`}</>;
        }
        const comparison = violation.field === "minimum-resistance" ? "<" : ">";
        return <>{messages.atomizerResistance}: {format(violation.actual)} Ω {comparison}
            {` ${format(violation.limit)} Ω`}</>;
    };
    const batteryCurrent = (preset: BatteryPreset): number =>
        preset.continuousDischargeCurrentAmps
        ?? (preset.ratedCapacityMah / 1000) * (preset.continuousDischargeCRating ?? 0);
    const configurations = [
        ["1s", 1, 1, messages.singleCell], ["2s", 2, 1, "2S"], ["2p", 1, 2, "2P"],
        ["3s", 3, 1, "3S"], ["3p", 1, 3, "3P"], ["4s", 4, 1, "4S"],
        ["4p", 1, 4, "4P"], ["2s2p", 2, 2, "2S2P"],
    ] as const;
    const commonConfiguration = configurations.find(([, series, parallel]) =>
        series === state.battery.seriesCells && parallel === state.battery.parallelStrings)?.[0];
    const selectedConfiguration = editingCustomConfiguration ? "custom" : commonConfiguration ?? "custom";
    const availableConfigurations = seriesConstrainedByBoard
        ? configurations.filter(([, series]) => series === selectedModOption?.seriesCells)
        : configurations;
    const setConfiguration = (id: string) => {
        setInputReset((revision) => revision + 1);
        if (!seriesConstrainedByBoard) {
            setSelectedModConfigurationId("");
            if (selectedMod !== undefined) setUsesCustomModConfiguration(true);
        }
        if (id === "custom") {
            setEditingCustomConfiguration(true);
            return;
        }
        const configuration = configurations.find(([candidate]) => candidate === id);
        if (!configuration) return;
        setEditingCustomConfiguration(false);
        setState((current) => ({
            ...current,
            battery: { ...current.battery, seriesCells: configuration[1], parallelStrings: configuration[2] },
        }));
    };
    const setConfigurationField = (field: "seriesCells" | "parallelStrings", raw: string) => {
        const value = Number(raw);
        if (!Number.isInteger(value) || value < 1 || value > 8) return;
        if (field === "seriesCells" && seriesConstrainedByBoard) return;
        if (!seriesConstrainedByBoard) {
            setSelectedModConfigurationId("");
            if (selectedMod !== undefined) setUsesCustomModConfiguration(true);
        }
        setEditingCustomConfiguration(true);
        setState((current) => ({ ...current, battery: { ...current.battery, [field]: value } }));
    };
    const useCustomConfiguration = () => {
        setSelectedModConfigurationId("");
        setUsesCustomModConfiguration(true);
    };
    const draftErrors = (() => {
        const errors: Partial<Record<DeviceField | BatteryField, string>> = {};
        const fields: Array<[DeviceField | BatteryField, string, string]> = [
            ["voltage", messages.voltage, drafts.voltage],
            ["capacityMah", messages.capacity, drafts.capacityMah],
            ["maximumCurrent", messages.maximumCurrent, drafts.maximumCurrent],
            ["cRating", messages.cRating, drafts.cRating],
            ["nominalVoltage", messages.nominalVoltage, drafts.nominalVoltage],
        ];
        if (state.device.mode !== "power-regulated") {
            fields.unshift(["atomizerResistance", messages.atomizerResistance, drafts.atomizerResistance]);
        }
        if (state.device.mode !== "unregulated") {
            fields.push(["efficiency", messages.efficiency, drafts.efficiency]);
            if (state.device.mode === "power-regulated") {
                fields.push(["outputPower", messages.outputPower, drafts.outputPower]);
            } else if (state.device.mode === "voltage-regulated") {
                fields.push(["outputVoltage", messages.outputVoltage, drafts.outputVoltage]);
            } else {
                fields.push(["outputCurrent", messages.currentLabel, drafts.outputCurrent]);
            }
        }
        fields.forEach(([field, label, value]) => {
            const parsed = parseNumericInput(value);
            if (value.trim() === "" || parsed === undefined) errors[field] = `${messages.enterValue} ${label}.`;
            else if (parsed <= 0) errors[field] = `${label}: > 0`;
            else if (field === "efficiency" && parsed > 100) {
                errors[field] = `${messages.efficiency}: ≤ 100%`;
            }
        });
        return errors;
    })();
    const resultsUseLastValidValues = Object.keys(draftErrors).length > 0;

    return <NumericDraftReset.Provider value={inputReset}>
        <SiteLayout basePath="./" className="battery-app" currentRoute="batt" rootHref=".">
        <main id="main" className="page-content">
            <CalculatorPageHeader className="battery-page-header" eyebrow={messages.eyebrow}
                title={messages.title} description={messages.description}
                actionsClassName="se-page-header__action-buttons battery-page-header__actions" actions={<>
                    {resetVisible && <button type="button" onClick={reset}>
                        <FontAwesomeIcon icon={faRotateLeft} /> {messages.reset}
                    </button>}
                </>} />
            <div className="se-sidebar-layout battery-layout">
                <section className="se-card battery-card" aria-labelledby="battery-device-title">
                    <h2 id="battery-device-title">{messages.device}</h2>
                    <div className="battery-preset-controls">
                        <SelectField fieldClassName="se-field battery-field" label={modMessages.preset}
                            ariaLabel={modMessages.preset} id="battery-mod-preset" value={selectedModId}
                            onChange={chooseMod}>
                            <option value="">{messages.customValues}</option>
                            {selectableMods.map((preset) => <option key={preset.id} value={preset.id}>
                                {modPresetLabel(preset, modPresetById)}
                            </option>)}
                        </SelectField>
                        <button ref={modManagerButtonRef} type="button"
                            className={`se-button battery-manage-button${showModManager
                                ? " se-button--secondary-active" : ""}`}
                            aria-expanded={showModManager} aria-controls="battery-mod-manager"
                            onClick={() => setShowModManager((visible) => !visible)}>
                            <FontAwesomeIcon icon={faSliders} aria-hidden="true" /> {modMessages.manage}
                        </button>
                    </div>
                    {showModManager && <div id="battery-mod-manager" className="battery-manager-overlay"
                        onMouseDown={(event) => {
                            if (event.target === event.currentTarget) setShowModManager(false);
                        }}>
                        <div ref={modManagerDialogRef} className="battery-manager-dialog" role="dialog"
                            aria-modal="true" aria-label={modMessages.manage} tabIndex={-1}>
                            <ModManager repository={modRepository} onClose={() => setShowModManager(false)} />
                        </div>
                    </div>}
                    {selectedDefaultMod?.slug !== undefined && <a className="battery-encyclopedia-link"
                        href={`./catalog/mod/${selectedDefaultMod.slug}`}>{modMessages.details}</a>}
                    {selectedCustomMod !== undefined
                        && <span className="battery-preset-status">{modMessages.customMod}</span>}
                    {selectedModId === ""
                        && <small className="battery-preset-help">{modMessages.selectPreset}</small>}
                    {selectedMod !== undefined && selectedModOptions.length > 1 && <SelectField
                        fieldClassName="se-field battery-field battery-mod-configuration"
                        label={selectedModOptionSource === "board"
                            ? messages.boardInputProfile
                            : messages.deviceBatterySetup}
                        ariaLabel={selectedModOptionSource === "board"
                            ? messages.boardInputProfile
                            : messages.deviceBatterySetup}
                        id="battery-mod-configuration"
                        value={selectedModConfigurationId} onChange={chooseModConfiguration}>
                        <option value="">{messages.customConfiguration}</option>
                        {selectedModOptions.map((option) => <option key={option.id} value={option.id}>
                            {modConfigurationLabel(option)}
                        </option>)}
                    </SelectField>}
                    {selectedMod !== undefined && selectedModOptions.length === 1
                        && selectedModOption !== undefined && <p className="battery-mod-profile">
                            <strong>{selectedModOption.source === "board"
                                ? messages.boardInputProfile
                                : messages.deviceBatterySetup}</strong>
                            <span>{modConfigurationLabel(selectedModOption)}</span>
                        </p>}
                    {batteryCompatibility === "incompatible" && <p
                        className="se-alert se-alert--warning battery-mod-status" role="alert">
                        <FontAwesomeIcon icon={faTriangleExclamation} /> {messages.batteryConfiguration}:
                        {` ${selectedModOption?.format}`} · {messages.cellSelection}:
                        {` ${batteryPresetFormat(selectedBattery)}`}
                    </p>}
                    {limitViolations.length > 0 && <ul
                        className="se-alert se-alert--warning battery-mod-limits" role="alert">
                        {limitViolations.map((violation) => <li key={violation.field}>
                            <FontAwesomeIcon icon={faTriangleExclamation} /> {limitViolationText(violation)}
                        </li>)}
                    </ul>}
                    <fieldset className="battery-choice">
                        <legend>{messages.operatingMode}</legend>
                        <label><input type="radio" name="device-mode" checked={state.device.mode === "power-regulated"}
                            disabled={modDeviceModeStatus(selectedMod, "power-regulated") === "unsupported"}
                            onChange={() => setDeviceMode("power-regulated")} /> {messages.powerRegulated}
                            {selectedMod !== undefined
                                && modDeviceModeStatus(selectedMod, "power-regulated") === "unknown"
                                ? ` (${messages.notVerified})` : ""}</label>
                        <label><input type="radio" name="device-mode"
                            checked={state.device.mode === "voltage-regulated"}
                            disabled={modDeviceModeStatus(selectedMod, "voltage-regulated") === "unsupported"}
                            onChange={() => setDeviceMode("voltage-regulated")} /> {messages.voltageRegulated}
                            {selectedMod !== undefined
                                && modDeviceModeStatus(selectedMod, "voltage-regulated") === "unknown"
                                ? ` (${messages.notVerified})` : ""}</label>
                        <label><input type="radio" name="device-mode"
                            checked={state.device.mode === "current-regulated"}
                            disabled={modDeviceModeStatus(selectedMod, "current-regulated") === "unsupported"}
                            onChange={() => setDeviceMode("current-regulated")} /> {messages.currentRegulated}
                            {selectedMod !== undefined
                                && modDeviceModeStatus(selectedMod, "current-regulated") === "unknown"
                                ? ` (${messages.notVerified})` : ""}</label>
                        <label><input type="radio" name="device-mode" checked={state.device.mode === "unregulated"}
                            disabled={modDeviceModeStatus(selectedMod, "unregulated") === "unsupported"}
                            onChange={() => setDeviceMode("unregulated")} />
                            {modDeviceModeStatus(selectedMod, "unregulated") === "supported"
                                ? ` ${messages.bypass}` : ` ${messages.unregulated}`}
                            {selectedMod !== undefined
                                && modDeviceModeStatus(selectedMod, "unregulated") === "unknown"
                                ? ` (${messages.notVerified})` : ""}</label>
                    </fieldset>
                    {state.device.mode !== "power-regulated" && <NumberField
                        id="battery-atomizer-resistance" label={messages.atomizerResistance}
                        value={drafts.atomizerResistance} unit="Ω" min="0.05" step="0.05"
                        error={draftErrors.atomizerResistance} errorClassName="battery-field-error"
                        onChange={(value) => updateDraft("atomizerResistance", value)}
                        onCommit={() => commitField("atomizerResistance")} />}
                    {state.device.mode === "power-regulated" && <NumberField
                        id="battery-output-power" label={messages.outputPower} value={drafts.outputPower} unit="W"
                        min="1" step="1"
                        error={draftErrors.outputPower} errorClassName="battery-field-error"
                        onChange={(value) => updateDraft("outputPower", value)}
                        onCommit={() => commitField("outputPower")} />}
                    {state.device.mode === "voltage-regulated" && <NumberField
                        id="battery-output-voltage" label={messages.outputVoltage} value={drafts.outputVoltage} unit="V"
                        error={draftErrors.outputVoltage} errorClassName="battery-field-error"
                        onChange={(value) => updateDraft("outputVoltage", value)}
                        onCommit={() => commitField("outputVoltage")} />}
                    {state.device.mode === "current-regulated" && <NumberField
                        id="battery-output-current" label={messages.currentLabel} value={drafts.outputCurrent} unit="A"
                        error={draftErrors.outputCurrent} errorClassName="battery-field-error"
                        onChange={(value) => updateDraft("outputCurrent", value)}
                        onCommit={() => commitField("outputCurrent")} />}
                    {state.device.mode !== "unregulated" && <NumberField id="battery-efficiency"
                        label={messages.efficiency}
                        value={drafts.efficiency} unit="%"
                        error={draftErrors.efficiency} errorClassName="battery-field-error"
                        min="1" max="100" onChange={(value) => updateDraft("efficiency", value)}
                        onCommit={() => commitField("efficiency")} />}
                </section>
                <section className="se-card battery-card" aria-labelledby="battery-settings-title">
                    <h2 id="battery-settings-title">{messages.batteryValues}</h2>
                    <p className="se-muted-copy battery-intro">{messages.batteryIntro}</p>
                    <div className="battery-preset-controls">
                        <SelectField fieldClassName="se-field battery-field" label={messages.batteryPreset}
                            ariaLabel={messages.batteryPreset} value={selectedPreset} onChange={choosePreset}>
                                <option value="">{messages.customValues}</option>
                                {selectablePresets.map((preset) => <option key={preset.id} value={preset.id}>
                                    {preset.displayName} ({preset.ratedCapacityMah} mAh,
                                    {` ${format(batteryCurrent(preset), 1)} A`})
                                </option>)}
                        </SelectField>
                        <button ref={managerButtonRef} type="button" className={`se-button battery-manage-button${
                            showBatteryManager ? " se-button--secondary-active" : ""}`}
                            aria-expanded={showBatteryManager} aria-controls="battery-manager"
                            onClick={() => setShowBatteryManager((visible) => !visible)}>
                            <FontAwesomeIcon icon={faSliders} aria-hidden="true" /> {messages.manage}
                        </button>
                    </div>
                    {showBatteryManager && <div id="battery-manager" className="battery-manager-overlay"
                        onMouseDown={(event) => {
                            if (event.target === event.currentTarget) setShowBatteryManager(false);
                        }}>
                        <div ref={managerDialogRef} className="battery-manager-dialog" role="dialog"
                            aria-modal="true" aria-label={messages.manage} tabIndex={-1}>
                            <BatteryManager repository={batteryRepository}
                                onClose={() => setShowBatteryManager(false)} />
                        </div>
                    </div>}
                    {selectedDefaultBattery?.slug !== undefined && <a className="battery-encyclopedia-link"
                        href={`./catalog/battery/${selectedDefaultBattery.slug}`}>{messages.detailsBattery}</a>}
                    {selectedCustomBattery !== undefined
                        && <span className="battery-preset-status">{messages.customBattery}</span>}
                    {selectedPreset === "" && <small className="battery-preset-help">{messages.selectPreset}</small>}
                    <SelectField fieldClassName="se-field battery-field" label={messages.batteryConfiguration}
                        ariaLabel={messages.batteryConfiguration} value={selectedConfiguration}
                        disabled={configurationLockedByDevice} onChange={setConfiguration}>
                        {availableConfigurations.map(([id, , , label]) =>
                            <option key={id} value={id}>{label}</option>)}
                        <option value="custom">{messages.customConfiguration}</option>
                    </SelectField>
                    {configurationLockedByDevice && <button type="button"
                        className="se-button battery-custom-configuration" onClick={useCustomConfiguration}>
                        {messages.customConfiguration}
                    </button>}
                    {selectedConfiguration === "custom" && <div className="battery-configuration-fields">
                        <NumericField label={messages.cellsInSeries} ariaLabel={messages.cellsInSeries}
                            value={String(state.battery.seriesCells)} min="1" max="8" step="1" integer
                            fieldClassName="se-field battery-field"
                            disabled={configurationLockedByDevice || seriesConstrainedByBoard}
                            onChange={(value) => setConfigurationField("seriesCells", value)} />
                        <NumericField label={messages.parallelStrings} ariaLabel={messages.parallelStrings}
                            value={String(state.battery.parallelStrings)} min="1" max="8" step="1" integer
                            fieldClassName="se-field battery-field" disabled={configurationLockedByDevice}
                            onChange={(value) => setConfigurationField("parallelStrings", value)} />
                    </div>}
                    {selectedModOption !== undefined && selectedMod !== undefined && <small
                        className="battery-configuration-source">
                        {selectedModOption.source === "board"
                            ? messages.boardInputProfile
                            : messages.deviceBatterySetup}: {modConfigurationLabel(selectedModOption)} ·
                        {` ${selectedMod.displayName}`}
                    </small>}
                    <p className="battery-configuration-summary">
                        {state.battery.seriesCells}S × {state.battery.parallelStrings}P = {state.battery.seriesCells
                            * state.battery.parallelStrings} {cellCountLabel(
                            state.battery.seriesCells * state.battery.parallelStrings, pageLocale(), messages)}
                    </p>
                    {state.battery.seriesCells * state.battery.parallelStrings > 1 && <p
                        className="se-alert se-alert--info battery-matched-cells">{messages.matchedCells}</p>}
                    <NumberField label={state.device.mode === "unregulated"
                        ? messages.batteryVoltage
                        : messages.cellVoltageNearCutoff} id="battery-cell-voltage" value={drafts.voltage} unit="V"
                        error={draftErrors.voltage} errorClassName="battery-field-error"
                        onChange={(value) => updateDraft("voltage", value)} onCommit={() => commitField("voltage")} />
                    <p className="se-muted-copy battery-voltage-help">
                        {state.device.mode === "unregulated"
                            ? messages.unregulatedVoltageHelp
                            : messages.regulatedVoltageHelp}
                    </p>
                    <NumberField id="battery-capacity" label={messages.capacity} value={drafts.capacityMah}
                        unit="mAh" step="1" min="1"
                        error={draftErrors.capacityMah} errorClassName="battery-field-error"
                        onChange={(value) => updateDraft("capacityMah", value)}
                        onCommit={() => commitField("capacityMah")} />
                    <fieldset className="battery-choice battery-rating-method">
                        <legend>{messages.maximumCurrent} / {messages.cRating}</legend>
                        <label><input type="radio" name="rating-method" checked={ratingMethod === "amps"}
                            onChange={() => selectRatingMethod("amps")} /> {messages.maximumCurrent}</label>
                        <label><input type="radio" name="rating-method" checked={ratingMethod === "c-rating"}
                            onChange={() => selectRatingMethod("c-rating")} /> {messages.cRating}</label>
                    </fieldset>
                    <NumberField id="battery-maximum-current" label={ratingMethod === "amps"
                        ? messages.maximumCurrent
                        : <>{messages.maximumCurrent} = {messages.capacity} × {messages.cRating}</>}
                        ariaLabel={messages.maximumCurrent}
                        value={drafts.maximumCurrent} unit="A" disabled={ratingMethod !== "amps"}
                        error={draftErrors.maximumCurrent} errorClassName="battery-field-error"
                        onChange={(value) => updateDraft("maximumCurrent", value)}
                        onCommit={() => commitField("maximumCurrent")} />
                    <NumberField id="battery-c-rating" label={ratingMethod === "c-rating"
                        ? messages.cRating
                        : <>{messages.cRating} = {messages.maximumCurrent} ÷ {messages.capacity}</>}
                        ariaLabel={messages.cRating}
                        value={drafts.cRating} unit="C" disabled={ratingMethod !== "c-rating"}
                        error={draftErrors.cRating} errorClassName="battery-field-error"
                        onChange={(value) => updateDraft("cRating", value)} onCommit={() => commitField("cRating")} />
                    <NumberField id="battery-nominal-voltage" label={messages.nominalVoltage}
                        value={drafts.nominalVoltage} unit="V"
                        error={draftErrors.nominalVoltage} errorClassName="battery-field-error"
                        onChange={(value) => updateDraft("nominalVoltage", value)}
                        onCommit={() => commitField("nominalVoltage")} />
                    <p className="se-muted-copy battery-help">{messages.batteryHelp}</p>
                </section>
                <section className="se-sidebar-layout__output battery-output" aria-live="polite"
                    aria-label={messages.results}>
                    {result.kind === "valid" && resultsUseLastValidValues && <p
                        className="se-alert se-alert--info battery-stale-results" role="status">
                        {messages.resultsUseLastValidValues}
                    </p>}
                    {result.kind === "invalid" && <p
                        className="se-alert se-alert--warning battery-validation" role="alert">
                        {result.message}
                    </p>}
                    {result.kind === "valid" && <>
                        {result.values.warning && <p className="se-alert se-alert--warning battery-warning"
                            role="alert">
                            <FontAwesomeIcon icon={faTriangleExclamation} /> {result.values.warning}
                        </p>}
                        <div className="se-result-grid battery-results-grid">
                            <article className={`se-card se-result-grid__primary battery-result battery-result--${
                                result.values.safety.status}`}>
                                <h3>{messages.batterySafety}</h3>
                                <p className="battery-safety-summary">
                                    <strong>{format(result.values.safety.currentPerCell)} A /
                                        {` ${format(result.values.safety.effectiveLimit)} A`}</strong>
                                    <span>
                                        {format(result.values.safety.headroomPercent)}% {messages.currentHeadroom}
                                    </span>
                                </p>
                                <p>{result.values.safety.status === "danger"
                                    ? messages.danger
                                    : result.values.safety.status === "caution"
                                        ? messages.caution
                                        : messages.safe}</p>
                            </article>
                            <article className="se-card battery-result">
                                <h3><FontAwesomeIcon icon={faBatteryFull} /> {messages.atomizerOutput}</h3>
                                {state.device.mode === "power-regulated"
                                    ? <dl className="se-result-list battery-result-list">
                                        <div><dt>{messages.powerLabel}</dt>
                                            <dd>{format(result.values.atomizer.power)} W</dd></div>
                                    </dl>
                                    : <OutputTable values={result.values.atomizer} messages={messages} />}
                            </article>
                            <article className="se-card battery-result">
                                <h3>{messages.pack}</h3>
                                <dl className="se-result-list battery-result-list">
                                    <div><dt>{messages.voltageLabel}</dt>
                                        <dd>{format(result.values.pack.voltage)} V</dd></div>
                                    <div><dt>{messages.currentLabel}</dt>
                                        <dd>{format(result.values.pack.current)} A</dd></div>
                                    <div><dt>{messages.powerLabel}</dt>
                                        <dd>{format(result.values.pack.power)} W</dd></div>
                                    <div><dt>{messages.capacity}</dt>
                                        <dd>{format(result.values.pack.capacityMah, 0)} mAh</dd></div>
                                </dl>
                            </article>
                            <article className="se-card battery-result">
                                <h3>{messages.continuousRuntime}</h3>
                                <p className="battery-runtime-value">
                                    <strong>{format(result.values.runtime.continuousMinutes, 1)} min</strong>
                                </p>
                                <p>{messages.runtimeHelp}</p>
                                <dl className="se-result-list battery-result-list">
                                    <div><dt>{messages.nominalEnergy}</dt>
                                        <dd>{format(result.values.runtime.nominalEnergyWh)} Wh</dd></div>
                                </dl>
                            </article>
                        </div>
                    </>}
                </section>
            </div>
            <CalculatorLegacyNote href="old/batt" />
        </main>
        </SiteLayout>
    </NumericDraftReset.Provider>;
};
