import { messages as fibatt } from "./calculator-messages/batt/fi";
import { messages as ficoil } from "./calculator-messages/coil/fi";
import { messages as ficonverter } from "./calculator-messages/converter/fi";
import { messages as fijuice } from "./calculator-messages/juice/fi";
import { messages as fimodrange } from "./calculator-messages/modrange/fi";
import { messages as fitcr } from "./calculator-messages/tcr/fi";
import { messages as fiwirewiz } from "./calculator-messages/wirewiz/fi";
import type { Locale } from "./locales";

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

import { messages as englishbatt } from "./calculator-messages/batt/en";
import { messages as englishcoil } from "./calculator-messages/coil/en";
import { messages as englishconverter } from "./calculator-messages/converter/en";
import { messages as englishjuice } from "./calculator-messages/juice/en";
import { messages as englishmodrange } from "./calculator-messages/modrange/en";
import { messages as englishtcr } from "./calculator-messages/tcr/en";
import { messages as englishwirewiz } from "./calculator-messages/wirewiz/en";
import { messages as bokmaalbatt } from "./calculator-messages/batt/nb";
import { coil as bokmaalcoil } from "./calculator-messages/nb-corrections";
import { messages as bokmaalconverter } from "./calculator-messages/converter/nb";
import { juice as bokmaaljuice } from "./calculator-messages/nb-corrections";
import { messages as bokmaalmodrange } from "./calculator-messages/modrange/nb";
import { messages as bokmaaltcr } from "./calculator-messages/tcr/nb";
import { wirewiz as bokmaalwirewiz } from "./calculator-messages/nb-corrections";
import { messages as nynorskbatt } from "./calculator-messages/batt/nn";
import { messages as nynorskcoil } from "./calculator-messages/coil/nn";
import { messages as nynorskconverter } from "./calculator-messages/converter/nn";
import { messages as nynorskjuice } from "./calculator-messages/juice/nn";
import { messages as nynorskmodrange } from "./calculator-messages/modrange/nn";
import { messages as nynorsktcr } from "./calculator-messages/tcr/nn";
import { messages as nynorskwirewiz } from "./calculator-messages/wirewiz/nn";
import { messages as simplifiedChinesebatt } from "./calculator-messages/batt/zh-Hans";
import { coil as simplifiedChinesecoil } from "./calculator-messages/zh-Hans-corrections";
import { messages as simplifiedChineseconverter } from "./calculator-messages/converter/zh-Hans";
import { juice as simplifiedChinesejuice } from "./calculator-messages/zh-Hans-corrections";
import { messages as simplifiedChinesemodrange } from "./calculator-messages/modrange/zh-Hans";
import { tcr as simplifiedChinesetcr, wirewiz as simplifiedChinesewirewiz } from "./calculator-messages/zh-Hans-corrections";
import { messages as arabicbatt } from "./calculator-messages/batt/ar";
import { messages as arabiccoil } from "./calculator-messages/coil/ar";
import { messages as arabicconverter } from "./calculator-messages/converter/ar";
import { messages as arabicjuice } from "./calculator-messages/juice/ar";
import { messages as arabicmodrange } from "./calculator-messages/modrange/ar";
import { messages as arabictcr } from "./calculator-messages/tcr/ar";
import { messages as arabicwirewiz } from "./calculator-messages/wirewiz/ar";
import { messages as spanishbatt } from "./calculator-messages/batt/es";
import { coil as spanishcoil } from "./calculator-messages/es-corrections";
import { messages as spanishconverter } from "./calculator-messages/converter/es";
import { juice as spanishjuice } from "./calculator-messages/es-corrections";
import { messages as spanishmodrange } from "./calculator-messages/modrange/es";
import { tcr as spanishtcr, wirewiz as spanishwirewiz } from "./calculator-messages/es-corrections";
import {
    batt as latinAmericanSpanishbatt,
    coil as latinAmericanSpanishCoil,
    converter as latinAmericanSpanishConverter,
    juice as latinAmericanSpanishJuice,
    modrange as latinAmericanSpanishModrange,
    tcr as latinAmericanSpanishTcr,
    wirewiz as latinAmericanSpanishWirewiz,
} from "./calculator-messages/es-419-corrections";
import { messages as frenchbatt } from "./calculator-messages/batt/fr";
import { coil as frenchcoil } from "./calculator-messages/fr-corrections";
import { messages as frenchconverter } from "./calculator-messages/converter/fr";
import { juice as frenchjuice } from "./calculator-messages/fr-corrections";
import { messages as frenchmodrange } from "./calculator-messages/modrange/fr";
import { tcr as frenchtcr, wirewiz as frenchwirewiz } from "./calculator-messages/fr-corrections";
import { messages as polishbatt } from "./calculator-messages/batt/pl";
import { coil as polishcoil } from "./calculator-messages/pl-corrections";
import { messages as polishconverter } from "./calculator-messages/converter/pl";
import { juice as polishjuice } from "./calculator-messages/pl-corrections";
import { messages as polishmodrange } from "./calculator-messages/modrange/pl";
import { tcr as polishtcr, wirewiz as polishwirewiz } from "./calculator-messages/pl-corrections";
import { batt as ukrainianbatt } from "./calculator-messages/uk-corrections";
import { coil as ukrainiancoil } from "./calculator-messages/uk-corrections";
import { converter as ukrainianconverter } from "./calculator-messages/uk-corrections";
import { juice as ukrainianjuice } from "./calculator-messages/uk-corrections";
import { modrange as ukrainianmodrange } from "./calculator-messages/uk-corrections";
import { tcr as ukrainiantcr, wirewiz as ukrainianwirewiz } from "./calculator-messages/uk-corrections";
import { messages as italianbatt } from "./calculator-messages/batt/it";
import { coil as italiancoil } from "./calculator-messages/it-corrections";
import { messages as italianconverter } from "./calculator-messages/converter/it";
import { juice as italianjuice } from "./calculator-messages/it-corrections";
import { messages as italianmodrange } from "./calculator-messages/modrange/it";
import { tcr as italiantcr, wirewiz as italianwirewiz } from "./calculator-messages/it-corrections";
import { batt as vietnamesebatt } from "./calculator-messages/vi-corrections";
import { coil as vietnamesecoil } from "./calculator-messages/vi-corrections";
import { converter as vietnameseconverter } from "./calculator-messages/vi-corrections";
import { juice as vietnamesejuice } from "./calculator-messages/vi-corrections";
import { modrange as vietnamesemodrange } from "./calculator-messages/vi-corrections";
import { tcr as vietnamesetcr, wirewiz as vietnamesewirewiz } from "./calculator-messages/vi-corrections";
import { batt as germanbatt } from "./calculator-messages/de-corrections";
import { coil as germancoil } from "./calculator-messages/de-corrections";
import { messages as germanconverter } from "./calculator-messages/converter/de";
import { juice as germanjuice } from "./calculator-messages/de-corrections";
import { modrange as germanmodrange } from "./calculator-messages/de-corrections";
import { tcr as germantcr } from "./calculator-messages/de-corrections";
import { wirewiz as germanwirewiz } from "./calculator-messages/de-corrections";
import { messages as swedishbatt } from "./calculator-messages/batt/sv-corrections";
import { coil as swedishcoil } from "./calculator-messages/sv-corrections";
import { messages as swedishconverter } from "./calculator-messages/converter/sv-corrections";
import { juice as swedishjuice } from "./calculator-messages/sv-corrections";
import { messages as swedishmodrange } from "./calculator-messages/modrange/sv-corrections";
import { messages as swedishtcr } from "./calculator-messages/tcr/sv-corrections";
import { wirewiz as swedishwirewiz } from "./calculator-messages/sv-corrections";
import {
    batt as danishbatt,
    coil as danishcoil,
    converter as danishconverter,
    modrange as danishmodrange,
} from "./calculator-messages/da-corrections";
import { juice as danishjuice } from "./calculator-messages/da-corrections";
import { tcr as danishtcr, wirewiz as danishwirewiz } from "./calculator-messages/da-corrections";
import { messages as icelandicbatt } from "./calculator-messages/batt/is";
import { coil as icelandiccoil } from "./calculator-messages/is-corrections";
import { messages as icelandicconverter } from "./calculator-messages/converter/is";
import { juice as icelandicjuice } from "./calculator-messages/is-corrections";
import { messages as icelandicmodrange } from "./calculator-messages/modrange/is";
import { tcr as icelandictcr, wirewiz as icelandicwirewiz } from "./calculator-messages/is-corrections";
import { messages as hindibatt } from "./calculator-messages/batt/hi-corrections";
import { messages as hindicoil } from "./calculator-messages/coil/hi-corrections";
import { messages as hindiconverter } from "./calculator-messages/converter/hi-corrections";
import { messages as hindijuice } from "./calculator-messages/juice/hi-corrections";
import { messages as hindimodrange } from "./calculator-messages/modrange/hi-corrections";
import { messages as hinditcr } from "./calculator-messages/tcr/hi-corrections";
import { messages as hindiwirewiz } from "./calculator-messages/wirewiz/hi-corrections";
import {
    batt as bengalibatt,
    coil as bengalicoil,
    converter as bengaliconverter,
    juice as bengalijuice,
    modrange as bengalimodrange,
    tcr as bengalitcr,
    wirewiz as bengaliwirewiz,
} from "./calculator-messages/bn-corrections";
import { messages as portuguesebatt } from "./calculator-messages/batt/pt-corrections";
import { coil as portuguesecoil } from "./calculator-messages/pt-corrections";
import { messages as portugues_converter } from "./calculator-messages/converter/pt-corrections";
import { juice as portugues_ejuice } from "./calculator-messages/pt-corrections";
import { messages as portuguesemodrange } from "./calculator-messages/modrange/pt-corrections";
import { tcr as portuguesetcr, wirewiz as portuguesewirewiz } from "./calculator-messages/pt-corrections";
import { messages as brazilianbatt } from "./calculator-messages/batt/pt-BR-corrections";
import { coil as braziliancoil } from "./calculator-messages/pt-BR-corrections";
import { messages as brazilianconverter } from "./calculator-messages/converter/pt-BR-corrections";
import { juice as brazilianjuice } from "./calculator-messages/pt-BR-corrections";
import { messages as brazilianmodrange } from "./calculator-messages/modrange/pt-BR-corrections";
import { tcr as braziliantcr, wirewiz as brazilianwirewiz } from "./calculator-messages/pt-BR-corrections";
import { messages as japanesebatt } from "./calculator-messages/batt/ja";
import { coil as japanesecoil } from "./calculator-messages/ja-corrections";
import { messages as japaneseconverter } from "./calculator-messages/converter/ja";
import { juice as japanesejuice } from "./calculator-messages/ja-corrections";
import { messages as japanesemodrange } from "./calculator-messages/modrange/ja";
import { tcr as japanesetcr, wirewiz as japanesewirewiz } from "./calculator-messages/ja-corrections";
import { messages as koreanbatt } from "./calculator-messages/batt/ko";
import { coil as koreancoil } from "./calculator-messages/ko-corrections";
import { messages as koreanconverter } from "./calculator-messages/converter/ko";
import { juice as koreanjuice } from "./calculator-messages/ko-corrections";
import { messages as koreanmodrange } from "./calculator-messages/modrange/ko";
import { tcr as koreantcr, wirewiz as koreanwirewiz } from "./calculator-messages/ko-corrections";
import { messages as greekbatt } from "./calculator-messages/batt/el";
import { messages as greekcoil } from "./calculator-messages/coil/el";
import { messages as greekconverter } from "./calculator-messages/converter/el";
import { messages as greekjuice } from "./calculator-messages/juice/el";
import { messages as greekmodrange } from "./calculator-messages/modrange/el";
import { messages as greektcr } from "./calculator-messages/tcr/el";
import { messages as greekwirewiz } from "./calculator-messages/wirewiz/el";
import { messages as turkishbatt } from "./calculator-messages/batt/tr-corrections";
import { coil as turkishcoil } from "./calculator-messages/tr-corrections";
import { messages as turkishconverter } from "./calculator-messages/converter/tr-corrections";
import { juice as turkishjuice } from "./calculator-messages/tr-corrections";
import { messages as turkishmodrange } from "./calculator-messages/modrange/tr-corrections";
import { tcr as turkishtcr, wirewiz as turkishwirewiz } from "./calculator-messages/tr-corrections";
import { batt as indonesianbatt } from "./calculator-messages/id-corrections";
import { coil as indonesiancoil } from "./calculator-messages/id-corrections";
import { converter as indonesianconverter } from "./calculator-messages/id-corrections";
import { juice as indonesianjuice } from "./calculator-messages/id-corrections";
import { modrange as indonesianmodrange } from "./calculator-messages/id-corrections";
import { messages as indonesiantcr } from "./calculator-messages/tcr/id";
import { wirewiz as indonesianwirewiz } from "./calculator-messages/id-corrections";

const english: CalculatorMessages = {
    batt: englishbatt,
    coil: englishcoil,
    converter: englishconverter,
    juice: englishjuice,
    modrange: englishmodrange,
    tcr: englishtcr,
    wirewiz: englishwirewiz,
};

const bokmaal: CalculatorMessages = {
    batt: bokmaalbatt,
    coil: bokmaalcoil,
    converter: bokmaalconverter,
    juice: bokmaaljuice,
    modrange: bokmaalmodrange,
    tcr: bokmaaltcr,
    wirewiz: bokmaalwirewiz,
};

const nynorsk: CalculatorMessages = {
    batt: nynorskbatt,
    coil: nynorskcoil,
    converter: nynorskconverter,
    juice: nynorskjuice,
    modrange: nynorskmodrange,
    tcr: nynorsktcr,
    wirewiz: nynorskwirewiz,
};

const simplifiedChinese: CalculatorMessages = {
    batt: simplifiedChinesebatt,
    coil: simplifiedChinesecoil,
    converter: simplifiedChineseconverter,
    juice: simplifiedChinesejuice,
    modrange: simplifiedChinesemodrange,
    tcr: simplifiedChinesetcr,
    wirewiz: simplifiedChinesewirewiz,
};

const arabic: CalculatorMessages = {
    batt: arabicbatt,
    coil: arabiccoil,
    converter: arabicconverter,
    juice: arabicjuice,
    modrange: arabicmodrange,
    tcr: arabictcr,
    wirewiz: arabicwirewiz,
};

const spanish: CalculatorMessages = {
    batt: spanishbatt,
    coil: spanishcoil,
    converter: spanishconverter,
    juice: spanishjuice,
    modrange: spanishmodrange,
    tcr: spanishtcr,
    wirewiz: spanishwirewiz,
};

const french: CalculatorMessages = {
    batt: frenchbatt,
    coil: frenchcoil,
    converter: frenchconverter,
    juice: frenchjuice,
    modrange: frenchmodrange,
    tcr: frenchtcr,
    wirewiz: frenchwirewiz,
};
const polish: CalculatorMessages = {
    batt: polishbatt,
    coil: polishcoil,
    converter: polishconverter,
    juice: polishjuice,
    modrange: polishmodrange,
    tcr: polishtcr,
    wirewiz: polishwirewiz,
};
const ukrainian: CalculatorMessages = {
    batt: ukrainianbatt,
    coil: ukrainiancoil,
    converter: ukrainianconverter,
    juice: ukrainianjuice,
    modrange: ukrainianmodrange,
    tcr: ukrainiantcr,
    wirewiz: ukrainianwirewiz,
};
const italian: CalculatorMessages = {
    batt: italianbatt,
    coil: italiancoil,
    converter: italianconverter,
    juice: italianjuice,
    modrange: italianmodrange,
    tcr: italiantcr,
    wirewiz: italianwirewiz,
};
const vietnamese: CalculatorMessages = {
    batt: vietnamesebatt,
    coil: vietnamesecoil,
    converter: vietnameseconverter,
    juice: vietnamesejuice,
    modrange: vietnamesemodrange,
    tcr: vietnamesetcr,
    wirewiz: vietnamesewirewiz,
};
const german: CalculatorMessages = {
    batt: germanbatt,
    coil: germancoil,
    converter: germanconverter,
    juice: germanjuice,
    modrange: germanmodrange,
    tcr: germantcr,
    wirewiz: germanwirewiz,
};
const swedish: CalculatorMessages = {
    batt: swedishbatt,
    coil: swedishcoil,
    converter: swedishconverter,
    juice: swedishjuice,
    modrange: swedishmodrange,
    tcr: swedishtcr,
    wirewiz: swedishwirewiz,
};
const danish: CalculatorMessages = {
    batt: danishbatt,
    coil: danishcoil,
    converter: danishconverter,
    juice: danishjuice,
    modrange: danishmodrange,
    tcr: danishtcr,
    wirewiz: danishwirewiz,
};
const icelandic: CalculatorMessages = {
    batt: icelandicbatt,
    coil: icelandiccoil,
    converter: icelandicconverter,
    juice: icelandicjuice,
    modrange: icelandicmodrange,
    tcr: icelandictcr,
    wirewiz: icelandicwirewiz,
};
const hindi: CalculatorMessages = {
    batt: hindibatt,
    coil: hindicoil,
    converter: hindiconverter,
    juice: hindijuice,
    modrange: hindimodrange,
    tcr: hinditcr,
    wirewiz: hindiwirewiz,
};
const bengali: CalculatorMessages = {
    batt: bengalibatt,
    coil: bengalicoil,
    converter: bengaliconverter,
    juice: bengalijuice,
    modrange: bengalimodrange,
    tcr: bengalitcr,
    wirewiz: bengaliwirewiz,
};
const portuguese: CalculatorMessages = {
    batt: portuguesebatt,
    coil: portuguesecoil,
    converter: portugues_converter,
    juice: portugues_ejuice,
    modrange: portuguesemodrange,
    tcr: portuguesetcr,
    wirewiz: portuguesewirewiz,
};
const portugueseBrazilian: CalculatorMessages = {
    batt: brazilianbatt,
    coil: braziliancoil,
    converter: brazilianconverter,
    juice: brazilianjuice,
    modrange: brazilianmodrange,
    tcr: braziliantcr,
    wirewiz: brazilianwirewiz,
};

const turkish: CalculatorMessages = {
    batt: turkishbatt,
    coil: turkishcoil,
    converter: turkishconverter,
    juice: turkishjuice,
    modrange: turkishmodrange,
    tcr: turkishtcr,
    wirewiz: turkishwirewiz,
};

const indonesian: CalculatorMessages = {
    batt: indonesianbatt,
    coil: indonesiancoil,
    converter: indonesianconverter,
    juice: indonesianjuice,
    modrange: indonesianmodrange,
    tcr: indonesiantcr,
    wirewiz: indonesianwirewiz,
};

export { english, bokmaal, nynorsk };

export const calculatorMessages: Readonly<Record<Locale, CalculatorMessages>> = {
    en: english,
    nb: bokmaal,
    nn: nynorsk,
    "zh-Hans": simplifiedChinese,
    ar: arabic,
    es: spanish,
    "es-419": {
        batt: latinAmericanSpanishbatt,
        coil: latinAmericanSpanishCoil,
        converter: latinAmericanSpanishConverter,
        juice: latinAmericanSpanishJuice,
        modrange: latinAmericanSpanishModrange,
        tcr: latinAmericanSpanishTcr,
        wirewiz: latinAmericanSpanishWirewiz,
    },
    fr: french,
    pl: polish,
    uk: ukrainian,
    it: italian,
    vi: vietnamese,
    de: german,
    sv: swedish,
    da: danish,
    is: icelandic,
    hi: hindi,
    bn: bengali,
    pt: portuguese,
    "pt-BR": portugueseBrazilian,
    ja: {
        batt: japanesebatt,
        coil: japanesecoil,
        converter: japaneseconverter,
        juice: japanesejuice,
        modrange: japanesemodrange,
        tcr: japanesetcr,
        wirewiz: japanesewirewiz,
    },
    ko: {
        batt: koreanbatt,
        coil: koreancoil,
        converter: koreanconverter,
        juice: koreanjuice,
        modrange: koreanmodrange,
        tcr: koreantcr,
        wirewiz: koreanwirewiz,
    },
    el: {
        batt: greekbatt,
        coil: greekcoil,
        converter: greekconverter,
        juice: greekjuice,
        modrange: greekmodrange,
        tcr: greektcr,
        wirewiz: greekwirewiz,
    },
    tr: turkish,
    id: indonesian,
    fi: {
        batt: fibatt, coil: ficoil, converter: ficonverter, juice: fijuice,
        modrange: fimodrange, tcr: fitcr, wirewiz: fiwirewiz,
    },
};

export const calculatorMessagesFor = (locale: Locale): CalculatorMessages => calculatorMessages[locale];

export const calculatorMessageParityIssues = (): readonly string[] => {
    const issues: string[] = [];
    for (const route of Object.keys(english) as Array<keyof CalculatorMessages>) {
        // The temperature suffix historically lives in JSX. Locales may override it
        // while every existing calculator message remains required.
        const optionalKeys = route === "wirewiz" ? ["sourceFactorSuffix"] : [];
        const englishKeys = Object.keys(english[route]).sort();
        for (const locale of Object.keys(calculatorMessages) as Locale[]) {
            const localeKeys = Object.keys(calculatorMessages[locale][route])
                .filter((key) => !optionalKeys.includes(key)).sort();
            if (JSON.stringify(englishKeys) !== JSON.stringify(localeKeys)) {
                issues.push(`${locale}:${route}`);
            }
        }
    }
    return issues;
};
