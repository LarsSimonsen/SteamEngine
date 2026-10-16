import type { CalculatorRouteMessages } from "../../calculator-messages";
import { messages as draftMessages } from "./hi";

export const messages: CalculatorRouteMessages = {
    ...draftMessages,
    watt: "W",
    ampere: "A",
    optimalResistance: "प्रतिरोध संबंधी मार्गदर्शन",
    medianResistance: "करंट/वोल्टेज सीमा का प्रतिच्छेद",
    median: "करंट/वोल्टेज सीमा का प्रतिच्छेद",
    sweetSpot: "ऊपरी रेंज का मध्यबिंदु",
    currentLimit: "करंट सीमा",
    currentReachedFirst: "करंट सीमा पहले पहुँचती है।",
    current: "करंट",
    at: "पावर:",
    currentLimitRequires: "करंट सीमा पर आवश्यक वोल्टेज:",
    voltageLimitRequires: "वोल्टेज सीमा पर आवश्यक करंट:",
    adjustedGraph: "कॉन्फ़िगर की गई अधिकतम पावर से अन्य दर्ज सीमाओं के साथ उपयोगी प्रतिरोध रेंज नहीं "
        + "बनती। इस ग्राफ़ में घटाई गई ऊपरी सीमा है:",
    powerCurveLegend: "पावर वक्र की संकेत-सूची",
};
