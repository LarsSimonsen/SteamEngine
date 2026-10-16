import type { CatalogPresentationSet } from "../catalog-presentations";
import { presentations as draftPresentations } from "./pt-BR";

type MutableExample = { title?: string; setup?: string; conclusion?: string; formulas?: string[] };
type MutableSection = {
    id: string;
    title?: string;
    paragraphs?: string[];
    bullets?: string[];
    formulas?: Array<{ expression: string }>;
    examples?: MutableExample[];
    table?: { headers: string[]; rows: string[][] };
};
type MutableConcept = { displayName?: string; description?: string; summary?: string; sections: MutableSection[] };
type MutablePresentationSet = { concepts: Record<string, MutableConcept> };

const corrected = JSON.parse(JSON.stringify(draftPresentations)) as MutablePresentationSet;
const getSection = (conceptId: string, sectionId: string): MutableSection => {
    const section = corrected.concepts[conceptId].sections.find((candidate) => candidate.id === sectionId);
    if (!section) {
        throw new Error("Brazilian Portuguese catalog section not found: " + conceptId + "/" + sectionId);
    }

    return section;
};

getSection("concept-ohms-law", "relationship").formulas![0].expression = "V = I × R";
getSection("concept-ohms-law", "relationship").bullets![1] = "I é a corrente, medida em amperes (A).";
getSection("concept-ohms-law", "rearranged-formulas").formulas![0].expression = "I = V / R";
getSection("concept-ohms-law", "rearranged-formulas").formulas![1].expression = "R = V / I";
getSection("concept-ohms-law", "electrical-power").title = "Potência elétrica";
getSection("concept-ohms-law", "electrical-power").formulas![0].expression =
    "P = V × I = I^2 × R = V^2 / R";

getSection("concept-joule-heating", "heating-power").formulas![1].expression = "P = I^2 × R";
getSection("concept-joule-heating", "heating-power").formulas![2].expression = "P = V^2 / R";
getSection("concept-joule-heating", "worked-example").examples![0].conclusion =
    "A bobina converte energia em calor com uma potência de 7,2 W, ou seja, 72 J em 10 segundos.";

getSection("concept-trigonometry", "right-triangles").formulas![0].expression =
    "sin(θ) = opposite / hypotenuse";
getSection("concept-trigonometry", "right-triangles").formulas![2].expression =
    "tan(θ) = opposite / adjacent";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].formulas![0] =
    "opposite = 10 × sin(30°) = 5 cm";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas![0].expression =
    "θ = sin^-1(opposite / hypotenuse)";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas![1].expression =
    "θ = cos^-1(adjacent / hypotenuse)";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas![2].expression =
    "θ = tan^-1(opposite / adjacent)";
getSection("concept-trigonometry", "waveforms-and-identities").formulas![2].expression =
    "sin^2(θ) + cos^2(θ) = 1";

getSection("concept-heat-capacity", "basic-relationships").formulas![0].expression = "C = Q / ΔT";
getSection("concept-heat-capacity", "worked-example").examples![0].formulas![0] =
    "ΔT = 70 - 20 = 50 °C";
getSection("concept-heat-capacity", "electrical-heating").formulas![1].expression =
    "t = m × c × ΔT / P";
getSection("concept-heat-capacity", "electrical-heating").examples![0].conclusion =
    "O tempo ideal é de cerca de 7,0 minutos; com eficiência de transferência de 80%, são cerca de 523 s.";
getSection("concept-heat-capacity", "phase-changes-and-limits").paragraphs![1] =
    "A equação simples assume que a capacidade térmica específica é aproximadamente constante. Perda de calor, "
    + "convecção, radiação, evaporação, resistência de contato e temperatura não uniforme podem fazer o resultado real "
    + "diferir do ideal.";

getSection("concept-heat-flux", "definition").formulas![0].expression = "q'' = Q_dot / A";
getSection("concept-heat-flux", "worked-example").examples![0].formulas![0] =
    "q'' = 100 W / 0,020 m² = 5.000 W/m²";
getSection("concept-heat-flux", "conduction").formulas![0].expression = "q'' = -k × ΔT / L";
getSection("concept-heat-flux", "conduction").formulas![1].expression =
    "Q_dot = k × A × (T_hot - T_cold) / L";
getSection("concept-heat-flux", "convection-and-radiation").paragraphs![0] =
    "A convecção usa o coeficiente de convecção h. A radiação usa a emissividade ε e a constante de Stefan–Boltzmann σ; "
    + "as temperaturas na equação de radiação devem ser temperaturas absolutas em Kelvin.";

const siBaseUnits = getSection("concept-si-system-and-imperial-units", "base-units").table!;
siBaseUnits.rows[0][2] = "m";
siBaseUnits.rows[2][0] = "Tempo";
siBaseUnits.rows[2][1] = "segundo";
siBaseUnits.rows[2][2] = "s";
siBaseUnits.rows[4][2] = "A";
siBaseUnits.rows[5][0] = "Quantidade de substância";
siBaseUnits.rows[5][1] = "mol";
siBaseUnits.rows[6][2] = "cd";

getSection("concept-ohms-law", "relationship").title = "A relação";
corrected.concepts["concept-joule-heating"].summary =
    "Como a corrente elétrica transforma a energia elétrica em calor.";
getSection("concept-joule-heating", "worked-example").examples![0].formulas![0] =
    "P = I^2 × R = 3^2 × 0,8 = 7,2 W";
getSection("concept-joule-heating", "worked-example").examples![0].setup =
    "Uma bobina de 0,8 Ω é percorrida por uma corrente de 3 A.";
getSection("concept-joule-heating", "what-affects-heating").bullets![3] =
    "A transferência de calor para o ar, o líquido e o equipamento determina a temperatura real.";

getSection("concept-kirchhoffs-laws", "circuit-terms").bullets![1] =
    "Uma ramificação é um caminho da corrente entre dois nós.";
getSection("concept-kirchhoffs-laws", "circuit-terms").bullets![2] =
    "Um circuito fechado retorna ao ponto inicial.";
getSection("concept-kirchhoffs-laws", "current-law").title = "Lei das correntes de Kirchhoff";
getSection("concept-kirchhoffs-laws", "current-law").formulas![0].expression = "Σ I = 0";
getSection("concept-kirchhoffs-laws", "current-law").paragraphs![0] =
    "Se 8 A entram em um nó e uma ramificação leva 3 A para fora, as ramificações restantes devem levar 5 A no total. "
    + "Escolha as direções das correntes antes de resolver; um resultado negativo significa que a corrente real flui no "
    + "sentido oposto ao assumido.";
getSection("concept-kirchhoffs-laws", "series-and-parallel").examples![1].conclusion =
    "Com resistências de ramificação iguais, cada ramificação conduz 10 A.";
getSection("concept-kirchhoffs-laws", "cells").formulas![0].expression =
    "V_pack = V_1 + V_2 + ... (series)";

getSection("concept-temperature-coefficient-of-resistance", "worked-example").examples![0].setup =
    "Uma resistência de 1,00 Ω é especificada a 20 °C, com um TCR de 400 ppm/°C.";
getSection("concept-temperature-coefficient-of-resistance", "power-and-limits").formulas![0].expression =
    "I = V / R";
getSection("concept-temperature-coefficient-of-resistance", "power-and-limits").formulas![1].expression =
    "P = V^2 / R = I^2 × R";
getSection("concept-trigonometry", "right-triangles").formulas![1].expression =
    "cos(θ) = adjacent / hypotenuse";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].formulas![1] =
    "adjacent = 10 × cos(30°) ≈ 8,66 cm";

corrected.concepts["concept-heat-flux"].displayName = "Densidade do fluxo de calor";
getSection("concept-heat-flux", "definition").bullets![0] =
    "q'' é a densidade do fluxo de calor em W/m².";
getSection("concept-heat-flux", "conduction").bullets![3] =
    "O sinal negativo indica o fluxo de calor da temperatura mais alta para a temperatura mais baixa.";
getSection("concept-heat-flux", "practical-checks").bullets![1] =
    "Distinga o fluxo de calor médio de um pico local; o aquecimento pode ser irregular.";

const siUnits = getSection("concept-si-system-and-imperial-units", "base-units").table!;
siUnits.rows[0][1] = "metro";
siUnits.rows[1][0] = "Massa";
getSection("concept-si-system-and-imperial-units", "decimal-prefixes").table!.rows[2][1] = "m";
getSection("concept-wire-gauges-awg-swg-bwg", "awg-formula").formulas![0].expression =
    "d_inch = 0.005 × 92^((36 - n) / 39)";

getSection("concept-ohms-law", "rearranged-formulas").bullets![2] =
    "Uma resistência de 0 Ω é um curto-circuito ideal e deve ser tratada separadamente.";
getSection("concept-ohms-law", "worked-examples").examples![0].title = "Calcular a corrente";
getSection("concept-ohms-law", "worked-examples").examples![1].title = "Calcular a resistência";
getSection("concept-ohms-law", "worked-examples").examples![2].title = "Calcular a tensão";

getSection("concept-joule-heating", "what-affects-heating").paragraphs![0] =
    "A potência elétrica é uma taxa de transferência de energia, não uma temperatura. A capacidade térmica e a densidade "
    + "do fluxo de calor determinam como essa energia altera a temperatura e com que rapidez ela deixa a superfície.";
getSection("concept-joule-heating", "practical-checks").paragraphs![0] =
    "Verifique se os componentes, as conexões e o isolamento suportam a corrente e a potência esperadas. Mantenha uma margem "
    + "adequada, pois os componentes reais podem aquecer de forma desigual e a resistência pode mudar com a temperatura. "
    + "Baterias e fontes de alimentação também têm limites de corrente contínua.";

corrected.concepts["concept-kirchhoffs-laws"].description =
    "As leis de Kirchhoff para corrente e tensão descrevem a conservação da carga nos nós e da energia ao redor de malhas fechadas.";
getSection("concept-kirchhoffs-laws", "circuit-terms").paragraphs![0] =
    "Os termos básicos tornam um diagrama de circuito mais fácil de interpretar:";
getSection("concept-kirchhoffs-laws", "voltage-law").formulas![2].expression =
    "V_total = V_1 = V_2 = ... (parallel branches)";
getSection("concept-kirchhoffs-laws", "voltage-law").paragraphs![0] =
    "A soma algébrica das elevações e quedas de tensão em uma malha fechada é zero. Escolha uma direção para a malha e mantenha "
    + "as polaridades consistentes. Inverter a direção muda os sinais, mas não a solução física. Uma resistência em série maior "
    + "tem uma queda de tensão maior porque a mesma corrente passa por cada componente em série.";
getSection("concept-kirchhoffs-laws", "cells").bullets![0] =
    "As células ligadas em série somam as tensões, enquanto a capacidade em ampere-hora permanece igual à de uma célula individual equivalente.";
getSection("concept-kirchhoffs-laws", "cells").bullets![1] =
    "As células ligadas em paralelo mantêm a mesma tensão, enquanto a capacidade e a corrente disponível aumentam aproximadamente de forma proporcional.";
getSection("concept-kirchhoffs-laws", "solving-and-limits").bullets![2] =
    "Relacione a tensão e a corrente no resistor por V = I × R.";

corrected.concepts["concept-temperature-coefficient-of-resistance"].displayName =
    "Coeficiente de temperatura da resistência (TCR)";
getSection("concept-temperature-coefficient-of-resistance", "linear-model").title = "Modelo linear";
getSection("concept-temperature-coefficient-of-resistance", "linear-model").bullets![2] =
    "α é o coeficiente de temperatura do material, expresso em 1 / °C ou ppm / °C.";

getSection("concept-trigonometry", "right-triangles").paragraphs![0] =
    "Em relação a um ângulo θ, o lado oposto fica do lado contrário ao ângulo, o lado adjacente toca no ângulo sem ser a "
    + "hipotenusa, e a hipotenusa fica em frente ao ângulo reto. SOH-CAH-TOA ajuda a memorizar que o seno é o lado oposto "
    + "dividido pela hipotenusa, o cosseno é o lado adjacente dividido pela hipotenusa e a tangente é o lado oposto dividido pelo adjacente.";
getSection("concept-trigonometry", "degrees-and-radians").formulas![1].expression =
    "θ_rad = θ_deg × π / 180";

corrected.concepts["concept-heat-capacity"].displayName = "Capacidade térmica";
getSection("concept-heat-capacity", "basic-relationships").title = "Relações básicas";

corrected.concepts["concept-heat-flux"].description =
    "A densidade do fluxo de calor descreve a rapidez com que o calor atravessa cada unidade de área, independentemente da quantidade total de material que armazena calor.";
corrected.concepts["concept-heat-flux"].summary = "A taxa de transferência de calor por unidade de área.";
getSection("concept-heat-flux", "worked-example").title = "Densidade média do fluxo de calor";
getSection("concept-heat-flux", "worked-example").examples![0].conclusion =
    "A densidade média do fluxo de calor é de 5.000 W/m², ou 0,5 W/cm².";
getSection("concept-wire-gauges-awg-swg-bwg", "awg-formula").formulas![2].expression =
    "A = π × d^2 / 4";

corrected.concepts["concept-kirchhoffs-laws"].description =
    "As leis de corrente e tensão de Kirchhoff descrevem a conservação da carga nos nós e da energia nas malhas " +
    "fechadas.";
getSection("concept-kirchhoffs-laws", "voltage-law").formulas![1].expression = "+8,0 V - V_1 - V_2 = 0";
corrected.concepts["concept-temperature-coefficient-of-resistance"].description =
    "O coeficiente de temperatura da resistência descreve como a resistência de um componente varia com a temperatura.";
corrected.concepts["concept-heat-flux"].displayName = "Densidade do fluxo de calor";
getSection("concept-wire-gauges-awg-swg-bwg", "practical-specification").bullets![4] =
    "Determine a capacidade de condução de corrente com base nos dados do produto e nas normas elétricas, não apenas no " +
    "número da bitola.";

getSection("concept-kirchhoffs-laws", "current-law").title = "Lei das correntes de Kirchhoff";
getSection("concept-kirchhoffs-laws", "current-law").formulas![0].expression = "Σ I = 0";
getSection("concept-joule-heating", "worked-example").examples![0].formulas![0] =
    "P = I^2 × R = 3^2 × 0,8 = 7,2 W";

getSection("concept-trigonometry", "right-triangles").formulas![0].expression =
    "sin(θ) = lado oposto / hipotenusa";
getSection("concept-trigonometry", "right-triangles").formulas![1].expression =
    "cos(θ) = lado adjacente / hipotenusa";
getSection("concept-trigonometry", "right-triangles").formulas![2].expression =
    "tan(θ) = lado oposto / lado adjacente";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas![0].expression =
    "θ = sin^-1(lado oposto / hipotenusa)";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas![1].expression =
    "θ = cos^-1(lado adjacente / hipotenusa)";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas![2].expression =
    "θ = tan^-1(lado oposto / lado adjacente)";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].formulas![0] =
    "lado oposto = 10 × sin(30°) = 5 cm";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].formulas![1] =
    "lado adjacente = 10 × cos(30°) ≈ 8,66 cm";
getSection("concept-kirchhoffs-laws", "cells").formulas![0].expression =
    "V_pack = V_1 + V_2 + ... (série)";
getSection("concept-kirchhoffs-laws", "voltage-law").formulas![2].expression =
    "V_total = V_1 = V_2 = ... (ramos paralelos)";

getSection("concept-heat-capacity", "electrical-heating").title =
    "Aquecimento com potência elétrica";

getSection("concept-ohms-law", "worked-examples").title =
    "Exemplos resolvidos";
getSection("concept-joule-heating", "worked-example").title =
    "Exemplo resolvido";
getSection("concept-temperature-coefficient-of-resistance", "worked-example").title =
    "Exemplo resolvido";
getSection("concept-heat-capacity", "worked-example").title =
    "Exemplo resolvido";
getSection("concept-heat-flux", "worked-example").title =
    "Exemplo resolvido";
getSection("concept-ohms-law", "electrical-power").paragraphs![0] =
    "A lei de Ohm combina com a relação de potência P = V × I. A potência P é medida em "
    + "watts (W). Para uma fonte de 4,2 V e uma carga de 1,0 Ω, a potência ideal é 17,64 W. O "
    + "componente precisa de capacidade térmica e margem suficientes para dissipar o calor "
    + "resultante com segurança.";
getSection("concept-joule-heating", "practical-checks").paragraphs![0] =
    "Verifique se os componentes, as conexões e o isolamento suportam a corrente e a "
    + "potência esperadas. Mantenha uma margem adequada, pois os componentes reais podem "
    + "aquecer de forma desigual e a resistência pode mudar com a temperatura. Baterias e "
    + "fontes de alimentação também têm limites de corrente em operação contínua.";
getSection("concept-kirchhoffs-laws", "cells").bullets![3] =
    "O carregamento de células de íons de lítio conectadas em série requer monitoramento no "
    + "nível de cada célula e balanceamento ou proteção apropriados.";
getSection("concept-temperature-coefficient-of-resistance", "power-and-limits").paragraphs![1] =
    "O TCR do fabricante normalmente se aplica a uma faixa declarada de temperatura e "
    + "resistência. Gradientes de temperatura, mudanças de material, contatos, deformação "
    + "mecânica e autoaquecimento podem fazer com que um resultado real seja diferente da "
    + "estimativa de primeira ordem.";
getSection("concept-si-system-and-imperial-units", "base-units").table!.headers![0] =
    "Grandeza";
getSection("concept-si-system-and-imperial-units", "other-conversions").paragraphs![0] =
    "Uma libra pode se referir à massa (lb) ou à força (lbf), que são grandezas diferentes. "
    + "Da mesma forma, polegadas, polegadas quadradas e polegadas cúbicas medem dimensões "
    + "diferentes.";
corrected.concepts["concept-wire-gauges-awg-swg-bwg"].description =
    "Um número de bitola só descreve um tamanho nominal quando o sistema de bitolas é "
    + "identificado.";
getSection("concept-wire-gauges-awg-swg-bwg", "gauge-systems").title =
    "Sistemas de bitolas";
getSection("concept-wire-gauges-awg-swg-bwg", "gauge-systems").bullets![0] =
    "AWG é o American Wire Gauge, também conhecido historicamente como sistema de bitolas "
    + "Brown & Sharpe.";
getSection("concept-wire-gauges-awg-swg-bwg", "gauge-systems").bullets![3] =
    "Um número de bitola comum maior geralmente significa um diâmetro menor; tamanhos acima "
    + "da bitola 0 usam 00, 000 ou 0000.";
getSection("concept-wire-gauges-awg-swg-bwg", "system-comparison").table!.headers![0] =
    "Bitola";
getSection("concept-wire-gauges-awg-swg-bwg", "resistance").title =
    "Bitola, área e resistência";
getSection("concept-wire-gauges-awg-swg-bwg", "resistance").paragraphs![0] =
    "A resistência depende do comprimento do condutor L, da área da seção transversal A e "
    + "da resistividade do material ρ. Como a área varia com o quadrado do diâmetro, uma "
    + "diferença modesta no diâmetro pode causar uma diferença substancial na resistência. No "
    + "AWG, aumentar a bitola em três tamanhos reduz aproximadamente a área pela metade e "
    + "dobra a resistência por unidade de comprimento para o mesmo material e temperatura.";
getSection("concept-wire-gauges-awg-swg-bwg", "practical-specification").bullets![0] =
    "Identifique o sistema, como 24 AWG ou 24 British SWG.";

getSection("concept-wire-gauges-awg-swg-bwg", "gauge-systems").bullets![1] =
    "SWG é Standard Wire Gauge, o histórico sistema britânico de espessura de fios e chapas.";
getSection("concept-wire-gauges-awg-swg-bwg", "system-comparison").paragraphs![0] =
    "Esses valores são nominais. Tolerâncias do produto, revestimentos, isolamento e "
    + "construção multifilar podem alterar o diâmetro medido ou total.";
getSection("concept-wire-gauges-awg-swg-bwg", "practical-specification").bullets![3] =
    "Para condutores multifilares, informe a constituição dos filamentos quando a "
    + "flexibilidade e o diâmetro total forem importantes.";
getSection("concept-ohms-law", "relationship").bullets![2] =
    "R é a resistência, medida em ohms (Ω).";
getSection("concept-ohms-law", "worked-examples").examples![0].setup =
    "Uma fonte de 4,2 V está conectada a uma carga de 1,0 Ω.";
getSection("concept-ohms-law", "worked-examples").examples![0].formulas![0] =
    "I = 4,2 V / 1,0 Ω = 4,2 A";
getSection("concept-ohms-law", "worked-examples").examples![1].formulas![0] =
    "R = 12 V / 2 A = 6 Ω";
getSection("concept-ohms-law", "worked-examples").examples![1].conclusion =
    "A resistência do circuito é 6 Ω.";
getSection("concept-ohms-law", "worked-examples").examples![2].setup =
    "Uma corrente de 0,5 A flui através de uma resistência de 10 Ω.";
getSection("concept-ohms-law", "unit-conversions").bullets![0] =
    "1 kΩ = 1.000 Ω";
getSection("concept-ohms-law", "unit-conversions").bullets![1] =
    "1 MΩ = 1.000.000 Ω";
getSection("concept-kirchhoffs-laws", "series-and-parallel").examples![0].setup =
    "Dois resistores de 0,20 Ω em série são conectados a 8,0 V.";
getSection("concept-kirchhoffs-laws", "series-and-parallel").examples![0].formulas![0] =
    "R_total = 0,40 Ω";
getSection("concept-kirchhoffs-laws", "series-and-parallel").examples![1].setup =
    "Dois ramos iguais de 0,40 Ω são conectados a 4,0 V.";
getSection("concept-kirchhoffs-laws", "series-and-parallel").examples![1].formulas![0] =
    "R_total = 0,20 Ω";
getSection("concept-temperature-coefficient-of-resistance", "worked-example").examples![0].formulas![0] =
    "α = 400 × 10^-6 / °C = 0,0004 / °C";
getSection("concept-temperature-coefficient-of-resistance", "worked-example").examples![0].formulas![1] =
    "ΔT = 100 - 20 = 80 °C";
getSection("concept-temperature-coefficient-of-resistance", "worked-example").examples![0].formulas![2] =
    "R_T = 1,00 [1 + 0,0004 × 80] = 1,032 Ω";
getSection("concept-temperature-coefficient-of-resistance", "worked-example").examples![0].conclusion =
    "A resistência estimada é de 1,032 Ω, cerca de 3,2% acima do seu valor a 20 °C.";
getSection("concept-si-system-and-imperial-units", "base-units").bullets![1] =
    "Resistência: ohm (Ω).";
getSection("concept-si-system-and-imperial-units", "decimal-prefixes").paragraphs![0] =
    "Por exemplo, 2,2 kΩ é igual a 2.200 Ω e 15 mA é igual a 0,015 A. Converta os valores "
    + "em unidades compatíveis antes de usar uma fórmula.";

export const presentations = corrected as unknown as CatalogPresentationSet;
