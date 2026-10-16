import type { CatalogPresentationSet } from "../catalog-presentations";
import { batteryPresentationsFor, type BatteryTextDictionary } from "../battery-presentation-text";
import { materialPresentationsFor, type MaterialTextDictionary } from "../material-presentation-text";
import { modPresentationsFor, type ModTextDictionary } from "../mod-presentation-text";
import {
    batteryTexts as draftBatteryTexts,
    materialTexts as draftMaterialTexts,
    modTexts as draftModTexts,
    presentations as draftPresentations,
} from "./es-419";

type MutableSection = {
    id: string;
    table?: { headers: string[]; rows: string[][] };
};

type MutablePresentationSet = {
    concepts: Record<string, { displayName?: string; description?: string; summary?: string; sections: MutableSection[] }>;
};

export const batteryTexts: BatteryTextDictionary = {
    ...draftBatteryTexts,
    "battery.summary.integrated": "Un paquete de batería interno del dispositivo, no una celda que el usuario pueda "
        + "reemplazar.",
    "battery.note.approvedResearch": "Aprobado el 13 de agosto de 2026; consulta el registro de investigación asociado.",
    "battery.note.battery-71.evidence": "Clasificación continua de 20 A; no se utilizan clasificaciones de pulso.",
    "battery.safety.lowDrain": "Batería de baja descarga; no apta para vapear.",
    "battery.note.battery-77.evidence":
        "Valor comparativo independiente conservador de 20 A; la envoltura exacta y la revisión de producción "
        + "siguen siendo relevantes.",
    "battery.note.battery-78.evidence":
        "Valor conservador de 15 A obtenido en pruebas del modelo exacto; la revisión probada con la marca CCC "
        + "sigue siendo relevante.",
    "battery.note.battery-79.evidence":
        "Valor continuo independiente de 45 A para la revisión sin pestañas probada; no se deben sustituir por "
        + "clasificaciones de pulso.",
    "battery.note.battery-80.evidence":
        "Valor continuo real de 36 A; la cifra de 56 A está limitada por temperatura.",
    "battery.note.battery-81.evidence":
        "Valor conservador de 40 A; las celdas probadas parecían de preproducción y no tenían el logotipo CCC.",
    "battery.note.battery-82.evidence":
        "Valor continuo recomendado de 13 A; 16.8 A es un máximo absoluto no previsto para una vida útil prolongada.",
    "battery.note.battery-83.evidence":
        "Valor conservador de 40 A; 70 A está limitado por temperatura y las muestras probadas eran de preproducción.",
    "battery.note.battery-84.evidence":
        "Valor comparativo de 40 A para la celda de producción; 70 A requiere control de temperatura.",
    "battery.note.battery-85.evidence":
        "Valor de 40 A para la envoltura exacta; 70 A está limitado a 60 °C y las pruebas indican que es una celda "
        + "EVE 40PL reenvuelta.",
    "battery.note.battery-86.evidence":
        "Valor conservador de 19 A; las muestras exactas probadas parecían de preproducción y no tenían marcas CCC.",
    "battery.note.battery-87.evidence":
        "Valor conservador de 40 A; 90 A está limitado por temperatura y las celdas probadas parecían de preproducción.",
    "battery.note.battery-88.evidence":
        "Valor conservador de 40 A; 60 A está limitado por temperatura y la continuidad de producción sigue sin resolverse.",
    "battery.note.battery-89.evidence":
        "Valor conservador de 40 A; las muestras probadas tenían capacidad inconsistente y no tenían marcas CCC/CE.",
    "battery.note.battery-90.evidence":
        "Valor conservador de 13 A; las muestras exactas probadas parecían de preproducción y no tenían marcas CCC.",
    "battery.note.battery-91.evidence":
        "Valor continuo de 30 A estimado por el evaluador; el máximo de 50 A del Reliance está limitado por temperatura.",
    "battery.note.battery-92.evidence":
        "Valor continuo de 20 A en dos lotes probados relacionados con producción; 30 A está limitado por temperatura.",
    "battery.note.battery-93.evidence":
        "Clasificación continua de 12 A; 20 A es solo una clasificación de pulso. La envoltura exacta probada se "
        + "registra como SA110 / INR18650/40.",
    "battery.note.battery-94.evidence":
        "Valor de 20 A para la envoltura exacta; el evaluador recomienda menos de 15 A continuos. Vapehuset anuncia "
        + "25 A en el título, y las revisiones posteriores de la envoltura o del origen pueden ser diferentes.",
    "battery.note.battery-95.evidence":
        "Valor de 30 A para el modelo exacto; es una celda reenvuelta y las revisiones posteriores de la envoltura "
        + "o de la celda de origen pueden ser diferentes.",
    "battery.note.battery-96.evidence":
        "Valor de 30 A para la revisión exacta de cinco patas; las revisiones de cuatro patas y posteriores con la "
        + "misma envoltura son considerablemente diferentes y no deben heredar este perfil.",
};

export const materialTexts: MaterialTextDictionary = {
    ...draftMaterialTexts,
    "material.safety.verifiedProfile": "Usa un perfil de material verificado y respeta los límites de temperatura "
        + "y funcionamiento del dispositivo.",
};

export const modTexts: ModTextDictionary = {
    ...draftModTexts,
    "mod.preset-10.profile": "Dispositivo Cloupor de 30 W con un chipset clonado de terceros similar al DNA30, no "
        + "una tarjeta de control Evolv DNA-30D auténtica.",
    "mod.preset-231.profile": "Mod regulado para dos celdas 21700, con adaptadores para 18650; VAPORESSO especifica "
        + "220 W; las pruebas midieron 208 W, 8.979 V y 39 A.",
    "mod.preset-234.profile": "Mod regulado para dos celdas 18650; VAPORESSO especifica 220 W; las pruebas midieron "
        + "215 W, 9.08 V y 37 A.",
    "mod.preset-235.profile": "Mod regulado con batería integrada de 100 W; las pruebas midieron 101 W, 29 A y al "
        + "menos 7.97 V.",
    "mod.preset-237.profile": "Mod para una sola celda 21700 o una 18650 con adaptador; Eleaf especifica 100 W, "
        + "9 V y 0.05–3.5 Ω; las pruebas identificaron 30 A.",
    "mod.preset-236.profile": "Mod regulado para una sola celda 18650 con AS Chip 4.0; el fabricante especifica "
        + "100 W, 7.5 V, 32 A y 0.1–3 Ω.",
    "mod.preset-238.profile": "Mod squonk regulado para una sola celda 21700, 20700 o 18650 con adaptador, con un "
        + "perfil conservador de 95 W, 6 V y 34 A.",
};

const corrected = JSON.parse(JSON.stringify(draftPresentations)) as MutablePresentationSet & CatalogPresentationSet;
corrected.concepts["concept-ohms-law"].displayName = "Ley de Ohm";
corrected.concepts["concept-joule-heating"].displayName = "Calentamiento por efecto Joule";
corrected.concepts["concept-joule-heating"].description =
    "El calentamiento por efecto Joule describe la conversión de energía eléctrica en calor cuando la corriente "
    + "atraviesa una resistencia.";
corrected.concepts["concept-joule-heating"].summary =
    "Cómo la corriente eléctrica genera calor en una resistencia.";
corrected.concepts["concept-heat-flux"].displayName = "Densidad de flujo térmico";
const ohmsLawExamples = (corrected.concepts["concept-ohms-law"].sections[2] as unknown as {
    examples?: Array<{ title: string }>;
}).examples;
if (!ohmsLawExamples) throw new Error("Latin American Spanish Ohm's-law examples not found.");
ohmsLawExamples[0].title = "Calcular la corriente";
ohmsLawExamples[1].title = "Calcular la resistencia";
ohmsLawExamples[2].title = "Calcular el voltaje";
(corrected.concepts["concept-ohms-law"].sections[0] as unknown as { title: string }).title = "La relación";
const ohmsLawDefinition = corrected.concepts["concept-ohms-law"].sections[0] as unknown as { bullets: string[] };
ohmsLawDefinition.bullets[1] = "I es la corriente, medida en amperios (A).";
ohmsLawDefinition.bullets[2] = "R es la resistencia, medida en ohmios (Ω).";
const ohmsLawConversions = corrected.concepts["concept-ohms-law"].sections[4] as unknown as { bullets: string[] };
const ohmsLawRearranged = corrected.concepts["concept-ohms-law"].sections[1] as unknown as {
    paragraphs: string[];
    bullets: string[];
};
ohmsLawRearranged.paragraphs[0] = "Usa la versión que coloca a la izquierda el valor que quieres calcular:";
ohmsLawRearranged.bullets[2] = "Una resistencia de cero Ω es un cortocircuito ideal y debe manejarse por separado.";
const ohmsLawConversionIntro = corrected.concepts["concept-ohms-law"].sections[4] as unknown as {
    paragraphs: string[];
};
ohmsLawConversionIntro.paragraphs[0] = "Mantén las unidades coherentes antes de calcular:";
const ohmsLawPower = corrected.concepts["concept-ohms-law"].sections[3] as unknown as {
    title: string;
    paragraphs: string[];
};
ohmsLawPower.title = "Potencia eléctrica";
ohmsLawPower.paragraphs[0] = "La ley de Ohm se combina con la relación de potencia P = V × I. La potencia P se mide "
    + "en vatios (W). Para una fuente de 4.2 V y una carga de 1.0 Ω, la potencia ideal es 17.64 W. El componente "
    + "necesita suficiente capacidad térmica y margen para disipar el calor resultante de forma segura.";
const ohmsLawLimits = corrected.concepts["concept-ohms-law"].sections[5] as unknown as { paragraphs: string[] };
ohmsLawLimits.paragraphs[0] = "La ley de Ohm es un modelo idealizado. Los componentes reales pueden no ser óhmicos: "
    + "su resistencia puede cambiar con la temperatura, el voltaje, la corriente, la frecuencia o el estado de "
    + "funcionamiento. Para redes en serie y en paralelo, usa las leyes de Kirchhoff junto con la ley de Ohm.";
ohmsLawConversions.bullets = [
    "1 kΩ = 1,000 Ω",
    "1 MΩ = 1,000,000 Ω",
    "1 mA = 0.001 A",
    "1 W = 1,000 mW",
];

const kirchhoffSections = corrected.concepts["concept-kirchhoffs-laws"].sections;
corrected.concepts["concept-kirchhoffs-laws"].displayName = "Leyes de Kirchhoff";
const kirchhoffOverview = kirchhoffSections[0] as unknown as { bullets: string[] };
const kirchhoffCurrentLaw = kirchhoffSections[1] as unknown as { title: string };
kirchhoffOverview.bullets[1] = "Una rama es una trayectoria de corriente entre dos nodos.";
kirchhoffCurrentLaw.title = "Ley de corrientes de Kirchhoff";
const kirchhoffCurrentExplanation = kirchhoffSections[1] as unknown as { paragraphs: string[] };
kirchhoffCurrentExplanation.paragraphs[0] = "Si entran 8 A en un nodo y una rama conduce 3 A hacia afuera, las ramas "
    + "restantes deben conducir en conjunto 5 A hacia afuera. Elige los sentidos de corriente antes de resolver; un "
    + "resultado negativo indica que la corriente real fluye en sentido opuesto al supuesto.";

const wireGaugeSections = corrected.concepts["concept-wire-gauges-awg-swg-bwg"].sections;
corrected.concepts["concept-wire-gauges-awg-swg-bwg"].displayName = "Calibres de alambre: AWG, SWG y BWG";
corrected.concepts["concept-wire-gauges-awg-swg-bwg"].description =
    "Un número de calibre describe un tamaño nominal solo cuando se indica el sistema de calibre.";
const wireGaugeTable = wireGaugeSections[2].table;
if (!wireGaugeTable) throw new Error("Latin American Spanish wire-gauge table not found.");
wireGaugeTable.headers[0] = "Calibre";
wireGaugeTable.rows[0] = ["10", "2.588 mm", "3.251 mm", "3.404 mm"];
wireGaugeTable.rows[1] = ["20", "0.8128 mm", "0.9144 mm", "0.8890 mm"];
wireGaugeTable.rows[2] = ["30", "0.2540 mm", "0.3150 mm", "0.3048 mm"];
const wireGaugeSafety = wireGaugeSections[4] as unknown as { bullets: string[] };
wireGaugeSafety.bullets[4] = "Determina la capacidad de corriente a partir de los datos del producto y las "
    + "normas eléctricas, no solo del número de calibre.";
const siSections = corrected.concepts["concept-si-system-and-imperial-units"].sections;
const baseUnits = siSections.find((section) => section.id === "base-units")?.table;
if (!baseUnits) throw new Error("Latin American Spanish SI base-units table not found.");

baseUnits.rows[0][1] = "metro";
baseUnits.rows[0][2] = "m";
baseUnits.rows[1][0] = "Masa";
baseUnits.rows[1][1] = "kilogramo";
baseUnits.rows[1][2] = "kg";
baseUnits.rows[4][2] = "A";
baseUnits.rows[5][1] = "mol";
baseUnits.rows[5][2] = "mol";
baseUnits.rows[6][2] = "cd";

baseUnits.rows[3][2] = "K";
const decimalPrefixes = siSections[1].table;
if (!decimalPrefixes) throw new Error("Latin American Spanish SI decimal-prefix table not found.");
decimalPrefixes.rows[1][1] = "M";
decimalPrefixes.rows[2][1] = "m";
decimalPrefixes.rows[3][1] = "μ";
decimalPrefixes.rows[4][1] = "n";
decimalPrefixes.rows[0][2] = "1,000 = 10^3";
decimalPrefixes.rows[1][2] = "1,000,000 = 10^6";
decimalPrefixes.rows[2][2] = "0.001 = 10^-3";
decimalPrefixes.rows[3][2] = "0.000001 = 10^-6";
decimalPrefixes.rows[4][2] = "0.000000001 = 10^-9";

const imperialConversions = siSections[3] as unknown as { bullets: string[] };
imperialConversions.bullets[0] = "1 lb ≈ 0.45359237 kg.";
imperialConversions.bullets[1] = "1 lbf ≈ 4.44822 N.";
imperialConversions.bullets[2] = "1 psi ≈ 6,894.76 Pa.";
imperialConversions.bullets[5] = "K = °C + 273.15.";

const ohmsLawExamplesWithFormulas = corrected.concepts["concept-ohms-law"].sections[2] as unknown as {
    examples: Array<{ setup: string; formulas: string[]; conclusion: string }>;
};
ohmsLawExamplesWithFormulas.examples[0].setup = "Una fuente de 4.2 V está conectada a una carga de 1.0 Ω.";
ohmsLawExamplesWithFormulas.examples[0].formulas[0] = "I = 4.2 V / 1.0 Ω = 4.2 A";
ohmsLawExamplesWithFormulas.examples[0].conclusion = "La corriente de carga es de 4.2 A.";
ohmsLawExamplesWithFormulas.examples[1].formulas[0] = "R = 12 V / 2 A = 6 Ω";
ohmsLawExamplesWithFormulas.examples[1].setup = "Hay una diferencia de potencial de 12 V en un circuito y circulan 2 A.";
ohmsLawExamplesWithFormulas.examples[1].conclusion = "La resistencia del circuito es de 6 Ω.";
ohmsLawExamplesWithFormulas.examples[2].setup = "Una corriente de 0.5 A fluye a través de una resistencia de 10 Ω.";
ohmsLawExamplesWithFormulas.examples[2].formulas[0] = "V = 0.5 A × 10 Ω = 5 V";

const kirchhoffSeriesParallel = kirchhoffSections[2] as unknown as {
    formulas: Array<{ expression: string }>;
    title: string;
};
kirchhoffSeriesParallel.title = "Circuitos en serie y en paralelo";
kirchhoffSeriesParallel.formulas[0].expression = "I_total = I_1 = I_2 = ...";
kirchhoffSeriesParallel.formulas[1].expression = "R_total = R_1 + R_2 + ...";
kirchhoffSeriesParallel.formulas[2].expression = "I_total = I_1 + I_2 + ...";
kirchhoffSeriesParallel.formulas[3].expression = "1 / R_total = 1 / R_1 + 1 / R_2 + ...";
const kirchhoffSeriesExample = kirchhoffSeriesParallel as unknown as {
    examples?: Array<{ setup: string; formulas: string[] }>;
};
if (kirchhoffSeriesExample.examples) {
    kirchhoffSeriesExample.examples[0].setup = "Dos resistencias de 0.20 Ω en serie están conectadas a 8.0 V.";
    kirchhoffSeriesExample.examples[0].formulas[0] = "R_total = 0.40 Ω";
    kirchhoffSeriesExample.examples[0].formulas[1] = "I = 8.0 V / 0.40 Ω = 20 A";
    kirchhoffSeriesExample.examples[1].setup = "Dos ramas iguales de 0.40 Ω están conectadas a 4.0 V.";
    kirchhoffSeriesExample.examples[1].formulas[0] = "R_total = 0.20 Ω";
    kirchhoffSeriesExample.examples[1].formulas[1] = "I_total = 4.0 V / 0.20 Ω = 20 A";
}
const kirchhoffVoltageLaw = kirchhoffSections[3] as unknown as {
    formulas: Array<{ expression: string }>;
    paragraphs: string[];
};
kirchhoffVoltageLaw.formulas[1].expression = "+8.0 V - V_1 - V_2 = 0";
kirchhoffVoltageLaw.formulas[2].expression = "V_total = V_1 = V_2 = ... (ramas en paralelo)";
kirchhoffVoltageLaw.paragraphs[0] = "La suma algebraica de los aumentos y caídas de voltaje alrededor de un circuito "
    + "cerrado es cero. Elige una dirección de bucle y mantén las polaridades coherentes. Invertir la dirección cambia "
    + "los signos, no la solución física. Una resistencia en serie mayor tiene una caída de voltaje mayor porque la "
    + "misma corriente fluye a través de cada componente en serie.";
const kirchhoffCells = kirchhoffSections[4] as unknown as {
    formulas: Array<{ expression: string }>;
    bullets: string[];
};
kirchhoffCells.formulas[0].expression = "V_pack = V_1 + V_2 + ... (serie)";
kirchhoffCells.formulas[1].expression = "C_pack = C_1 + C_2 + ... (paralelo)";
kirchhoffCells.bullets[2] = "El reparto de corriente depende de la resistencia interna, los contactos, el cableado y "
    + "los interruptores.";
kirchhoffCells.bullets[3] = "La carga de celdas de ion-litio en serie requiere supervisión de cada celda y un "
    + "equilibrado o una protección adecuados.";
const kirchhoffSolving = kirchhoffSections[5] as unknown as { bullets: string[]; paragraphs: string[] };
(kirchhoffSections[5] as unknown as { title: string }).title = "Resolución de circuitos reales";
kirchhoffSolving.bullets[0] = "Marca los voltajes de los nodos, las corrientes de las ramas y los sentidos de corriente "
    + "supuestos.";
kirchhoffSolving.bullets[1] = "Aplica KCL en los nodos independientes y KVL alrededor de los bucles independientes.";
kirchhoffSolving.bullets[2] = "Relaciona el voltaje y la corriente de la resistencia mediante V = I × R.";
kirchhoffSolving.paragraphs[0] = "Un modelo simplificado puede omitir la resistencia interna de la celda, la "
    + "resistencia de contacto, la eficiencia del convertidor, los efectos de la temperatura, el comportamiento "
    + "transitorio, los circuitos de protección y las tolerancias de los componentes. Incluye todo comportamiento "
    + "omitido que afecte de forma significativa a un circuito de alta corriente.";

const tcrConcept = corrected.concepts["concept-temperature-coefficient-of-resistance"] as unknown as {
    displayName: string;
    description: string;
    sections: Array<{
        title: string;
        paragraphs?: string[];
        formulas?: Array<{ expression: string }>;
        bullets?: string[];
        examples?: Array<{ setup: string; formulas: string[]; conclusion: string }>;
    }>;
};
tcrConcept.displayName = "Coeficiente de temperatura de la resistencia (TCR)";
tcrConcept.description = "El coeficiente de temperatura de la resistencia (TCR) describe cómo cambia la resistencia "
    + "cuando un material se calienta o se enfría.";
tcrConcept.sections[0].paragraphs![0] = "Para un cambio de temperatura pequeño o moderado, usa la relación de primer "
    + "orden:";
tcrConcept.sections[0].formulas![0].expression = "R_T = R_0 [1 + α (T - T_0)]";
tcrConcept.sections[0].bullets![2] = "α es el coeficiente de temperatura de la resistencia del material, expresado en "
    + "1/°C o ppm/°C.";
tcrConcept.sections[1].bullets![0] = "Un TCR positivo significa que la resistencia aumenta a medida que aumenta la temperatura; "
    + "muchos metales se comportan de esta manera.";
tcrConcept.sections[2].examples![0].setup = "Se especifica una resistencia de 1.00 Ω a 20 °C, con un TCR de 400 ppm/°C.";
tcrConcept.sections[2].examples![0].formulas[0] = "α = 400 × 10^-6 / °C = 0.0004 / °C";
tcrConcept.sections[2].examples![0].formulas[1] = "ΔT = 100 - 20 = 80 °C";
tcrConcept.sections[2].examples![0].formulas[2] = "R_T = 1.00 [1 + 0.0004 × 80] = 1.032 Ω";
tcrConcept.sections[2].examples![0].conclusion = "La resistencia estimada es de 1.032 Ω, aproximadamente un 3.2 % "
    + "por encima de su valor a 20 °C.";
tcrConcept.sections[3].paragraphs![1] = "El TCR indicado por el fabricante suele ser válido para un intervalo de "
    + "temperatura y resistencia determinado. Los gradientes de temperatura, los cambios en el material, los "
    + "contactos, la deformación mecánica y el autocalentamiento pueden hacer que el resultado real difiera de la "
    + "estimación de primer orden.";
tcrConcept.sections[3].paragraphs![0] = "Para una resistencia con TCR positivo alimentada con voltaje constante, al "
    + "aumentar la temperatura aumenta la resistencia y tiende a disminuir la corriente. Para una fuente de corriente "
    + "constante, el mismo aumento de resistencia incrementa la potencia.";

const heatFluxConcept = corrected.concepts["concept-heat-flux"] as unknown as {
    displayName: string;
    sections: Array<{
        paragraphs?: string[];
        formulas?: string[];
        bullets?: string[];
        examples?: Array<{ formulas: string[] }>;
    }>;
};
heatFluxConcept.displayName = "Flujo de calor";
(corrected.concepts["concept-heat-flux"].sections[2] as unknown as { title: string }).title =
    "Conducción a través de una capa plana";
const heatFluxExample = heatFluxConcept.sections[1].examples![0] as unknown as {
    setup: string;
    formulas: string[];
    conclusion: string;
};
heatFluxExample.setup = "Un calentador de 100 W transfiere calor a través de un área de 0.020 m².";
heatFluxExample.formulas[0] = "q'' = 100 W / 0.020 m² = 5,000 W/m²";
heatFluxExample.conclusion = "El flujo de calor promedio es de 5,000 W/m², o 0.5 W/cm².";
heatFluxConcept.sections[3].paragraphs![0] = "La convección utiliza un coeficiente de superficie h. La radiación utiliza la emisividad ε "
    + "y la constante de Stefan-Boltzmann σ; las temperaturas de la ecuación de radiación deben ser temperaturas "
    + "absolutas en kelvin.";
heatFluxConcept.sections[4].bullets![1] = "Distingue el flujo de calor promedio de un pico local; el calentamiento puede ser desigual.";
heatFluxConcept.sections[4].bullets![0] = "Convierte el área a m² antes de usar W/m².";
heatFluxConcept.sections[4].bullets![2] = "Incluye la resistencia de contacto, la convección, la radiación y la pérdida "
    + "de calor cuando sea necesario.";
heatFluxConcept.sections[4].bullets![3] = "El flujo de calor no indica por sí solo la temperatura; usa la capacidad "
    + "calorífica para calcular el cambio de temperatura.";

const jouleHeatingConcept = corrected.concepts["concept-joule-heating"] as unknown as {
    sections: Array<{
        title?: string;
        paragraphs?: string[];
        bullets?: string[];
        examples?: Array<{ setup: string; formulas: string[]; conclusion: string }>;
    }>;
};
jouleHeatingConcept.sections[0].title = "Potencia de calentamiento";
jouleHeatingConcept.sections[0].paragraphs![0] = "La potencia de calentamiento eléctrico es:";
jouleHeatingConcept.sections[2].bullets![0] = "Con resistencia constante, duplicar la corriente cuadruplica la "
    + "potencia de calentamiento.";
jouleHeatingConcept.sections[2].bullets![1] = "Con corriente constante, duplicar la resistencia duplica la potencia "
    + "de calentamiento.";
jouleHeatingConcept.sections[2].bullets![2] = "Con voltaje constante, reducir la resistencia aumenta la potencia de "
    + "calentamiento.";
jouleHeatingConcept.sections[2].bullets![3] = "La transferencia de calor al aire, al líquido y a los componentes "
    + "determina la temperatura real.";
jouleHeatingConcept.sections[2].title = "¿Qué afecta el calentamiento?";
jouleHeatingConcept.sections[1].examples![0].setup = "Una resistencia de 0.8 Ω conduce 3 A.";
jouleHeatingConcept.sections[1].examples![0].formulas[0] = "P = I^2 × R = 3^2 × 0.8 = 7.2 W";
jouleHeatingConcept.sections[1].examples![0].formulas[1] = "E = P × t = 7.2 W × 10 s = 72 J";
jouleHeatingConcept.sections[1].examples![0].conclusion = "La resistencia convierte energía en calor a 7.2 julios "
    + "por segundo, o 72 J en 10 segundos.";
jouleHeatingConcept.sections[2].paragraphs![0] = "La potencia eléctrica es una tasa de transferencia de energía, no "
    + "una temperatura. La capacidad calorífica y el flujo de calor determinan cómo esa energía cambia la temperatura "
    + "y con qué rapidez abandona la superficie.";
jouleHeatingConcept.sections[3].paragraphs![0] = "Comprueba que los componentes, las conexiones y el aislamiento "
    + "puedan soportar la corriente y la potencia previstas. Usa un margen de seguridad adecuado, ya que los "
    + "componentes reales pueden calentarse de forma desigual y la resistencia puede cambiar con la temperatura. "
    + "Las baterías y las fuentes de alimentación también tienen límites de corriente en funcionamiento continuo.";

const trigonometryConcept = corrected.concepts["concept-trigonometry"] as unknown as {
    sections: Array<{
        title: string;
        formulas?: Array<{ expression: string }>;
        examples?: Array<{ title: string; formulas: string[]; conclusion?: string }>;
    }>;
};
trigonometryConcept.sections[0].title = "Triángulos rectángulos";
const trigonometryIntroduction = trigonometryConcept.sections[0] as unknown as { paragraphs: string[] };
trigonometryIntroduction.paragraphs[0] = "En un triángulo rectángulo, el lado mayor es la hipotenusa. En relación con "
    + "un ángulo elegido, los otros lados son el cateto opuesto y el cateto adyacente. El seno es el cateto opuesto "
    + "dividido entre la hipotenusa, el coseno es el cateto adyacente dividido entre la hipotenusa y la tangente es "
    + "el cateto opuesto dividido entre el adyacente.";
trigonometryConcept.sections[0].formulas = [
    { expression: "sin(θ) = lado opuesto / hipotenusa" },
    { expression: "cos(θ) = lado adyacente / hipotenusa" },
    { expression: "tan(θ) = lado opuesto / lado adyacente" },
];
trigonometryConcept.sections[1].examples![0].title = "Encontrar un lado";
trigonometryConcept.sections[1].examples![0].formulas = [
    "lado opuesto = 10 × sin(30°) = 5 cm",
    "lado adyacente = 10 × cos(30°) ≈ 8.66 cm",
];
trigonometryConcept.sections[1].formulas = [
    { expression: "θ = sin^-1(lado opuesto / hipotenusa)" },
    { expression: "θ = cos^-1(lado adyacente / hipotenusa)" },
    { expression: "θ = tan^-1(lado opuesto / lado adyacente)" },
];
trigonometryConcept.sections[2].formulas![0].expression = "180° = π radianes";
trigonometryConcept.sections[3].title = "Formas de onda e identidades útiles";
const trigonometrySides = trigonometryConcept.sections[1] as unknown as {
    examples: Array<{ conclusion: string }>;
};
trigonometrySides.examples[0].conclusion = "Usa una función trigonométrica inversa cuando conozcas las longitudes "
    + "de los lados.";
const trigonometryWaveforms = trigonometryConcept.sections[3] as unknown as { bullets: string[] };
trigonometryWaveforms.bullets[2] = "Conserva el signo y el cuadrante cuando la dirección o la fase sean importantes.";

const siBaseUnits = baseUnits as unknown as { headers: string[]; rows: string[][] };
corrected.concepts["concept-si-system-and-imperial-units"].displayName = "Sistema SI y medidas imperiales";
siBaseUnits.headers[0] = "Magnitud";
siBaseUnits.headers[1] = "Unidad SI";
siBaseUnits.rows[5][0] = "Cantidad de sustancia";
const siBaseSection = siSections[0] as unknown as { bullets: string[] };
siBaseSection.bullets[1] = "Resistencia: ohmios (Ω).";
siBaseSection.bullets[4] = "Fuerza: newton (N).";
siBaseSection.bullets[5] = "Presión: pascal (Pa).";
const siPrefixes = siSections[1] as unknown as { paragraphs: string[] };
siPrefixes.paragraphs[0] = "Por ejemplo, 2.2 kΩ equivalen a 2,200 Ω y 15 mA equivalen a 0.015 A. Convierte los "
    + "valores a unidades compatibles antes de usar una fórmula.";
const siLengthConversions = siSections[2] as unknown as {
    formulas: Array<{ expression: string }>;
    examples: Array<{ setup: string; formulas: string[] }>;
};
siLengthConversions.formulas[0].expression = "1 pulgada = 25.4 mm = 0.0254 m";
siLengthConversions.formulas[1].expression = "1 pie = 12 pulgadas = 0.3048 m";
siLengthConversions.formulas[2].expression = "1 yarda = 3 pies = 0.9144 m";
siLengthConversions.formulas[3].expression = "1 in² = 645.16 mm²";
siLengthConversions.examples[0].setup = "Convierte 0.1 pulgadas a milímetros y 5 mm a pulgadas.";
siLengthConversions.examples[0].formulas[0] = "0.1 pulgadas × 25.4 = 2.54 mm";
siLengthConversions.examples[0].formulas[1] = "5 mm / 25.4 ≈ 0.19685 pulgadas";
const siWorkflow = siSections[4] as unknown as { bullets: string[] };
siWorkflow.bullets[2] = "Convierte antes de multiplicar o dividir.";
siWorkflow.bullets[3] = "Redondea solo al final para que los resultados intermedios conserven una precisión útil.";

const wireGaugeAwg = wireGaugeSections[1] as unknown as { paragraphs: string[] };
wireGaugeAwg.paragraphs[0] = "Para 1/0, 2/0, 3/0 y 4/0, usa n = 0, -1, -2 y -3. AWG determina el tamaño del conductor, "
    + "no una corriente segura universal; la capacidad de corriente también depende del material, el aislamiento, "
    + "la refrigeración, la instalación y las normas eléctricas aplicables.";
wireGaugeSafety.bullets[1] = "Incluye el diámetro nominal en milímetros cuando los sistemas puedan confundirse.";
wireGaugeSafety.bullets[0] = "Indica el sistema, por ejemplo, 24 AWG o 24 British SWG.";
wireGaugeSafety.bullets[2] = "Indica si la dimensión corresponde al conductor desnudo, al diámetro con aislamiento, "
    + "al espesor de una lámina o al espesor de la pared de un tubo.";
wireGaugeSafety.bullets[3] = "Para conductores trenzados, incluye la construcción de los hilos cuando importen la "
    + "flexibilidad y el diámetro total.";
(wireGaugeSections[3] as unknown as { title: string }).title = "Calibre, área y resistencia";

const heatCapacityConcept = corrected.concepts["concept-heat-capacity"] as unknown as {
    sections: Array<{
        title: string;
        examples?: Array<{ setup: string; formulas: string[]; conclusion: string }>;
    }>;
};
heatCapacityConcept.sections[2].title = "Calentamiento con potencia eléctrica";
heatCapacityConcept.sections[1].examples![0].setup = "Calienta 0.20 kg de agua de 20 °C a 70 °C usando "
    + "c = 4,180 J/(kg·K).";
heatCapacityConcept.sections[1].examples![0].formulas[1] = "Q = 0.20 × 4,180 × 50 = 41,800 J";
heatCapacityConcept.sections[1].examples![0].conclusion = "El requerimiento energético ideal es de 41.8 kJ; un "
    + "calentador real necesita más debido a las pérdidas.";
heatCapacityConcept.sections[2].examples![0].setup = "Calienta el ejemplo de 41.8 kJ con una fuente constante de "
    + "100 W y sin pérdidas.";
heatCapacityConcept.sections[2].examples![0].formulas[0] = "t = 41,800 J / 100 W = 418 s";
heatCapacityConcept.sections[2].examples![0].conclusion = "El tiempo ideal es de unos 7.0 minutos; con una eficiencia "
    + "de transferencia del 80 %, el tiempo es de aproximadamente 523 segundos.";
heatCapacityConcept.sections[3].title = "Objeto frente a material";

export const presentations: CatalogPresentationSet = {
    ...corrected,
    materials: materialPresentationsFor(materialTexts),
    batteries: batteryPresentationsFor(batteryTexts),
    mods: modPresentationsFor(modTexts),
};
