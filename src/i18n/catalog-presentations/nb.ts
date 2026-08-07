import { batteryPresets } from "../../catalogs/batteries/defaults";
import { concepts } from "../../catalogs/concepts/catalog";
import { builtInPresets } from "../../catalogs/mods/presets";
import { materials } from "../../catalogs/materials/catalog";
import type {
    CatalogPresentation,
    CatalogPresentationMap,
    CatalogPresentationSet,
} from "../catalog-presentations";

import { presentations as english } from "./en";

const recordFor = <T extends { readonly id: string }>(
    items: readonly T[],
    presentationFor: (item: T) => CatalogPresentation,
): CatalogPresentationMap => Object.fromEntries(
    items.map((item) => [item.id, presentationFor(item)]),
) as CatalogPresentationMap;

const firstSentence = (value: string): string => value.match(/^[\s\S]*?[.!?](?:\s|$)/)?.[0].trim() ?? value;
const ohm = "Ω";
const degree = "°";
const alpha = "α";
const delta = "Δ";
const rho = "ρ";

const batterySummary = (battery: (typeof batteryPresets)[number]): string => battery.batteryAccess === "integrated"
    ? "En intern batteripakke i enheten, ikke en celle som brukeren kan bytte."
    : "En utskiftbar, oppladbar celle for kompatible enheter.";

const bokmaalConcepts: Readonly<Record<string, Pick<
    CatalogPresentation,
    "displayName" | "description" | "summary" | "sections" | "wikipediaUrl"
>>> = {
    "concept-ohms-law": {
        displayName: "Ohms lov",
        description: "Ohms lov knytter sammen spenning, strøm og motstand i en elektrisk krets.",
        summary: "Forholdet mellom spenning, strøm og motstand.",
        wikipediaUrl: "https://nb.wikipedia.org/wiki/Ohms_lov",
        sections: [
            {
                id: "relationship",
                title: "Sammenhengen",
                paragraphs: [
                    "Den grunnleggende sammenhengen er nyttig når motstanden i en komponent er omtrent konstant.",
                ],
                formulas: [{ expression: "V = I × R" }],
                bullets: [
                    "V er spenning, målt i volt (V).",
                    "I er strøm, målt i ampere (A).",
                    `R er motstand, målt i ohm (${ohm}).`,
                ],
            },
            {
                id: "rearranged-formulas",
                title: "Omformede formler",
                paragraphs: ["Bruk versjonen som setter verdien du vil finne på venstre side:"],
                formulas: [
                    { expression: "I = V / R" },
                    { expression: "R = V / I" },
                ],
                bullets: [
                    "Når motstanden er uendret, øker strømmen når spenningen øker.",
                    "Når spenningen er uendret, synker strømmen når motstanden øker.",
                    `En motstand på null ${ohm} er en ideell kortslutning og må behandles separat.`,
                ],
            },
            {
                id: "worked-examples",
                title: "Regneeksempler",
                examples: [
                    {
                        title: "Finn strømmen",
                        setup: `En kilde på 4,2 V er koblet til en belastning på 1,0 ${ohm}.`,
                        formulas: [`I = 4.2 V / 1.0 ${ohm} = 4.2 A`],
                        conclusion: "Strømmen i belastningen er 4,2 A.",
                    },
                    {
                        title: "Finn motstanden",
                        setup: "En krets har 12 V over seg og trekker 2 A.",
                        formulas: [`R = 12 V / 2 A = 6 ${ohm}`],
                        conclusion: `Motstanden i kretsen er 6 ${ohm}.`,
                    },
                    {
                        title: "Finn spenningen",
                        setup: `En strøm på 0,5 A går gjennom en motstand på 10 ${ohm}.`,
                        formulas: ["V = 0.5 A × 10 Ω = 5 V"],
                        conclusion: "Spenningen er 5 V.",
                    },
                ],
            },
            {
                id: "electrical-power",
                title: "Elektrisk effekt",
                formulas: [{ expression: "P = V × I = I^2 × R = V^2 / R" }],
                paragraphs: [
                    "Ohms lov kombineres med sammenhengen for effekt, P = V × I. Effekt P måles i watt (W). "
                    + "For en kilde på 4,2 V og en belastning på 1,0 Ω er den ideelle effekten 17,64 W. "
                    + "Komponenten må ha tilstrekkelig varmekapasitet og reserve til å lede bort varmen som oppstår, "
                    + "på en trygg måte.",
                ],
            },
            {
                id: "unit-conversions",
                title: "Enhetsomregning",
                paragraphs: ["Hold enhetene konsistente før du regner:"],
                bullets: [
                    `1 k${ohm} = 1 000 ${ohm}`,
                    `1 M${ohm} = 1 000 000 ${ohm}`,
                    "1 mA = 0,001 A",
                    "1 W = 1 000 mW",
                ],
            },
            {
                id: "limits",
                title: "Modellens begrensninger",
                paragraphs: [
                    "Ohms lov er en idealisert modell. Virkelige komponenter kan være ikke-ohmske: Motstanden kan endre "
                    + "seg med temperatur, spenning, strøm, frekvens eller driftstilstand. For serie- og "
                    + "parallellkretser bruker du Kirchhoffs lover sammen med Ohms lov.",
                ],
            },
        ],
    },
    "concept-joule-heating": {
        displayName: "Joule-oppvarming",
        description: "Joule-oppvarming beskriver hvordan elektrisk energi blir til varme når strøm går gjennom motstand.",
        summary: "Hvordan elektrisk strøm omdanner motstand til varme.",
        wikipediaUrl: "https://nb.wikipedia.org/wiki/Jouleoppvarming",
        sections: [
            {
                id: "heating-power",
                title: "Oppvarmingseffekt",
                paragraphs: ["Den elektriske oppvarmingseffekten er:"],
                formulas: [
                    { expression: "P = V × I" },
                    { expression: "P = I^2 × R" },
                    { expression: "P = V^2 / R" },
                ],
                bullets: [
                    "P er effekt i watt (W).",
                    "V er spenning i volt (V).",
                    "I er strøm i ampere (A).",
                ],
            },
            {
                id: "worked-example",
                title: "Regneeksempel",
                examples: [{
                    title: "En resistiv belastning",
                    setup: `En spole på 0,8 ${ohm} fører 3 A.`,
                    formulas: [
                        "P = I^2 × R = 3^2 × 0,8 = 7,2 W",
                        "E = P × t = 7,2 W × 10 s = 72 J",
                    ],
                    conclusion: "Spolen omdanner energi til varme med 7,2 joule per sekund, eller 72 J på 10 sekunder.",
                }],
            },
            {
                id: "what-affects-heating",
                title: "Hva påvirker oppvarmingen",
                bullets: [
                    "Ved konstant motstand gir en dobling av strømmen fire ganger så stor oppvarmingseffekt.",
                    "Ved konstant strøm dobler en dobling av motstanden oppvarmingseffekten.",
                    "Ved konstant spenning øker oppvarmingseffekten når motstanden reduseres.",
                    "Varmeoverføring til luft, væske og maskinvare bestemmer den faktiske temperaturen.",
                ],
                paragraphs: [
                    "Elektrisk effekt er en energioverføringsrate, ikke en temperatur. Varmekapasitet og varmestrøm "
                        + "bestemmer hvordan energien endrer temperaturen, og hvor raskt den forlater overflaten.",
                ],
            },
            {
                id: "practical-checks",
                title: "Praktiske kontroller",
                paragraphs: [
                    "Kontroller at komponenter, tilkoblinger og isolasjon tåler forventet strøm og effekt. Legg inn "
                        + "tilstrekkelig margin fordi virkelige komponenter kan varmes opp ujevnt, og motstanden kan "
                        + "endres med temperaturen. Batterier og strømforsyninger har også grenser for kontinuerlig strøm.",
                ],
            },
        ],
    },
    "concept-kirchhoffs-laws": {
        displayName: "Kirchhoffs lover",
        description: "Kirchhoffs strøm- og spenningslover beskriver bevaring i kretsknutepunkter og lukkede sløyfer.",
        summary: "Hvordan strøm og spenning oppfører seg i sammenkoblede kretser.",
        wikipediaUrl: "https://nb.wikipedia.org/wiki/Kirchhoffs_lover",
        sections: [
            {
                id: "circuit-terms",
                title: "Kretstermer",
                paragraphs: ["De grunnleggende termene gjør det enklere å tolke et kretsskjema:"],
                bullets: [
                    "En node er et sett ledere som er koblet sammen uten en komponent mellom dem.",
                    "En gren er en strømvei mellom to noder.",
                    "En sløyfe er en lukket vei som kommer tilbake til utgangspunktet.",
                    "En seriekobling gir strømmen bare én vei gjennom komponentene.",
                    "En parallellkobling kobler grener til de samme to nodene.",
                ],
            },
            {
                id: "current-law",
                title: "Kirchhoffs strømlov",
                formulas: [
                    { expression: "Σ I = 0" },
                    { expression: "Σ I_in = Σ I_out" },
                ],
                paragraphs: [
                    "Hvis 8 A går inn i en node og én gren fører 3 A ut, må de resterende grenene føre til sammen "
                        + "5 A ut. Velg strømretninger før du regner; et negativt resultat betyr at den virkelige "
                        + "strømmen går motsatt vei av den antatte retningen.",
                ],
            },
            {
                id: "series-and-parallel",
                title: "Serie- og parallellkretser",
                formulas: [
                    { expression: "I_total = I_1 = I_2 = ..." },
                    { expression: "R_total = R_1 + R_2 + ..." },
                    { expression: "I_total = I_1 + I_2 + ..." },
                    { expression: "1 / R_total = 1 / R_1 + 1 / R_2 + ..." },
                ],
                examples: [
                    {
                        title: "Seriekoblede motstander",
                        setup: `To motstander på 0,20 ${ohm} i serie kobles til 8,0 V.`,
                        formulas: [`R_total = 0,40 ${ohm}`, "I = 8,0 V / 0,40 Ω = 20 A"],
                        conclusion: "Den samme strømmen på 20 A går gjennom begge motstandene.",
                    },
                    {
                        title: "Parallellkoblede motstander",
                        setup: `To like grener på 0,40 ${ohm} kobles til 4,0 V.`,
                        formulas: [`R_total = 0,20 ${ohm}`, "I_total = 4,0 V / 0,20 Ω = 20 A"],
                        conclusion: "Når grenmotstandene er like, fører hver gren 10 A.",
                    },
                ],
            },
            {
                id: "voltage-law",
                title: "Kirchhoffs spenningslov",
                formulas: [
                    { expression: "Σ V = 0" },
                    { expression: "+8.0 V - V_1 - V_2 = 0" },
                    { expression: "V_total = V_1 = V_2 = ... (parallellgrener)" },
                ],
                paragraphs: [
                    "Den algebraiske summen av spenningsøkninger og spenningsfall rundt en lukket sløyfe er null. "
                        + "Velg én sløyferetning og hold polaritetene konsekvente. Hvis du snur retningen, endres "
                        + "fortegnene, ikke den fysiske løsningen. En større seriemotstand får et større spenningsfall "
                        + "fordi den samme strømmen går gjennom alle seriekoblede komponenter.",
                ],
            },
            {
                id: "cells",
                title: "Celler i serie og parallell",
                formulas: [
                    { expression: "V_pack = V_1 + V_2 + ... (serie)" },
                    { expression: "C_pack = C_1 + C_2 + ... (parallell)" },
                ],
                bullets: [
                    "Seriekoblede celler legger sammen spenningen, mens kapasiteten i amperetimer tilsvarer én lik celle.",
                    "Parallellkoblede celler beholder samme spenning, mens kapasitet og tilgjengelig strøm omtrent summeres.",
                    "Strømfordelingen avhenger av indre motstand, kontakter, ledninger og brytere.",
                    "Seriekoblede litiumioneceller krever overvåking på cellenivå og egnet balansering eller beskyttelse.",
                ],
            },
            {
                id: "solving-and-limits",
                title: "Løsning av virkelige kretser",
                bullets: [
                    "Merk nodenes spenninger, grenstrømmer og antatte strømretninger.",
                    "Bruk KCL i uavhengige noder og KVL rundt uavhengige sløyfer.",
                    "Knytt spenning og strøm i motstander sammen med V = I × R.",
                    "Løs de samtidige ligningene og kontroller effektbalansen.",
                ],
                paragraphs: [
                    "En forenklet modell kan utelate cellens indre motstand, kontaktmotstand, omformerens virkningsgrad, "
                        + "temperatureffekter, transient oppførsel, beskyttelseskretser og komponenttoleranser. Ta med "
                        + "all utelatt oppførsel som påvirker en sterkstrømskrets vesentlig.",
                ],
            },
        ],
    },
    "concept-temperature-coefficient-of-resistance": {
        displayName: "Temperaturkoeffisient for motstand (TCR)",
        description: "Temperaturkoeffisienten beskriver hvordan en leders motstand endrer seg med temperaturen.",
        summary: "Hvordan temperatur endrer motstanden i en leder.",
        sections: [
            {
                id: "linear-model",
                title: "Den lineære modellen",
                paragraphs: ["Ved en liten eller moderat temperaturendring bruker vi dette førsteordensforholdet:"],
                formulas: [{ expression: `R_T = R_0 [1 + ${alpha} (T - T_0)]` }],
                bullets: [
                    `R_0 er motstanden ved referansetemperaturen T_0.`,
                    "R_T er den estimerte motstanden ved temperaturen T.",
                    `${alpha} er materialets temperaturkoeffisient, uttrykt i 1/°C eller ppm/°C.`,
                    "Temperaturene må bruke samme skala og enheter for differansen T - T_0.",
                ],
            },
            {
                id: "positive-and-negative",
                title: "Positiv og negativ TCR",
                bullets: [
                    "En positiv TCR betyr at motstanden øker når temperaturen stiger; mange metaller oppfører seg slik.",
                    "En negativ TCR betyr at motstanden synker når temperaturen stiger.",
                    "En TCR nær null betyr at motstanden endrer seg lite innenfor det angitte området.",
                    "Fortegnet til koeffisienten er viktig; hvis en negativ verdi erstattes med absoluttverdien, snus "
                        + "forutsigelsen.",
                ],
            },
            {
                id: "worked-example",
                title: "Regneeksempel",
                examples: [{
                    title: "En oppvarmet motstand",
                    setup: `En motstand på 1,00 ${ohm} er spesifisert ved 20 ${degree}C, med en TCR på 400 ppm/${degree}C.`,
                    formulas: [
                        `${alpha} = 400 × 10^-6 / ${degree}C = 0,0004 / ${degree}C`,
                        `${delta}T = 100 - 20 = 80 ${degree}C`,
                        `R_T = 1,00 [1 + 0,0004 × 80] = 1,032 ${ohm}`,
                    ],
                    conclusion: `Den estimerte motstanden er 1,032 ${ohm}, omtrent 3,2 % høyere enn verdien ved 20 `
                        + `${degree}C.`,
                }],
            },
            {
                id: "power-and-limits",
                title: "TCR, effekt og praktiske begrensninger",
                formulas: [
                    { expression: "I = V / R" },
                    { expression: "P = V^2 / R = I^2 × R" },
                ],
                paragraphs: [
                    "For en motstand med positiv TCR som drives med konstant spenning, øker motstanden når temperaturen "
                        + "stiger, og strømmen har en tendens til å synke. For en konstantstrømkilde øker effekten når "
                        + "den samme motstanden øker.",
                    "Produsentens TCR gjelder normalt for et angitt temperatur- og motstandsområde. Temperaturgradienter, "
                        + "materialendringer, kontakter, mekanisk belastning og selvoppvarming kan gjøre at et virkelig "
                        + "resultat avviker fra førsteordensestimatet.",
                ],
            },
        ],
    },
    "concept-trigonometry": {
        displayName: "Trigonometri",
        description: "Trigonometri knytter sammen vinkler, lengder og forhold i geometriske modeller.",
        summary: "Vinkler, lengder og nyttige geometriske forhold.",
        wikipediaUrl: "https://nb.wikipedia.org/wiki/Trigonometri",
        sections: [
            {
                id: "right-triangles",
                title: "Rettvinklede trekanter",
                paragraphs: [
                    "Relativt til en vinkel θ ligger den motstående siden på andre siden av vinkelen, den hosliggende "
                        + "siden berører vinkelen uten å være hypotenusen, og hypotenusen ligger mot den rette vinkelen. "
                        + "SOH-CAH-TOA er en huskeregel: sinus er motstående side delt på hypotenusen, cosinus er "
                        + "hosliggende side delt på hypotenusen, og tangens er motstående side delt på hosliggende side.",
                ],
                formulas: [
                    { expression: "sin(θ) = motstående / hypotenuse" },
                    { expression: "cos(θ) = hosliggende / hypotenuse" },
                    { expression: "tan(θ) = motstående / hosliggende" },
                ],
            },
            {
                id: "finding-sides-and-angles",
                title: "Finn ukjente sider og vinkler",
                examples: [{
                    title: "Finn en side",
                    setup: "En hypotenus på 10 cm danner en vinkel på 30°.",
                    formulas: [
                        "motstående = 10 × sin(30°) = 5 cm",
                        "hosliggende = 10 × cos(30°) ≈ 8,66 cm",
                    ],
                    conclusion: "Bruk en invers trigonometrisk funksjon når sidelengdene er kjente.",
                }],
                formulas: [
                    { expression: "θ = sin^-1(motstående / hypotenuse)" },
                    { expression: "θ = cos^-1(hosliggende / hypotenuse)" },
                    { expression: "θ = tan^-1(motstående / hosliggende)" },
                ],
            },
            {
                id: "degrees-and-radians",
                title: "Grader og radianer",
                formulas: [
                    { expression: "180° = π radians" },
                    { expression: "θ_rad = θ_deg × π / 180" },
                ],
                paragraphs: [
                    "En kalkulator må være i riktig vinkelmodus. Hvis gradmodus brukes for en verdi i radianer, eller "
                        + "omvendt, får du et annet resultat. En hel sirkel er 360° eller 2π radianer.",
                ],
            },
            {
                id: "waveforms-and-identities",
                title: "Bølgeformer og nyttige identiteter",
                formulas: [
                    { expression: "x(t) = A × sin(2πft + φ)" },
                    { expression: "ω = 2πf" },
                    { expression: "sin^2(θ) + cos^2(θ) = 1" },
                    { expression: "a^2 + b^2 = c^2" },
                ],
                bullets: [
                    "A er amplitude, f er frekvens i hertz, t er tid i sekunder, og φ er fasevinkel.",
                    "Vinkelfrekvensen ω måles i radianer per sekund.",
                    "Behold fortegn og kvadrant når retning eller fase er viktig.",
                ],
            },
        ],
    },
    "concept-heat-capacity": {
        displayName: "Varmekapasitet",
        description: "Varmekapasitet beskriver hvor mye energi som trengs for å endre temperaturen til et objekt.",
        summary: "Hvordan masse og materiale påvirker temperaturendring.",
        wikipediaUrl: "https://nb.wikipedia.org/wiki/Varmekapasitet",
        sections: [
            {
                id: "basic-relationships",
                title: "Grunnleggende sammenhenger",
                formulas: [
                    { expression: "C = Q / ΔT" },
                    { expression: "Q = m × c × ΔT" },
                ],
                bullets: [
                    "C er varmekapasitet i J/K eller J/°C.",
                    "Q er overført varmeenergi i joule (J).",
                    "m er masse i kilogram, og c er spesifikk varmekapasitet i J/(kg·K).",
                    "En temperaturforskjell på 1 K er like stor som en forskjell på 1 °C.",
                ],
            },
            {
                id: "worked-example",
                title: "Regneeksempel",
                examples: [{
                    title: "Oppvarming av vann",
                    setup: "Varm opp 0,20 kg vann fra 20 °C til 70 °C med c = 4 180 J/(kg·K).",
                    formulas: ["ΔT = 70 - 20 = 50 °C", "Q = 0,20 × 4 180 × 50 = 41 800 J"],
                    conclusion: "Det ideelle energibehovet er 41,8 kJ; en virkelig varmeovn trenger mer på grunn av tap.",
                }],
            },
            {
                id: "electrical-heating",
                title: "Oppvarming med elektrisk effekt",
                formulas: [
                    { expression: "Q = P × t" },
                    { expression: "t = m × c × ΔT / P" },
                ],
                examples: [{
                    title: "Ideell oppvarmingstid",
                    setup: "Varm opp eksempelet på 41,8 kJ med en konstant kilde på 100 W uten tap.",
                    formulas: ["t = 41 800 J / 100 W = 418 s"],
                    conclusion: "Den ideelle tiden er omtrent 7,0 minutter; ved 80 % overføringseffektivitet er den "
                        + "omtrent 523 sekunder.",
                }],
            },
            {
                id: "object-and-material",
                title: "Objekt kontra materiale",
                paragraphs: [
                    "Varmekapasiteten gjelder hele objektet og avhenger av hvor mye materiale som er til stede. Spesifikk "
                        + "varmekapasitet er en materialegenskap. Dobling av massen dobler varmekapasiteten for samme "
                        + "materiale.",
                ],
                formulas: [{ expression: "C_total = Σ m_i × c_i" }],
            },
            {
                id: "phase-changes-and-limits",
                title: "Faseendringer og praktiske begrensninger",
                formulas: [{ expression: "Q = m × L" }],
                paragraphs: [
                    "Under smelting eller koking kan tilført energi endre materialets fase uten å endre temperaturen. L "
                        + "er spesifikk latent varme i J/kg.",
                    "Den enkle ligningen antar at den spesifikke varmekapasiteten er omtrent konstant. Varmetap, "
                        + "konveksjon, stråling, fordamping, kontaktmotstand og ujevn temperatur kan gjøre at et virkelig "
                        + "resultat avviker fra det ideelle.",
                ],
            },
        ],
    },
    "concept-heat-flux": {
        displayName: "Varmefluks",
        description: "Varmefluks beskriver hvor mye varmeenergi som passerer gjennom en overflate per tidsenhet og arealenhet.",
        summary: "Varmeoverføring per arealenhet.",
        wikipediaUrl: "https://nb.wikipedia.org/wiki/Varmefluks",
        sections: [
            {
                id: "definition",
                title: "Definisjon",
                formulas: [{ expression: "q'' = Q_dot / A" }],
                bullets: [
                    "q'' er varmestrømtetthet, også kalt varmefluks, i W/m².",
                    "Q_dot er samlet varmeoverføringsrate i watt (W).",
                    "A er arealet som varmen overføres gjennom, i kvadratmeter (m²).",
                ],
                paragraphs: [
                    "Varmefluks er forskjellig fra varmekapasitet: Varmekapasitet beskriver lagret energi per "
                        + "temperaturendring, mens varmefluks beskriver varmeoverføring per arealenhet.",
                ],
            },
            {
                id: "worked-example",
                title: "Regneeksempel",
                examples: [{
                    title: "Gjennomsnittlig varmefluks fra en varmeovn",
                    setup: "En varmeovn på 100 W overfører varme gjennom et areal på 0,020 m².",
                    formulas: ["q'' = 100 W / 0,020 m² = 5 000 W/m²"],
                    conclusion: "Den gjennomsnittlige varmefluksen er 5 000 W/m², eller 0,5 W/cm².",
                }],
            },
            {
                id: "conduction",
                title: "Ledning gjennom et flatt lag",
                formulas: [
                    { expression: "q'' = -k × ΔT / L" },
                    { expression: "Q_dot = k × A × (T_hot - T_cold) / L" },
                ],
                bullets: [
                    "k er varmeledningsevne i W/(m·K).",
                    "ΔT er temperaturforskjellen over laget.",
                    "L er lagets tykkelse i meter.",
                    "Minustegnet angir strømning fra høyere temperatur mot lavere temperatur.",
                ],
            },
            {
                id: "convection-and-radiation",
                title: "Konveksjon og stråling",
                formulas: [
                    { expression: "q'' = h × (T_s - T_∞)" },
                    { expression: "q'' = ε × σ × (T_s^4 - T_sur^4)" },
                ],
                paragraphs: [
                    "Konveksjon bruker en overflatekoeffisient h. Stråling bruker emissivitet ε og Stefan–Boltzmanns "
                        + "konstant σ; temperaturene i strålingsligningen må være absolutte temperaturer i kelvin.",
                ],
            },
            {
                id: "practical-checks",
                title: "Praktiske kontroller",
                bullets: [
                    "Konverter arealet til m² før du bruker W/m².",
                    "Skill mellom gjennomsnittlig varmefluks og en lokal topp; oppvarmingen kan være ujevn.",
                    "Ta med kontaktmotstand, konveksjon, stråling og varmetap når det er nødvendig.",
                    "Varmefluks er en overføringsrate per arealenhet, ikke en temperatur; bruk varmekapasitet for temperaturendring.",
                ],
            },
        ],
    },
    "concept-si-system-and-imperial-units": {
        displayName: "SI-systemet og britiske måleenheter",
        description: "SI-systemet gir et sammenhengende grunnlag for enheter og omregning mellom måleverdier.",
        summary: "SI-enheter, prefikser og praktiske omregninger.",
        wikipediaUrl: "https://nb.wikipedia.org/wiki/SI-systemet",
        sections: [
            {
                id: "base-units",
                title: "Vanlige SI-enheter",
                table: {
                    headers: ["Størrelse", "SI-enhet", "Symbol"],
                    rows: [
                        ["Lengde", "meter", "m"],
                        ["Masse", "kilogram", "kg"],
                        ["Tid", "sekund", "s"],
                        ["Temperatur", "kelvin", "K"],
                        ["Elektrisk strøm", "ampere", "A"],
                        ["Stoffmengde", "mol", "mol"],
                        ["Lysstyrke", "candela", "cd"],
                    ],
                },
                bullets: [
                    "Spenning: volt (V).",
                    `Motstand: ohm (${ohm}).`,
                    "Effekt: watt (W).",
                    "Energi: joule (J).",
                    "Kraft: newton (N).",
                    "Trykk: pascal (Pa).",
                    "Frekvens: hertz (Hz).",
                ],
            },
            {
                id: "decimal-prefixes",
                title: "Desimalprefikser",
                table: {
                    headers: ["Prefiks", "Symbol", "Faktor"],
                    rows: [
                        ["kilo", "k", "1 000 = 10^3"],
                        ["mega", "M", "1 000 000 = 10^6"],
                        ["milli", "m", "0,001 = 10^-3"],
                        ["mikro", "μ", "0,000001 = 10^-6"],
                        ["nano", "n", "0,000000001 = 10^-9"],
                    ],
                },
                paragraphs: [`For eksempel er 2,2 k${ohm} lik 2 200 ${ohm}, og 15 mA er lik 0,015 A. Konverter verdier `
                    + "til kompatible enheter før du bruker en formel."],
            },
            {
                id: "length-conversions",
                title: "Tommer og metrisk lengde",
                formulas: [
                    { expression: "1 tomme = 25,4 mm = 0,0254 m" },
                    { expression: "1 fot = 12 tommer = 0,3048 m" },
                    { expression: "1 yard = 3 fot = 0,9144 m" },
                    { expression: "1 in² = 645.16 mm²" },
                ],
                examples: [{
                    title: "Konverter lengde",
                    setup: "Konverter 0,1 tomme til millimeter og 5 mm til tommer.",
                    formulas: ["0,1 tomme × 25,4 = 2,54 mm", "5 mm / 25,4 ≈ 0,19685 tomme"],
                    conclusion: "Areal- og volumomregning bruker lengdefaktoren opphøyd i den relevante potensen.",
                }],
            },
            {
                id: "other-conversions",
                title: "Andre vanlige omregninger",
                bullets: [
                    "1 lb ≈ 0,45359237 kg.",
                    "1 lbf ≈ 4,44822 N.",
                    "1 psi ≈ 6 894,76 Pa.",
                    "°F = °C × 9/5 + 32.",
                    "°C = (°F - 32) × 5/9.",
                    "K = °C + 273,15.",
                ],
                paragraphs: [
                    "En pound kan vise til masse (lb) eller kraft (lbf), som er ulike størrelser. På samme måte måler "
                        + "tommer, kvadrattommer og kubikktommer ulike dimensjoner.",
                ],
            },
            {
                id: "unit-checks",
                title: "Praktiske enhetskontroller",
                bullets: [
                    "Skriv enheten ved siden av hver verdi mens du regner.",
                    "Kontroller at begge sider av en ligning har kompatible dimensjoner.",
                    "Konverter før du multipliserer eller dividerer.",
                    "Avrund først til slutt, slik at mellomresultatene beholder nyttig presisjon.",
                ],
            },
        ],
    },
    "concept-wire-gauges-awg-swg-bwg": {
        displayName: "Tråddimensjoner: AWG, SWG og BWG",
        description: "Tråddimensjonssystemer beskriver diameter og areal på ulike måter.",
        summary: "Hvordan AWG, SWG og BWG beskriver tråddimensjoner.",
        sections: [
            {
                id: "gauge-systems",
                title: "Dimensjonssystemer",
                bullets: [
                    "AWG er American Wire Gauge, også historisk kjent som Brown & Sharpe gauge.",
                    "SWG er Standard Wire Gauge, det historiske britiske systemet for tråd- og platetykkelse.",
                    "BWG er Birmingham Wire Gauge, historisk brukt for jerntråd, rør og platetykkelse.",
                    "Et høyere vanlig dimensjonstall betyr generelt mindre diameter; størrelser over dimensjon 0 bruker "
                        + "00, 000 eller 0000.",
                ],
                paragraphs: [
                    "SWG og BWG er tabellerte systemer og skal ikke beregnes med AWG-formelen. Det samme tallet angir "
                        + "derfor ikke samme diameter på tvers av systemene.",
                ],
            },
            {
                id: "awg-formula",
                title: "AWG-diameter og areal",
                formulas: [
                    { expression: "d_inch = 0.005 × 92^((36 - n) / 39)" },
                    { expression: "d_mm = 0.127 × 92^((36 - n) / 39)" },
                    { expression: "A = π × d^2 / 4" },
                ],
                paragraphs: [
                    "For 1/0, 2/0, 3/0 og 4/0 bruker du n = 0, -1, -2 og -3. AWG bestemmer lederstørrelsen, ikke en "
                        + "universell trygg strøm; strømføringsevnen avhenger også av materiale, isolasjon, kjøling, "
                        + "installasjon og gjeldende elektriske regler.",
                ],
            },
            {
                id: "system-comparison",
                title: "Hvorfor systemnavnet er viktig",
                table: {
                    headers: ["Dimensjon", "AWG", "Britisk SWG", "BWG"],
                    rows: [
                        ["10", "2,588 mm", "3,251 mm", "3,404 mm"],
                        ["20", "0,8128 mm", "0,9144 mm", "0,8890 mm"],
                        ["30", "0,2540 mm", "0,3150 mm", "0,3048 mm"],
                    ],
                },
                paragraphs: [
                    "Disse verdiene er nominelle. Produkttoleranser, belegg, isolasjon og flertrådet oppbygning kan "
                        + "endre målt eller samlet diameter.",
                ],
            },
            {
                id: "resistance",
                title: "Dimensjon, areal og motstand",
                formulas: [{ expression: "R = ρ × L / A" }],
                paragraphs: [
                    `Motstanden avhenger av lederens lengde L, tverrsnittsareal A og materialets resistivitet ${rho}. Fordi `
                        + "arealet varierer med kvadratet av diameteren, kan en moderat forskjell i diameter gi en "
                        + "betydelig forskjell i motstand. I AWG halverer en økning på omtrent tre dimensjoner arealet og "
                        + "dobler motstanden per lengdeenhet for samme materiale og temperatur.",
                ],
            },
            {
                id: "practical-specification",
                title: "Praktisk spesifikasjon",
                bullets: [
                    "Oppgi systemet, for eksempel 24 AWG eller 24 British SWG.",
                    "Ta med nominell diameter i millimeter når systemene kan forveksles.",
                    "Oppgi om dimensjonen gjelder bar leder, isolert diameter, platetykkelse eller rørveggens tykkelse.",
                    "For flertrådede ledere må du oppgi trådkonstruksjonen når fleksibilitet og samlet diameter er viktig.",
                    "Finn strømkapasiteten i produktdata og elektriske regler, ikke ut fra dimensjonstallet alene.",
                ],
            },
        ],
    },
};

const bokmaalMaterialNames: Readonly<Record<string, string>> = {
    ti1: "Titan 1",
    ti2: "Titan 2 (R50400)",
    w: "Wolfram",
    nio: "Niobiumlegering",
    ni200: "Nikkel 200 / Ni200 (UNS N02200)",
    zr: "Zirkonium (rent)",
};

const bokmaalBatteryNotes: Readonly<Record<string, string>> = {
    "battery-61": "Batteri for lav belastning; egner seg ikke for damping.",
    "battery-71": "20 A kontinuerlig verdi; pulsverdier brukes ikke.",
    "battery-72": "Den faktiske kapasiteten er lavere enn etiketten antyder.",
    "battery-73": "Den faktiske kapasiteten er lavere enn etiketten antyder.",
    "battery-77": "20 A konservativ, uavhengig sammenligningsverdi; nøyaktig omslag og produksjonsrevisjon er fortsatt relevante.",
    "battery-78": "15 A konservativ verdi fra testing av nøyaktig modell; den testede CCC-merkede revisjonen er fortsatt relevant.",
    "battery-79": "45 A uavhengig kontinuerlig verdi for den testede tabless-revisjonen; ikke erstatt den med pulsverdier.",
    "battery-80": "36 A faktisk kontinuerlig verdi; 56 A-verdien er temperaturbegrenset.",
    "battery-81": "40 A konservativ verdi; de testede cellene så ut til å være førproduksjon og manglet CCC-logo.",
    "battery-82": "13 A anbefalt kontinuerlig verdi; 16,8 A er et absolutt maksimum som ikke er ment for lang levetid.",
    "battery-83": "40 A konservativ verdi; 70 A er temperaturbegrenset og de testede prøvene var førproduksjon.",
    "battery-84": "40 A sammenligningsverdi for produksjonscelle; 70 A krever temperaturkontroll.",
    "battery-85": "40 A verdi for nøyaktig omslag; 70 A er begrenset til 60 °C og testet som en EVE 40PL-rewrap.",
    "battery-86": "19 A konservativ verdi; de nøyaktig testede prøvene så ut til å være førproduksjon og manglet CCC-merker.",
    "battery-87": "40 A konservativ verdi; 90 A er temperaturbegrenset og de testede cellene så ut til å være førproduksjon.",
    "battery-88": "40 A konservativ verdi; 60 A er temperaturbegrenset og produksjonskontinuiteten er fortsatt uavklart.",
    "battery-89": "40 A konservativ verdi; de testede prøvene hadde ujevn kapasitet og manglet CCC-/CE-merker.",
    "battery-90": "13 A konservativ verdi; de nøyaktig testede prøvene så ut til å være førproduksjon og manglet CCC-merker.",
    "battery-91": "30 A kontinuerlig verdi anslått av tester; Reliances maksimum på 50 A er temperaturbegrenset.",
    "battery-92": "20 A kontinuerlig verdi fra to produksjonsrelaterte testpartier; 30 A er temperaturbegrenset.",
    "battery-93": "12 A kontinuerlig; 20 A er kun puls. Det nøyaktig testede omslaget er registrert som SA110 / INR18650/40.",
    "battery-94": "20 A verdi for nøyaktig omslag; testeren anbefaler under 15 A kontinuerlig. Vapehuset oppgir 25 A i tittelen, og senere rewrap-kilder eller omslagsrevisjoner kan avvike.",
    "battery-95": "30 A verdi for nøyaktig modell; dette er en rewrap, og senere omslagsrevisjoner eller underliggende kilde kan avvike.",
    "battery-96": "30 A verdi for nøyaktig fembeinsrevisjon; firebeins- og senere revisjoner med samme omslag er vesentlig forskjellige og må ikke arve denne profilen.",
};

export const presentations: CatalogPresentationSet = {
    concepts: recordFor(concepts, (concept) => ({
        ...english.concepts[concept.id],
        ...bokmaalConcepts[concept.id],
    })),
    materials: recordFor(materials, (material) => {
        const displayName = bokmaalMaterialNames[material.id] ?? material.name;
        return {
            ...english.materials[material.id],
            displayName,
            description: `Katalogprofil for ${displayName}, med data for motstandstråd og temperaturkontroll.`,
            summary: `Et katalogmateriale for motstandstråd og temperaturkontroll: ${displayName}.`,
            safetyText: "Bruk en verifisert materialprofil, og følg enhetens temperatur- og driftsgrenser.",
        };
    }),
    batteries: recordFor(batteryPresets, (battery) => ({
        ...english.batteries[battery.id],
        description: "En oppladbar celle eller batteripakke for kompatible enheter.",
        summary: battery.batteryAccess === "integrated"
            ? "En integrert batteripakke i enheten."
            : "En utskiftbar, oppladbar celle for kompatible enheter.",
        notes: bokmaalBatteryNotes[battery.id]
            ? [bokmaalBatteryNotes[battery.id]]
            : undefined,
        safetyText: battery.safetyWarning
            ? "Bruk bare batteriet innenfor oppgitte grenser og ikke i en enhet som krever høyere belastning."
            : undefined,
    })),
    mods: recordFor(builtInPresets, (mod) => ({
        ...english.mods[mod.id],
        description: `Profil for en regulert enhet eller et styrekort: ${mod.displayName}.`,
        summary: "En profil for en regulert enhet eller et styrekort.",
    })),
};
