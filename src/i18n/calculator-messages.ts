import type { Locale } from "./locales";
import { toNynorsk } from "./nynorsk";

export type CalculatorRouteMessages = Readonly<Record<string, string>>;

export type CalculatorMessages = Readonly<{
    readonly batt: CalculatorRouteMessages;
    readonly coil: CalculatorRouteMessages;
    readonly converter: CalculatorRouteMessages;
    readonly juice: CalculatorRouteMessages;
    readonly modrange: CalculatorRouteMessages;
    readonly tcr: CalculatorRouteMessages;
    readonly wirewiz: CalculatorRouteMessages;
}>;

export const english: CalculatorMessages = {
    batt: {
        eyebrow: "Battery safety calculator", title: "Battery drain",
        description: "Estimate atomizer output, battery drain, and available current headroom for regulated and unregulated mods.",
        manage: "Manage batteries", reset: "Reset", device: "Device", deviceType: "Device type",
        powerRegulated: "Power regulated mod", voltageRegulated: "Voltage regulated mod", unregulated: "Unregulated mod",
        atomizerResistance: "Atomizer resistance", outputPower: "Output power", outputVoltage: "Output voltage",
        efficiency: "Efficiency", batteryPresets: "Battery presets",
        batteryIntro: "Choose a built-in battery preset or enter your own values below.", batteryPreset: "Battery preset",
        customValues: "Custom values", detailsBattery: "Details about this battery", customBattery: "Custom battery",
        selectPreset: "Select a preset here", batteryValues: "Battery values", batteryVoltage: "Battery voltage", voltage: "Voltage", capacity: "Capacity",
        maximumCurrent: "Maximum current", cRating: "C rating", nominalVoltage: "Nominal voltage",
        batteryHelp: "Nominal voltage and capacity determine the estimated stored energy and continuous runtime. They do not affect the current limit.",
        results: "Results", enterValue: "Enter a value for", atomizerOutput: "Atomizer output", batteryDrain: "Battery drain",
        batterySafety: "Battery safety", effectiveMaximumCurrent: "Effective maximum current", currentHeadroom: "Current headroom",
        estimatedRuntime: "Estimated runtime", nominalEnergy: "Nominal energy", continuousRuntime: "Continuous runtime",
        safe: "The estimated drain is within the effective battery limit.",
        caution: "Less than 20% current headroom remains.",
        danger: "The estimated drain exceeds the effective battery limit.",
        runtimeHelp: "This idealized estimate assumes continuous output at the calculated battery power. Real runtime varies with cutoff voltage, voltage sag, cell age, device overhead, and intermittent use.",
        voltageLabel: "Voltage", currentLabel: "Current", powerLabel: "Power",
    },
    coil: {
        eyebrow: "Coil wrapping calculator", title: "Plan your coil",
        description: "Choose your wire and build parameters to estimate wraps, resistance, and heat.",
        advanced: "Advanced", manageMaterials: "Manage materials", converter: "Converter", hideConverter: "Hide converter",
        reset: "Reset", coilSpecifications: "Coil specifications", units: "Units", metric: "Metric units",
        imperial: "Imperial units", material: "Material", wireProfile: "Wire profile", roundWire: "Round wire",
        twistedParallelRound: "Twisted / parallel round wire", ribbonWire: "Ribbon wire", twistPitch: "Twist pitch",
        twistHelp: "0 means parallel wire without twisting.", strands: "Number of strands", awg: "AWG",
        wireDiameter: "Wire diameter", awgApproximation: "The AWG value is an approximation for this diameter.",
        ribbonWidth: "Ribbon width", ribbonThickness: "Ribbon thickness", swapRibbon: "Swap width and thickness",
        setup: "Setup", singleCoil: "A single coil.", targetResistance: "Target resistance", buildDetails: "Build details",
        resistanceWireLength: "Resistance wire length", manualLength: "Manual edits hold the wire length until another setting recalculates it.",
        innerDiameter: "Inner diameter", legLength: "Leg length", total: "Total", perCoil: "per coil",
        wrapSpacing: "Wrap spacing", twistedLimit: "Twisted wire is limited to four strands.", results: "Results",
        wraps: "Number of wraps", resistancePerCoil: "Resistance per coil", heatCapacity: "Heat capacity",
        legPowerLoss: "Leg power loss", wireLengthWarning: "There is not enough wire left for the coil after the legs.",
        heatFlux: "Heat flux", targetHeatFlux: "Target heat flux", recommendedPower: "Recommended power:",
        recommendedVoltage: "Recommended voltage:", coilDimensions: "Coil dimensions", wireLengthInCoil: "Wire length in coil",
        outerDiameter: "Outer diameter", neutralAxisDiameter: "Neutral-axis diameter", loopCircumference: "Loop circumference",
        helixAngle: "Helix angle", loopLength: "Loop length", coilWidth: "Coil width", surfaceArea: "Surface area",
        coilArea: "Coil area", crossSectionalArea: "Cross-sectional area", wireVolume: "Wire volume", density: "Density",
        wireMass: "Wire mass", unavailable: "Unavailable", resistanceActual: "actual resistance", builtInMaterials: "Built-in materials", customMaterials: "Custom materials", unavailableMaterial: "Unavailable material", setupSingle: "Single coil", setupParallel2: "Dual coil (parallel)", setupParallel3: "Triple coil (parallel)", setupParallel4: "Quad coil (parallel)", setupParallel5: "Five coils (parallel)", setupParallel6: "Six coils (parallel)", setupParallel7: "Seven coils (parallel)", setupParallel8: "Eight coils (parallel)", setupSeries2: "Dual coil (series)", setupSeries3: "Triple coil (series)", setupSeries4: "Quad coil (series)", setupSeriesParallel4: "Quad coil (series-parallel)",
    },
    converter: {
        eyebrow: "Wire and dimension conversion", title: "Converter",
        description: "Convert between millimetres, inches, AWG, BWG, SWG, and fractional inches.",
        embeddedDescription: "Convert between millimetres, inches, wire gauges, and fractional inches.",
        input: "Input", value: "Value", inputValue: "Input value", inputUnit: "Input unit", result: "Result",
        millimetres: "Millimetres", inches: "Inches", americanWireGauge: "American Wire Gauge", needleGauge: "BWG (needle gauge)", standardWireGauge: "Standard Wire Gauge", fractionalInches: "Fractional inches",
        reset: "Reset defaults", betweenStandardValues: "Between standard values", larger: "larger", smaller: "smaller",
        swap: "Swap input and output", outputSettings: "Output settings", outputUnit: "Output unit",
        decimalPlaces: "Decimal places", precisionHelp: "Precision applies to numeric results. Gauge tables remain at their published values.",
    },
    juice: {
        eyebrow: "Liquid mixing calculator", title: "Dilute and mix",
        description: "Input the properties of your nicotine base and your desired mix.", menu: "Menu", reset: "Reset",
        load: "Load", save: "Save", batch: "Batch", amount: "Amount you want to make", nicStrengthIn: "Nic strength in",
        nicotine: "Nicotine", nicotineBaseIngredient: "Nicotine base",
        volume: "Volume", weight: "Weight", flavoring: "Flavoring", add: "Add", remove: "Remove", flavor: "Flavor",
        percentage: "Percentage", vg: "VG", pg: "PG", vgDefaultTitle: "Default is PG based.", delete: "Delete",
        nicBase: "Nic base", baseLabel: "what's on the label", nicStrength: "Nic strength", target: "Target",
        targetLabel: "what you're shooting for", hideDetails: "Hide details", showDetails: "Show details",
        recipe: "Recipe", addColumn: "Add", sum: "Sum", density: "Density", canMix: "This can be mixed.",
        cannotMix: "This mix is not feasible.", adjustMix: "You may need to lower your target nic, VG or PG content, or flavoring. Alternatively, use a stronger nic base, or a nic base with a different VG/PG ratio. Please adjust your settings until all numbers are greater than zero.",
        targetNicWarning: "Your target nic level is higher than your nic base strength. You should either get a stronger nic base, or lower your target nic strength.",
        safety: "Safety", safetyText: "Concentrated nicotine can harm or kill children, pets, or even adults. Please inform yourself of how to mitigate the dangers before you try mixing your own. If you want to be a hundred percent certain about your calculations, you should double check your results using other tools as well.",
        saved: "Settings have been saved.", saveFailed: "Settings could not be saved in this browser.", noSaved: "No saved settings were found.", loaded: "Settings have been loaded.", defaultsRestored: "Default settings have been restored.",
        flavorName: "Flavor", flavorPercentage: "Flavor percentage", flavorVg: "Flavor is VG based", ratio: "VG/PG ratio",
        ingredient: "Ingredient", ml: "ml", grams: "g", densityUnit: "Density:", negativeValue: "A negative value means that the current mix is not feasible.",
    },
    modrange: {
        eyebrow: "Regulated mod calculator", title: "Mod range",
        description: "Find a useful resistance range from a regulated mod's output limits.", manage: "Manage mods", reset: "Reset",
        builtInDevices: "Built-in devices", presets: "Presets", presetIntro: "Choose a regulated mod preset.",
        preset: "Regulated mod preset", choosePreset: "Choose a preset", details: "Details about this mod", customMod: "Custom mod", selectPreset: "Select a preset here",
        specs: "Mod specs", maxPower: "Maximum power", maxVoltage: "Maximum voltage", maxCurrent: "Maximum current",
        minResistance: "Minimum resistance (optional)", maxResistance: "Maximum resistance (optional)", noLowerLimit: "No configured lower limit", noUpperLimit: "No configured upper limit",
        results: "Results", optimalResistance: "Optimal resistance", maximumPowerRange: "Maximum-power range", medianResistance: "Median resistance", sweetSpot: "Sweet spot", currentLimit: "Current limit", voltageLimit: "Voltage limit", at: "At", currentLimitRequires: "the current limit requires", voltageLimitRequires: "the voltage limit requires", resistanceAtLimit: "Resistance at the limit", voltageReachedFirst: "The voltage limit is reached first.", currentReachedFirst: "The current limit is reached first.",
        adjustedGraph: "The configured maximum power does not produce a usable resistance range with the other recorded limits. This graph uses a reduced ceiling of",
        watt: "W", ampere: "A", powerCurve: "Power curve", powerCurveDescription: "Maximum achievable power across the displayed resistance range.", powerCurveDescriptionLong: "A graph of maximum achievable power against resistance, with the calculated usable range highlighted.", powerCurveLegend: "Power curve legend", maxAchievablePower: "Maximum achievable power", optimalRange: "Optimal range", median: "Median", resistance: "Resistance", power: "Power", current: "Current", voltage: "Voltage",
    },
    tcr: {
        eyebrow: "Temperature-control wire calculator", title: "Temperature coefficient of resistance",
        description: "Compare TCR and TFR materials, combine wire resistances in parallel, and export a normalized DNA 200 resistance curve.",
        manageMaterials: "Manage materials", needModel: "Need a complete coil model?", wireWizard: "Wire Wizard", needModelText: "for wire geometry, complex constructions, and coil calculations. This focused tool remains useful for comparing and combining resistance curves.",
        controls: "Temperature points", reset: "Reset", temperatureList: "Comma-separated temperatures", temperatureScale: "Temperature scale",
        help: "Editing these values clears selected materials. DNA 200 output accepts 2–8 points and needs one point near 70 °F (about 21 °C).",
        selectMaterial: "Select material", materialToAdd: "Material to add", builtInMaterials: "Built-in materials", customMaterials: "Custom materials", selectMaterialPlaceholder: "Select a material", addMaterial: "Add material", duplicateHelp: "The same material can be added more than once.",
        results: "Resistance by temperature", baseAt20: "Base resistance is measured at 20 °C.", sensitivity: "Sensitivity", empty: "Add one or more materials to calculate a resistance curve.",
        material: "Material", baseResistance: "Base resistance", actions: "Actions", remove: "Remove", totalParallel: "Total parallel resistance", normalizedTfr: "Normalized TFR curve",
        export: "DNA 200 output", exportHelp: "The curve is normalized to its calculated resistance at exactly 20 °C.", extrapolated: "Values outside the available TFR range were linearly extrapolated.", downloadCsv: "Download CSV file", csvOutput: "DNA 200 CSV output",
        about: "How the calculation works", aboutOne: "TFR materials use their resistance-factor tables with linear interpolation between data points. Materials without a TFR table use their constant TCR value.", aboutTwo: "Multiple selected materials are treated as parallel resistances. Sensitivity compares the combined resistance change from 160–260 °C with the legacy Ni200 reference curve.",
        noticeCleared: "Temperature points changed; selected materials were cleared.", resetNotice: "TCR settings were reset.", baseFor: "Base resistance for", removeMaterial: "Remove",
    },
    wirewiz: {
        graphAll: "Individual components and final result", graphFinal: "Final wire result", strandWire: "Strand wire",
        eyebrow: "Custom wire calculator", title: "Wire Wizard", description: "Build and analyze complex wires for custom coils. The first modern version retains the legacy model and output formats.",
        manageMaterials: "Manage materials", converter: "Converter", hideConverter: "Hide converter", menu: "Menu", export: "Export", import: "Import", reset: "Reset", importDesign: "Import Wire Wizard design", resetPersistence: "Reset or import a valid design to replace the saved data.",
        coilParameters: "Coil parameters", innerDiameter: "Inner diameter", wraps: "Wraps", legLength: "Leg length", wrapSpacing: "Wrap spacing", wireDesign: "Wire design", showAllResults: "Show results for all components", temperatureControl: "Temperature control", tfrEditor: "TFR editor", dna200: "DNA200", graph: "Graph", table: "Table", equivalents: "Equivalents",
        temperaturePoints: "Temperature points (°C, comma separated)", temperatureHelp: "Keep at most seven visible levels for a readable interface. The legacy export uses every point listed here.", temperatureUnavailable: "Temperature results are unavailable:", temperatureDataExtrapolationUnavailable: "The wire design's temperature data does not cover this temperature without extrapolation.", extrapolated: "Values outside the available TFR range were linearly extrapolated.", temperatureScale: "Temperature scale", tfrTable: "The TFR table cannot be calculated:",
        temperature: "Temperature (°C)", resistanceFactor: "Resistance factor", celsius: "Celsius (°C)", fahrenheit: "Fahrenheit (°F)", referenceMaterial: "Reference material", sourceFactor: "The wire you have built has a resistance factor of", matchTemperature: "To match it on a mod set to", adjustTemperature: "adjust the temperature to approximately", or: "or", dnaUnavailable: "DNA200 output is unavailable:", downloadCsv: "Download CSV",
        wireType: "Wire type", single: "Single", parallel: "Parallel", twisted: "Twisted", clapton: "Clapton", staggeredClapton: "Staggered Clapton", addParallel: "Add parallel wire", removeWire: "Remove wire", configuration: "configuration", parallelWires: "parallel wires", results: "Results", electrical: "Electrical", resistance: "Resistance", perUnitLength: "... per unit length", thermal: "Thermal", vapingRange: "in vaping range", tcrExplanation: "The relative change in resistance between 20 °C and 300 °C.", tcPrecision: "TC precision", tcExplanation: "TCR multiplied by resistance.", heatFlux: "Heat flux", perWatt: "per Watt", heatCapacity: "Heat capacity", current: "Current", perVolt: "per Volt", powerDissipated: "Power dissipated", physical: "Physical", diameter: "Diameter", width: "Width", thickness: "Thickness", length: "Length", surfaceArea: "Surface area", crossSectionArea: "Cross section area", volume: "Volume", mass: "Mass", density: "Density", material: "Material", profile: "Profile", round: "Round", ribbon: "Ribbon", strands: "Strands", twistPitch: "Twist pitch", materialGroups: "Built-in materials", customMaterials: "Custom materials", coilParametersTitle: "Coil parameters", wireDesignTitle: "Wire design", tempControlTitle: "Temperature control",
    },
};

export const bokmaal: CalculatorMessages = {
    batt: {
        eyebrow: "Kalkulator for batterisikkerhet", title: "Batteriforbruk",
        description: "Beregn forstøverens effekt, batteriforbruk og tilgjengelig strømreserve for regulerte og uregulerte modder.",
        manage: "Administrer batterier", reset: "Tilbakestill", device: "Enhet", deviceType: "Enhetstype",
        powerRegulated: "Effektregulert mod", voltageRegulated: "Spenningsregulert mod", unregulated: "Uregulert mod",
        atomizerResistance: "Forstøvermotstand", outputPower: "Utgangseffekt", outputVoltage: "Utgangsspenning", efficiency: "Virkningsgrad",
        batteryPresets: "Batteriforvalg", batteryIntro: "Velg et innebygd batteriforvalg eller skriv inn egne verdier nedenfor.", batteryPreset: "Batteriforvalg", customValues: "Egne verdier", detailsBattery: "Detaljer om dette batteriet", customBattery: "Eget batteri", selectPreset: "Velg et forvalg her", batteryValues: "Batteriverdier", batteryVoltage: "Batterispenning", voltage: "Spenning", capacity: "Kapasitet", maximumCurrent: "Maksimal strøm", cRating: "C-verdi", nominalVoltage: "Nominell spenning", batteryHelp: "Nominell spenning og kapasitet bestemmer beregnet lagret energi og kontinuerlig driftstid. De påvirker ikke strømgrensen.", results: "Resultater", enterValue: "Skriv inn en verdi for", atomizerOutput: "Forstøverutgang", batteryDrain: "Batteriforbruk", batterySafety: "Batterisikkerhet", effectiveMaximumCurrent: "Effektiv maksimal strøm", currentHeadroom: "Strømreserve", estimatedRuntime: "Beregnet driftstid", nominalEnergy: "Nominell energi", continuousRuntime: "Kontinuerlig driftstid", safe: "Beregnet forbruk er innenfor den effektive batterigrensen.", caution: "Mindre enn 20 % strømreserve gjenstår.", danger: "Beregnet forbruk overskrider den effektive batterigrensen.", runtimeHelp: "Dette idealiserte estimatet forutsetter kontinuerlig effekt ved beregnet batteriforbruk. Faktisk driftstid varierer med utkoblingsspenning, spenningsfall, cellealder, enhetens forbruk og avbrutt bruk.", voltageLabel: "Spenning", currentLabel: "Strøm", powerLabel: "Effekt",
    },
    coil: {
        eyebrow: "Kalkulator for spolevikling", title: "Planlegg spolen din", description: "Velg tråd og byggeparametere for å beregne viklinger, motstand og varme.", advanced: "Avansert", manageMaterials: "Administrer materialer", converter: "Konverter", hideConverter: "Skjul konverter", reset: "Tilbakestill", coilSpecifications: "Spolespesifikasjoner", units: "Enheter", metric: "Metriske enheter", imperial: "Britiske enheter", material: "Materiale", wireProfile: "Trådprofil", roundWire: "Rund tråd", twistedParallelRound: "Tvunnet / parallell rund tråd", ribbonWire: "Båndtråd", twistPitch: "Tvinnestigning", twistHelp: "0 betyr parallell tråd uten tvinn.", strands: "Antall tråder", awg: "AWG", wireDiameter: "Tråddiameter", awgApproximation: "AWG-verdien er et tilnærmet mål for denne diameteren.", ribbonWidth: "Båndbredde", ribbonThickness: "Båndtykkelse", swapRibbon: "Bytt bredde og tykkelse", setup: "Oppsett", singleCoil: "Én spole.", targetResistance: "Målmotstand", buildDetails: "Byggedetaljer", resistanceWireLength: "Motstandstrådens lengde", manualLength: "Manuelle endringer låser trådlengden til en annen innstilling beregner den på nytt.", innerDiameter: "Indre diameter", legLength: "Beinlengde", total: "Totalt", perCoil: "per spole", wrapSpacing: "Viklingsavstand", twistedLimit: "Tvunnet tråd er begrenset til fire tråder.", results: "Resultater", wraps: "Antall viklinger", resistancePerCoil: "Motstand per spole", heatCapacity: "Varmekapasitet", legPowerLoss: "Effekttap i bein", wireLengthWarning: "Det er ikke nok tråd igjen til spolen etter beina.", heatFlux: "Varmestrøm", targetHeatFlux: "Mål for varmestrøm", recommendedPower: "Anbefalt effekt:", recommendedVoltage: "Anbefalt spenning:", coilDimensions: "Spolemål", wireLengthInCoil: "Trådlengde i spolen", outerDiameter: "Ytre diameter", neutralAxisDiameter: "Diameter på nøytralaksen", loopCircumference: "Løkkeomkrets", helixAngle: "Helningsvinkel", loopLength: "Løkkelengde", coilWidth: "Spolebredde", surfaceArea: "Overflateareal", coilArea: "Spoleareal", crossSectionalArea: "Tverrsnittsareal", wireVolume: "Trådvolum", density: "Tetthet", wireMass: "Trådmasse", unavailable: "Ikke tilgjengelig", resistanceActual: "faktisk motstand", builtInMaterials: "Innebygde materialer", customMaterials: "Egendefinerte materialer", unavailableMaterial: "Utilgjengelig materiale", setupSingle: "Én spole", setupParallel2: "Dobbel spole (parallell)", setupParallel3: "Trippel spole (parallell)", setupParallel4: "Kvadrupel spole (parallell)", setupParallel5: "Fem spoler (parallell)", setupParallel6: "Seks spoler (parallell)", setupParallel7: "Sju spoler (parallell)", setupParallel8: "Åtte spoler (parallell)", setupSeries2: "Dobbel spole (serie)", setupSeries3: "Trippel spole (serie)", setupSeries4: "Kvadrupel spole (serie)", setupSeriesParallel4: "Kvadrupel spole (serie-parallell)",
    },
    converter: {
        eyebrow: "Konvertering av tråd og mål", title: "Konverter", description: "Konverter mellom millimeter, tommer, AWG, BWG, SWG og brøktommer.", embeddedDescription: "Konverter mellom millimeter, tommer, trådmål og brøktommer.", input: "Inndata", value: "Verdi", inputValue: "Inndataverdi", inputUnit: "Inndataenhet", result: "Resultat", millimetres: "Millimeter", inches: "Tommer", americanWireGauge: "American Wire Gauge", needleGauge: "BWG (nålemål)", standardWireGauge: "Standard Wire Gauge", fractionalInches: "Brøktommer", reset: "Tilbakestill standardverdier", betweenStandardValues: "Mellom standardverdier", larger: "større", smaller: "mindre", swap: "Bytt inndata og utdata", outputSettings: "Utdataoppsett", outputUnit: "Utdataenhet", decimalPlaces: "Desimalplasser", precisionHelp: "Presisjon gjelder numeriske resultater. Trådmåltabeller beholder de publiserte verdiene.",
    },
    juice: {
        eyebrow: "Kalkulator for væskeblanding", title: "Spe ut og bland", description: "Skriv inn egenskapene til nikotinbasen og blandingen du ønsker.", menu: "Meny", reset: "Tilbakestill", load: "Last inn", save: "Lagre", batch: "Blanding", amount: "Mengde du vil lage", nicStrengthIn: "Nikotinstyrke i", volume: "Volum", weight: "Vekt", flavoring: "Smakstilsetning", add: "Legg til", remove: "Fjern", flavor: "Smak", percentage: "Prosent", vg: "VG", pg: "PG", vgDefaultTitle: "Standard er PG-basert.", delete: "Slett", nicBase: "Nikotinbase", nicotine: "Nikotin", nicotineBaseIngredient: "Nikotinbase", baseLabel: "hva etiketten viser", nicStrength: "Nikotinstyrke", target: "Mål", targetLabel: "det du sikter mot", hideDetails: "Skjul detaljer", showDetails: "Vis detaljer", recipe: "Oppskrift", addColumn: "Tilsett", sum: "Sum", density: "Tetthet", canMix: "Denne blandingen kan lages.", cannotMix: "Denne blandingen kan ikke lages.", adjustMix: "Du må kanskje redusere ønsket nikotin-, VG- eller PG-innhold eller smaksmengden. Alternativt kan du bruke en sterkere nikotinbase eller en base med et annet VG/PG-forhold. Juster verdiene til alle tall er større enn null.", targetNicWarning: "Ønsket nikotinnivå er høyere enn styrken på nikotinbasen. Skaff en sterkere base eller reduser ønsket nikotinstyrke.", safety: "Sikkerhet", safetyText: "Konsentrert nikotin kan skade eller drepe barn, kjæledyr og voksne. Sett deg inn i hvordan farene kan reduseres før du blander selv. Hvis du vil være helt sikker på beregningene, bør du kontrollere resultatene med andre verktøy også.", saved: "Innstillingene er lagret.", saveFailed: "Innstillingene kunne ikke lagres i denne nettleseren.", noSaved: "Fant ingen lagrede innstillinger.", loaded: "Innstillingene er lastet inn.", defaultsRestored: "Standardinnstillingene er gjenopprettet.", flavorName: "Smak", flavorPercentage: "Smakens prosentandel", flavorVg: "Smaken er VG-basert", ratio: "VG/PG-forhold", ingredient: "Ingrediens", ml: "ml", grams: "g", densityUnit: "Tetthet:", negativeValue: "En negativ verdi betyr at blandingen ikke kan lages.",
    },
    modrange: {
        eyebrow: "Kalkulator for regulert mod", title: "Mod-område", description: "Finn et nyttig motstandsområde fra utgangsgrensene til en regulert mod.", manage: "Administrer modder", reset: "Tilbakestill", builtInDevices: "Innebygde enheter", presets: "Forvalg", presetIntro: "Velg et forvalg for en regulert mod.", preset: "Forvalg for regulert mod", choosePreset: "Velg et forvalg", details: "Detaljer om denne mod-en", customMod: "Egen mod", selectPreset: "Velg et forvalg her", specs: "Mod-spesifikasjoner", maxPower: "Maksimal effekt", maxVoltage: "Maksimal spenning", maxCurrent: "Maksimal strøm", minResistance: "Minimumsmotstand (valgfritt)", maxResistance: "Maksimumsmotstand (valgfritt)", noLowerLimit: "Ingen angitt nedre grense", noUpperLimit: "Ingen angitt øvre grense", results: "Resultater", optimalResistance: "Optimal motstand", maximumPowerRange: "Område ved maksimal effekt", medianResistance: "Medianmotstand", sweetSpot: "Ideelt punkt", currentLimit: "Strømgrense", voltageLimit: "Spenningsgrense", at: "Ved", currentLimitRequires: "krever strømgrensen", voltageLimitRequires: "krever spenningsgrensen", resistanceAtLimit: "Motstand ved grensen", voltageReachedFirst: "Spenningsgrensen nås først.", currentReachedFirst: "Strømgrensen nås først.", adjustedGraph: "Den konfigurerte maksimale effekten gir ikke et brukbart motstandsområde med de andre registrerte grensene. Grafen bruker derfor en redusert grense på", watt: "W", ampere: "A", powerCurve: "Effektkurve", powerCurveDescription: "Maksimal oppnåelig effekt over det viste motstandsområdet.", powerCurveDescriptionLong: "En graf over maksimal oppnåelig effekt mot motstand, med det beregnede brukbare området fremhevet.", powerCurveLegend: "Effektkurveforklaring", maxAchievablePower: "Maksimal oppnåelig effekt", optimalRange: "Optimalt område", median: "Median", resistance: "Motstand", power: "Effekt", current: "Strøm", voltage: "Spenning",
    },
    tcr: {
        eyebrow: "Kalkulator for temperaturkontrolltråd", title: "Temperaturkoeffisient for motstand", description: "Sammenlign TCR- og TFR-materialer, kombiner trådmotstander parallelt og eksporter en normalisert DNA 200-motstandskurve.", manageMaterials: "Administrer materialer", needModel: "Trenger du en komplett spolemodell?", wireWizard: "Wire Wizard", needModelText: "for trådgeometri, komplekse konstruksjoner og spoleberegninger. Dette fokuserte verktøyet er nyttig for å sammenligne og kombinere motstandskurver.", controls: "Temperaturpunkter", reset: "Tilbakestill", temperatureList: "Kommaseparerte temperaturer", temperatureScale: "Temperaturskala", help: "Når du redigerer disse verdiene, fjernes valgte materialer. DNA 200-utdata godtar 2–8 punkter og trenger ett punkt nær 70 °F (omtrent 21 °C).", selectMaterial: "Velg materiale", materialToAdd: "Materiale som skal legges til", builtInMaterials: "Innebygde materialer", customMaterials: "Egendefinerte materialer", selectMaterialPlaceholder: "Velg et materiale", addMaterial: "Legg til materiale", duplicateHelp: "Det samme materialet kan legges til flere ganger.", results: "Motstand etter temperatur", baseAt20: "Basismotstanden måles ved 20 °C.", sensitivity: "Følsomhet", empty: "Legg til ett eller flere materialer for å beregne en motstandskurve.", material: "Materiale", baseResistance: "Basismotstand", actions: "Handlinger", remove: "Fjern", totalParallel: "Total parallell motstand", normalizedTfr: "Normalisert TFR-kurve", export: "DNA 200-utdata", exportHelp: "Kurven normaliseres mot beregnet motstand ved nøyaktig 20 °C.", extrapolated: "Verdier utenfor tilgjengelig TFR-område er ekstrapolert lineært.", downloadCsv: "Last ned CSV-fil", csvOutput: "DNA 200 CSV-utdata", about: "Slik fungerer beregningen", aboutOne: "TFR-materialer bruker motstandsfaktortabellene sine med lineær interpolasjon mellom datapunktene. Materialer uten TFR-tabell bruker sin konstante TCR-verdi.", aboutTwo: "Flere valgte materialer behandles som parallelle motstander. Følsomheten sammenligner den kombinerte motstandsendringen fra 160–260 °C med den tidligere Ni200-referansekurven.", noticeCleared: "Temperaturpunktene ble endret; valgte materialer er fjernet.", resetNotice: "TCR-innstillingene ble tilbakestilt.", baseFor: "Basismotstand for", removeMaterial: "Fjern",
    },
    wirewiz: {
        graphAll: "Enkeltkomponenter og sluttresultat", graphFinal: "Sluttresultat for tråden", strandWire: "Tråd",
        eyebrow: "Kalkulator for egendefinert tråd", title: "Wire Wizard", description: "Bygg og analyser komplekse tråder for egendefinerte spoler. Den første moderne versjonen beholder den gamle modellen og utdataformatene.", manageMaterials: "Administrer materialer", converter: "Konverter", hideConverter: "Skjul konverter", menu: "Meny", export: "Eksporter", import: "Importer", reset: "Tilbakestill", importDesign: "Importer Wire Wizard-design", resetPersistence: "Tilbakestill eller importer et gyldig design for å erstatte de lagrede dataene.", coilParameters: "Spoleparametere", innerDiameter: "Indre diameter", wraps: "Viklinger", legLength: "Beinlengde", wrapSpacing: "Viklingsavstand", wireDesign: "Tråddesign", showAllResults: "Vis resultater for alle komponenter", temperatureControl: "Temperaturkontroll", tfrEditor: "TFR-redigering", dna200: "DNA200", graph: "Graf", table: "Tabell", equivalents: "Tilsvarende", temperaturePoints: "Temperaturpunkter (°C, kommaseparert)", temperatureHelp: "Vis høyst sju nivåer for et oversiktlig grensesnitt. Den gamle eksporten bruker alle punktene som er oppført her.", temperatureUnavailable: "Temperaturresultater er ikke tilgjengelige:", temperatureDataExtrapolationUnavailable: "Temperaturdataene for tråddesignet dekker ikke denne temperaturen uten ekstrapolering.", extrapolated: "Verdier utenfor tilgjengelig TFR-område er ekstrapolert lineært.", temperatureScale: "Temperaturskala", tfrTable: "TFR-tabellen kan ikke beregnes:", temperature: "Temperatur (°C)", resistanceFactor: "Motstandsfaktor", celsius: "Celsius (°C)", fahrenheit: "Fahrenheit (°F)", referenceMaterial: "Referansemateriale", sourceFactor: "Tråden du har bygd har en motstandsfaktor på", matchTemperature: "For å matche den på en mod satt til", adjustTemperature: "justerer du temperaturen til omtrent", or: "eller", dnaUnavailable: "DNA200-utdata er ikke tilgjengelig:", downloadCsv: "Last ned CSV", wireType: "Trådtype", single: "Enkel", parallel: "Parallell", twisted: "Tvunnet", clapton: "Clapton", staggeredClapton: "Forskjøvet Clapton", addParallel: "Legg til parallell tråd", removeWire: "Fjern tråd", configuration: "konfigurasjon", parallelWires: "parallelle tråder", results: "Resultater", electrical: "Elektrisk", resistance: "Motstand", perUnitLength: "… per lengdeenhet", thermal: "Termisk", vapingRange: "i dampingsområdet", tcrExplanation: "Den relative endringen i motstand mellom 20 °C og 300 °C.", tcPrecision: "TC-presisjon", tcExplanation: "TCR multiplisert med motstand.", heatFlux: "Varmestrøm", perWatt: "per watt", heatCapacity: "Varmekapasitet", current: "Strøm", perVolt: "per volt", powerDissipated: "Avgitt effekt", physical: "Fysisk", diameter: "Diameter", width: "Bredde", thickness: "Tykkelse", length: "Lengde", surfaceArea: "Overflateareal", crossSectionArea: "Tverrsnittsareal", volume: "Volum", mass: "Masse", density: "Tetthet", material: "Materiale", profile: "Profil", round: "Rund", ribbon: "Bånd", strands: "Tråder", twistPitch: "Tvinnestigning", materialGroups: "Innebygde materialer", customMaterials: "Egendefinerte materialer", coilParametersTitle: "Spoleparametere", wireDesignTitle: "Tråddesign", tempControlTitle: "Temperaturkontroll",
    },
};

const nynorsk = toNynorsk(bokmaal);

export const calculatorMessages: Readonly<Record<Locale, CalculatorMessages>> = {
    en: english,
    nb: bokmaal,
    nn: nynorsk,
};

export const calculatorMessagesFor = (locale: Locale): CalculatorMessages => calculatorMessages[locale];

export const calculatorMessageParityIssues = (): readonly string[] => {
    const issues: string[] = [];
    for (const route of Object.keys(english) as Array<keyof CalculatorMessages>) {
        const englishKeys = Object.keys(english[route]).sort();
        for (const locale of Object.keys(calculatorMessages) as Locale[]) {
            const localeKeys = Object.keys(calculatorMessages[locale][route]).sort();
            if (JSON.stringify(englishKeys) !== JSON.stringify(localeKeys)) {
                issues.push(`${locale}:${route}`);
            }
        }
    }
    return issues;
};
