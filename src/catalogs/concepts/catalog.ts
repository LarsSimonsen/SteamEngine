export type ConceptFormula = {
    readonly expression: string;
    readonly explanation?: string;
};

export type ConceptExample = {
    readonly title: string;
    readonly setup: string;
    readonly formulas: readonly string[];
    readonly conclusion: string;
};

export type ConceptTable = {
    readonly headers: readonly string[];
    readonly rows: readonly (readonly string[])[];
};

export type ConceptSection = {
    readonly id: string;
    readonly title: string;
    readonly paragraphs?: readonly string[];
    readonly formulas?: readonly ConceptFormula[];
    readonly bullets?: readonly string[];
    readonly examples?: readonly ConceptExample[];
    readonly table?: ConceptTable;
};

export type Concept = {
    readonly id: string;
    readonly slug: string;
    readonly title: string;
    readonly summary: string;
    readonly lead: string;
    readonly sections: readonly ConceptSection[];
    readonly wikipediaUrl?: string;
};

const ohm = "\\u03a9";
const degree = "\\u00b0";
const delta = "\\u0394";
const alpha = "\\u03b1";
const pi = "\\u03c0";
const rho = "\\u03c1";
const epsilon = "\\u03b5";
const sigma = "\\u03c3";
const mu = "\\u03bc";

export const concepts: readonly Concept[] = [
    {
        id: "concept-ohms-law",
        slug: "ohms-law",
        title: "Ohm's law",
        summary: "The relationship between voltage, current, and resistance.",
        lead: "Ohm's law connects voltage, current, and resistance in an electrical circuit.",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Ohm%27s_law",
        sections: [
            {
                id: "relationship",
                title: "The relationship",
                paragraphs: [
                    "The basic relationship is useful whenever a component's resistance is approximately constant.",
                ],
                formulas: [{ expression: "V = I × R" }],
                bullets: [
                    "V is voltage, measured in volts (V).",
                    "I is current, measured in amperes or amps (A).",
                    `R is resistance, measured in ohms (${ohm}).`,
                ],
            },
            {
                id: "rearranged-formulas",
                title: "Rearranged formulas",
                paragraphs: ["Use the version that puts the value you want to find on the left:"],
                formulas: [
                    { expression: "I = V / R" },
                    { expression: "R = V / I" },
                ],
                bullets: [
                    "Increasing voltage increases current when resistance stays the same.",
                    "Increasing resistance decreases current when voltage stays the same.",
                    `A resistance of zero ${ohm} is an ideal short circuit and must be handled separately.`,
                ],
            },
            {
                id: "worked-examples",
                title: "Worked examples",
                examples: [
                    {
                        title: "Find current",
                        setup: `A 4.2 V source is connected to a 1.0 ${ohm} load.`,
                        formulas: [`I = 4.2 V / 1.0 ${ohm} = 4.2 A`],
                        conclusion: "The load current is 4.2 A.",
                    },
                    {
                        title: "Find resistance",
                        setup: "A circuit has 12 V across it and draws 2 A.",
                        formulas: [`R = 12 V / 2 A = 6 ${ohm}`],
                        conclusion: `The circuit resistance is 6 ${ohm}.`,
                    },
                    {
                        title: "Find voltage",
                        setup: `A 0.5 A current flows through a 10 ${ohm} resistance.`,
                        formulas: ["V = 0.5 A × 10 Ω = 5 V"],
                        conclusion: "The voltage is 5 V.",
                    },
                ],
            },
            {
                id: "electrical-power",
                title: "Electrical power",
                formulas: [{ expression: "P = V × I = I^2 × R = V^2 / R" }],
                paragraphs: [
                    "Ohm's law combines with the power relationship P = V × I. Power P is measured in watts (W). "
                    + "For a 4.2 V source and a 1.0 Ω load, "
                    + "the ideal power is 17.64 W. The component needs enough thermal capacity and headroom "
                    + "to dissipate the resulting heat safely.",
                ],
            },
            {
                id: "unit-conversions",
                title: "Unit conversions",
                paragraphs: ["Keep units consistent before calculating:"],
                bullets: [
                    `1 k${ohm} = 1,000 ${ohm}`,
                    `1 M${ohm} = 1,000,000 ${ohm}`,
                    "1 mA = 0.001 A",
                    "1 W = 1,000 mW",
                ],
            },
            {
                id: "limits",
                title: "Limits of the model",
                paragraphs: [
                    "Ohm's law is an idealized model. Real components can be non-ohmic: their resistance may change "
                    + "with temperature, voltage, current, frequency, or operating state. For series and parallel "
                    + "networks, use Kirchhoff's laws together with Ohm's law.",
                ],
            },
        ],
    },
    {
        id: "concept-joule-heating",
        slug: "joule-heating",
        title: "Joule heating",
        summary: "How electrical current turns resistance into heat.",
        lead: "Joule heating describes the conversion of electrical energy into heat when current flows through "
            + "resistance.",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Joule_heating",
        sections: [
            {
                id: "heating-power",
                title: "Heating power",
                paragraphs: ["The electrical heating power is:"],
                formulas: [
                    { expression: "P = V × I" },
                    { expression: "P = I^2 × R" },
                    { expression: "P = V^2 / R" },
                ],
                bullets: [
                    "P is power in watts (W).",
                    "V is voltage in volts (V).",
                    "I is current in amperes (A).",
                ],
            },
            {
                id: "worked-example",
                title: "Worked example",
                examples: [{
                    title: "A resistive load",
                    setup: `A 0.8 ${ohm} coil carries 3 A.`,
                    formulas: [
                        "P = I^2 × R = 3^2 × 0.8 = 7.2 W",
                        "E = P × t = 7.2 W × 10 s = 72 J",
                    ],
                    conclusion: "The coil converts energy to heat at 7.2 joules per second, or 72 J over 10 seconds.",
                }],
            },
            {
                id: "what-affects-heating",
                title: "What affects heating",
                bullets: [
                    "At constant resistance, doubling current produces four times the heating power.",
                    "At constant current, doubling resistance doubles the heating power.",
                    "At constant voltage, lowering resistance increases heating power.",
                    "Heat transfer to air, liquid, and hardware determines the actual temperature.",
                ],
                paragraphs: [
                    "Electrical power is a rate of energy transfer, not a temperature. Heat capacity and heat flux "
                    + "determine how that energy changes temperature and how quickly it leaves the surface.",
                ],
            },
            {
                id: "practical-checks",
                title: "Practical checks",
                paragraphs: [
                    "Check that components, connections, and insulation can handle the expected current and power. "
                    + "Use appropriate headroom because real components can heat unevenly and resistance can change "
                    + "with temperature. Batteries and power supplies also have continuous current limits.",
                ],
            },
        ],
    },
    {
        id: "concept-kirchhoffs-laws",
        slug: "kirchhoffs-laws",
        title: "Kirchhoff's laws",
        summary: "How current and voltage behave in connected circuits.",
        lead: "Kirchhoff's current and voltage laws describe conservation at circuit nodes and around closed loops.",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Kirchhoff%27s_circuit_laws",
        sections: [
            {
                id: "circuit-terms",
                title: "Circuit terms",
                paragraphs: ["The basic terms make a circuit diagram easier to reason about:"],
                bullets: [
                    "A node is a set of conductors connected without an intervening component.",
                    "A branch is a current path between two nodes.",
                    "A loop is a closed path that returns to its starting point.",
                    "A series connection gives current only one path through the components.",
                    "A parallel connection joins branches to the same two nodes.",
                ],
            },
            {
                id: "current-law",
                title: "Kirchhoff's current law",
                formulas: [
                    { expression: "Σ I = 0" },
                    { expression: "Σ I_in = Σ I_out" },
                ],
                paragraphs: [
                    "If 8 A enters a node and one branch carries 3 A away, the remaining branches must carry a "
                    + "combined "
                    + "5 A away. Choose current directions before solving; a negative result means the real current "
                    + "flows opposite to the assumed direction.",
                ],
            },
            {
                id: "series-and-parallel",
                title: "Series and parallel circuits",
                formulas: [
                    { expression: "I_total = I_1 = I_2 = ..." },
                    { expression: "R_total = R_1 + R_2 + ..." },
                    { expression: "I_total = I_1 + I_2 + ..." },
                    { expression: "1 / R_total = 1 / R_1 + 1 / R_2 + ..." },
                ],
                examples: [
                    {
                        title: "Series resistors",
                        setup: `Two 0.20 ${ohm} resistors in series are connected to 8.0 V.`,
                        formulas: [`R_total = 0.40 ${ohm}`, "I = 8.0 V / 0.40 Ω = 20 A"],
                        conclusion: "The same 20 A passes through both resistors.",
                    },
                    {
                        title: "Parallel resistors",
                        setup: `Two equal 0.40 ${ohm} branches are connected to 4.0 V.`,
                        formulas: [`R_total = 0.20 ${ohm}`, "I_total = 4.0 V / 0.20 Ω = 20 A"],
                        conclusion: "With equal branch resistance, each branch carries 10 A.",
                    },
                ],
            },
            {
                id: "voltage-law",
                title: "Kirchhoff's voltage law",
                formulas: [
                    { expression: "Σ V = 0" },
                    { expression: "+8.0 V - V_1 - V_2 = 0" },
                    { expression: "V_total = V_1 = V_2 = ... (parallel branches)" },
                ],
                paragraphs: [
                    "The algebraic sum of voltage rises and drops around a closed loop is zero. Choose one loop "
                    + "direction "
                    + "and keep polarities consistent. Reversing the direction changes signs, "
                    + "not the physical solution. A larger series resistance has a larger voltage drop because the "
                    + "same "
                    + "current flows through every series component.",
                ],
            },
            {
                id: "cells",
                title: "Cells in series and parallel",
                formulas: [
                    { expression: "V_pack = V_1 + V_2 + ... (series)" },
                    { expression: "C_pack = C_1 + C_2 + ... (parallel)" },
                ],
                bullets: [
                    "Series cells add voltage while ampere-hour capacity remains that of one equal cell.",
                    "Parallel cells keep the same voltage while capacity and available current add approximately.",
                    "Current sharing depends on internal resistance, contacts, wiring, and switches.",
                    "Series lithium-ion charging requires cell-level monitoring and appropriate balancing or "
                        + "protection.",
                ],
            },
            {
                id: "solving-and-limits",
                title: "Solving real circuits",
                bullets: [
                    "Mark node voltages, branch currents, and assumed current directions.",
                    "Apply KCL at independent nodes and KVL around independent loops.",
                    "Relate resistor voltage and current with V = I × R.",
                    "Solve the simultaneous equations and check power balance.",
                ],
                paragraphs: [
                    "A simplified model may omit cell internal resistance, contact resistance, converter efficiency, "
                    + "temperature effects, transient behavior, protection circuits, and component tolerances. Include "
                    + "every omitted behavior that materially affects a high-current circuit.",
                ],
            },
        ],
    },
    {
        id: "concept-temperature-coefficient-of-resistance",
        slug: "temperature-coefficient-of-resistance",
        title: "Temperature coefficient of resistance (TCR)",
        summary: "How a material's resistance changes with temperature.",
        lead: "The temperature coefficient of resistance estimates how resistance changes as a material heats or "
            + "cools.",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Temperature_coefficient_of_resistance",
        sections: [
            {
                id: "linear-model",
                title: "The linear model",
                paragraphs: ["For a small or moderate temperature change, use the first-order relationship:"],
                formulas: [{ expression: `R_T = R_0 [1 + ${alpha} (T - T_0)]` }],
                bullets: [
                    `R_0 is the resistance at reference temperature T_0.`,
                    "R_T is the estimated resistance at temperature T.",
                    `${alpha} is the material's temperature coefficient, expressed in 1/°C or ppm/°C.`,
                    "Temperatures must use the same scale and units for the difference T - T_0.",
                ],
            },
            {
                id: "positive-and-negative",
                title: "Positive and negative TCR",
                bullets: [
                    "A positive TCR means resistance increases as temperature rises; many metals behave this way.",
                    "A negative TCR means resistance decreases as temperature rises.",
                    "A TCR near zero means resistance changes little over the specified range.",
                    "The sign of the coefficient matters; replacing a negative value with its absolute value "
                        + "reverses the prediction.",
                ],
            },
            {
                id: "worked-example",
                title: "Worked example",
                examples: [{
                    title: "A heated resistance",
                    setup: `A 1.00 ${ohm} resistance is specified at 20 ${degree}C, with a TCR of 400 ppm/${degree}C.`,
                    formulas: [
                        `${alpha} = 400 × 10^-6 / ${degree}C = 0.0004 / ${degree}C`,
                        `${delta}T = 100 - 20 = 80 ${degree}C`,
                        `R_T = 1.00 [1 + 0.0004 × 80] = 1.032 ${ohm}`,
                    ],
                    conclusion: `The estimated resistance is 1.032 ${ohm}, about 3.2% above its value at 20 `
                        + `${degree}C.`,
                }],
            },
            {
                id: "power-and-limits",
                title: "TCR, power, and practical limits",
                formulas: [
                    { expression: "I = V / R" },
                    { expression: "P = V^2 / R = I^2 × R" },
                ],
                paragraphs: [
                    "For a positive-TCR resistance driven at constant voltage, rising temperature increases resistance "
                    + "and tends to reduce current. For a constant-current source, the same resistance increase "
                    + "raises power.",
                    "A manufacturer's TCR normally applies to a stated temperature and resistance range. Temperature "
                    + "gradients, material changes, contacts, mechanical strain, and self-heating can make a real "
                    + "result "
                    + "differ from the first-order estimate.",
                ],
            },
        ],
    },
    {
        id: "concept-trigonometry",
        slug: "trigonometry",
        title: "Trigonometry",
        summary: "Relationships between angles and the sides of triangles.",
        lead: "Trigonometry relates angles and lengths, and is useful for vectors, phase relationships, and waveforms.",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Trigonometry",
        sections: [
            {
                id: "right-triangles",
                title: "Right triangles",
                paragraphs: ["Relative to an angle θ, the opposite side is across from it, the adjacent side touches "
                    + "it "
                    + "excluding the hypotenuse, and the hypotenuse is opposite the right angle. SOH-CAH-TOA is a "
                    + "memory aid: sine is opposite over hypotenuse, cosine is adjacent over hypotenuse, and tangent "
                    + "is opposite over adjacent."],
                formulas: [
                    { expression: "sin(θ) = opposite / hypotenuse" },
                    { expression: "cos(θ) = adjacent / hypotenuse" },
                    { expression: "tan(θ) = opposite / adjacent" },
                ],
            },
            {
                id: "finding-sides-and-angles",
                title: "Finding unknown sides and angles",
                examples: [{
                    title: "Find a side",
                    setup: "A 10 cm hypotenuse meets an angle of 30°.",
                    formulas: [
                        "opposite = 10 × sin(30°) = 5 cm",
                        "adjacent = 10 × cos(30°) ≈ 8.66 cm",
                    ],
                    conclusion: "Use an inverse trigonometric function when the side lengths are known.",
                }],
                formulas: [
                    { expression: "θ = sin^-1(opposite / hypotenuse)" },
                    { expression: "θ = cos^-1(adjacent / hypotenuse)" },
                    { expression: "θ = tan^-1(opposite / adjacent)" },
                ],
            },
            {
                id: "degrees-and-radians",
                title: "Degrees and radians",
                formulas: [
                    { expression: "180° = π radians" },
                    { expression: "θ_rad = θ_deg × π / 180" },
                ],
                paragraphs: [
                    "A calculator must be in the correct angle mode. Using degree mode for a radian value, or "
                    + "vice versa, "
                    + "produces a different result. A complete cycle is 360° or 2π radians.",
                ],
            },
            {
                id: "waveforms-and-identities",
                title: "Waveforms and useful identities",
                formulas: [
                    { expression: "x(t) = A × sin(2πft + φ)" },
                    { expression: "ω = 2πf" },
                    { expression: "sin^2(θ) + cos^2(θ) = 1" },
                    { expression: "a^2 + b^2 = c^2" },
                ],
                bullets: [
                    "A is amplitude, f is frequency in hertz, t is time in seconds, and φ is phase angle.",
                    "Angular frequency ω is measured in radians per second.",
                    "Keep the sign and quadrant when direction or phase matters.",
                ],
            },
        ],
    },
    {
        id: "concept-heat-capacity",
        slug: "heat-capacity",
        title: "Heat capacity",
        summary: "How much energy an object needs to change temperature.",
        lead: "Heat capacity connects transferred energy with the temperature change of an object or material.",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Heat_capacity",
        sections: [
            {
                id: "basic-relationships",
                title: "Basic relationships",
                formulas: [
                    { expression: "C = Q / ΔT" },
                    { expression: "Q = m × c × ΔT" },
                ],
                bullets: [
                    "C is heat capacity in J/K or J/°C.",
                    "Q is transferred heat energy in joules (J).",
                    "m is mass in kilograms and c is specific heat capacity in J/(kg·K).",
                    "A temperature difference of 1 K is the same size as a difference of 1 °C.",
                ],
            },
            {
                id: "worked-example",
                title: "Worked example",
                examples: [{
                    title: "Heating water",
                    setup: "Heat 0.20 kg of water from 20 °C to 70 °C using c = 4,180 J/(kg·K).",
                    formulas: ["ΔT = 70 - 20 = 50 °C", "Q = 0.20 × 4,180 × 50 = 41,800 J"],
                    conclusion: "The ideal energy requirement is 41.8 kJ; a real heater needs more because of losses.",
                }],
            },
            {
                id: "electrical-heating",
                title: "Heating with electrical power",
                formulas: [
                    { expression: "Q = P × t" },
                    { expression: "t = m × c × ΔT / P" },
                ],
                examples: [{
                    title: "Ideal heating time",
                    setup: "Heat the 41.8 kJ example with a constant 100 W source and no losses.",
                    formulas: ["t = 41,800 J / 100 W = 418 s"],
                    conclusion: "The ideal time is about 7.0 minutes; at 80% transfer efficiency it is about "
                        + "523 seconds.",
                }],
            },
            {
                id: "object-and-material",
                title: "Object versus material",
                paragraphs: [
                    "Heat capacity belongs to the whole object and depends on how much material is present. "
                    + "Specific heat "
                    + "capacity is a material property. Doubling the mass doubles the heat capacity for the same "
                    + "material.",
                ],
                formulas: [{ expression: "C_total = Σ m_i × c_i" }],
            },
            {
                id: "phase-changes-and-limits",
                title: "Phase changes and practical limits",
                formulas: [{ expression: "Q = m × L" }],
                paragraphs: [
                    "During melting or boiling, supplied energy can change the material's state without changing its "
                    + "temperature. L is specific latent heat in J/kg.",
                    "The simple equation assumes specific heat is roughly constant. Heat loss, convection, radiation, "
                    + "evaporation, contact resistance, and uneven temperature can make a real result differ from "
                    + "the ideal.",
                ],
            },
        ],
    },
    {
        id: "concept-heat-flux",
        slug: "heat-flux",
        title: "Heat flux",
        summary: "The rate of heat transfer through a unit of area.",
        lead: "Heat flux describes how quickly heat crosses a surface, independent of the total amount of material "
            + "storing heat.",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Heat_flux",
        sections: [
            {
                id: "definition",
                title: "Definition",
                formulas: [{ expression: "q'' = Q_dot / A" }],
                bullets: [
                    "q'' is heat flux in W/m².",
                    "Q_dot is total heat-transfer rate in watts (W).",
                    "A is the area through which heat is transferred in square metres (m²).",
                ],
                paragraphs: [
                    "Heat flux is different from heat capacity: heat capacity describes stored energy per temperature "
                    + "change, while heat flux describes the rate at which heat crosses a surface.",
                ],
            },
            {
                id: "worked-example",
                title: "Worked example",
                examples: [{
                    title: "Average heater flux",
                    setup: "A 100 W heater transfers heat through an area of 0.020 m².",
                    formulas: ["q'' = 100 W / 0.020 m² = 5,000 W/m²"],
                    conclusion: "The average heat flux is 5,000 W/m², or 0.5 W/cm².",
                }],
            },
            {
                id: "conduction",
                title: "Conduction through a flat layer",
                formulas: [
                    { expression: "q'' = -k × ΔT / L" },
                    { expression: "Q_dot = k × A × (T_hot - T_cold) / L" },
                ],
                bullets: [
                    "k is thermal conductivity in W/(m·K).",
                    "ΔT is the temperature difference across the layer.",
                    "L is layer thickness in metres.",
                    "The minus sign indicates flow from higher temperature toward lower temperature.",
                ],
            },
            {
                id: "convection-and-radiation",
                title: "Convection and radiation",
                formulas: [
                    { expression: "q'' = h × (T_s - T_∞)" },
                    { expression: "q'' = ε × σ × (T_s^4 - T_sur^4)" },
                ],
                paragraphs: [
                    "Convection uses a surface coefficient h. Radiation uses emissivity ε and the Stefan–Boltzmann "
                    + "constant σ; temperatures in the radiation equation must be absolute temperatures in kelvin.",
                ],
            },
            {
                id: "practical-checks",
                title: "Practical checks",
                bullets: [
                    "Convert area to m² before using W/m².",
                    "Distinguish average heat flux from a local peak; heating may be uneven.",
                    "Include contact resistance, convection, radiation, and heat loss when needed.",
                    "Heat flux is a transfer rate, not a temperature; use heat capacity for temperature change.",
                ],
            },
        ],
    },
    {
        id: "concept-si-system-and-imperial-units",
        slug: "si-system-and-imperial-units",
        title: "The SI system and imperial measurements",
        summary: "The units, prefixes, and conversions used in engineering calculations.",
        lead: "The International System of Units provides consistent base units, derived units, and decimal scaling "
            + "for engineering.",
        wikipediaUrl: "https://en.wikipedia.org/wiki/International_System_of_Units",
        sections: [
            {
                id: "base-units",
                title: "Common SI units",
                table: {
                    headers: ["Quantity", "SI unit", "Symbol"],
                    rows: [
                        ["Length", "metre", "m"],
                        ["Mass", "kilogram", "kg"],
                        ["Time", "second", "s"],
                        ["Temperature", "kelvin", "K"],
                        ["Electric current", "ampere", "A"],
                        ["Amount of substance", "mole", "mol"],
                        ["Luminous intensity", "candela", "cd"],
                    ],
                },
                bullets: [
                    "Voltage: volt (V).",
                    `Resistance: ohm (${ohm}).`,
                    "Power: watt (W).",
                    "Energy: joule (J).",
                    "Force: newton (N).",
                    "Pressure: pascal (Pa).",
                    "Frequency: hertz (Hz).",
                ],
            },
            {
                id: "decimal-prefixes",
                title: "Decimal prefixes",
                table: {
                    headers: ["Prefix", "Symbol", "Factor"],
                    rows: [
                        ["kilo", "k", "1,000 = 10^3"],
                        ["mega", "M", "1,000,000 = 10^6"],
                        ["milli", "m", "0.001 = 10^-3"],
                        ["micro", "μ", "0.000001 = 10^-6"],
                        ["nano", "n", "0.000000001 = 10^-9"],
                    ],
                },
                paragraphs: [`For example, 2.2 k${ohm} equals 2,200 ${ohm}, and 15 mA equals 0.015 A. Convert values `
                    + "to compatible units before using a formula."],
            },
            {
                id: "length-conversions",
                title: "Inches and metric length",
                formulas: [
                    { expression: "1 inch = 25.4 mm = 0.0254 m" },
                    { expression: "1 foot = 12 inches = 0.3048 m" },
                    { expression: "1 yard = 3 feet = 0.9144 m" },
                    { expression: "1 in² = 645.16 mm²" },
                ],
                examples: [{
                    title: "Convert length",
                    setup: "Convert 0.1 inch to millimetres and 5 mm to inches.",
                    formulas: ["0.1 inch × 25.4 = 2.54 mm", "5 mm / 25.4 ≈ 0.19685 inch"],
                    conclusion: "Area and volume conversions use the length factor raised to the relevant power.",
                }],
            },
            {
                id: "other-conversions",
                title: "Other common conversions",
                bullets: [
                    "1 lb ≈ 0.45359237 kg.",
                    "1 lbf ≈ 4.44822 N.",
                    "1 psi ≈ 6,894.76 Pa.",
                    "°F = °C × 9/5 + 32.",
                    "°C = (°F - 32) × 5/9.",
                    "K = °C + 273.15.",
                ],
                paragraphs: [
                    "A pound can refer to mass (lb) or force (lbf), which are different quantities. Likewise, inches, "
                    + "square inches, and cubic inches measure different dimensions.",
                ],
            },
            {
                id: "unit-checks",
                title: "Practical unit checks",
                bullets: [
                    "Write the unit beside each value while calculating.",
                    "Confirm that both sides of an equation have compatible dimensions.",
                    "Convert before multiplying or dividing.",
                    "Round only at the end so intermediate results retain useful precision.",
                ],
            },
        ],
    },
    {
        id: "concept-wire-gauges-awg-swg-bwg",
        slug: "wire-gauges-awg-swg-bwg",
        title: "Wire gauges: AWG, SWG, and BWG",
        summary: "Why wire-gauge numbers need a named system and a stated diameter.",
        lead: "A gauge number describes a nominal size only when its gauge system is named.",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Wire_gauge",
        sections: [
            {
                id: "gauge-systems",
                title: "Gauge systems",
                bullets: [
                    "AWG is the American Wire Gauge, also known historically as Brown & Sharpe gauge.",
                    "SWG is Standard Wire Gauge, the historical British wire and sheet-thickness system.",
                    "BWG is Birmingham Wire Gauge, historically used for iron wire, tubing, and sheet thickness.",
                    "A larger ordinary gauge number generally means a smaller diameter; sizes above gauge 0 use 00, "
                        + "000, or 0000.",
                ],
                paragraphs: [
                    "SWG and BWG are tabulated systems and must not be calculated with the AWG formula. The same "
                    + "number "
                    + "therefore does not identify the same diameter across systems.",
                ],
            },
            {
                id: "awg-formula",
                title: "AWG diameter and area",
                formulas: [
                    { expression: "d_inch = 0.005 × 92^((36 - n) / 39)" },
                    { expression: "d_mm = 0.127 × 92^((36 - n) / 39)" },
                    { expression: "A = π × d^2 / 4" },
                ],
                paragraphs: [
                    "For 1/0, 2/0, 3/0, and 4/0, use n = 0, -1, -2, and -3. AWG determines conductor size, not a "
                    + "universal safe current; ampacity also depends on material, insulation, cooling, installation, "
                    + "and applicable electrical rules.",
                ],
            },
            {
                id: "system-comparison",
                title: "Why the system name matters",
                table: {
                    headers: ["Gauge", "AWG", "British SWG", "BWG"],
                    rows: [
                        ["10", "2.588 mm", "3.251 mm", "3.404 mm"],
                        ["20", "0.8128 mm", "0.9144 mm", "0.8890 mm"],
                        ["30", "0.2540 mm", "0.3150 mm", "0.3048 mm"],
                    ],
                },
                paragraphs: ["These values are nominal. Product tolerances, coatings, insulation, and stranded "
                    + "construction "
                    + "can change the measured or overall diameter."],
            },
            {
                id: "resistance",
                title: "Gauge, area, and resistance",
                formulas: [{ expression: "R = ρ × L / A" }],
                paragraphs: [
                    "Resistance depends on conductor length L, cross-sectional area A, and material resistivity ρ. "
                    + "Because area varies with the square of diameter, a modest diameter difference can make a "
                    + "substantial resistance difference. In AWG, increasing the gauge by three sizes approximately "
                    + "halves "
                    + "area and doubles "
                    + "resistance "
                    + "per unit length for the same material and temperature.",
                ],
            },
            {
                id: "practical-specification",
                title: "Practical specification",
                bullets: [
                    "Name the system, such as 24 AWG or 24 British SWG.",
                    "Include nominal diameter in millimetres when systems might be confused.",
                    "State whether the dimension is bare conductor, insulated diameter, sheet thickness, or tube wall "
                        + "thickness.",
                    "For stranded conductors, include strand construction when flexibility and overall diameter "
                        + "matter.",
                    "Determine current capacity from product data and electrical rules, not from gauge number alone.",
                ],
            },
        ],
    },
];
