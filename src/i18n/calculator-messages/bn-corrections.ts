import type { CalculatorRouteMessages } from "../calculator-messages";
import { messages as battDraft } from "./batt/bn";
import { messages as coilDraft } from "./coil/bn";
import { messages as converterDraft } from "./converter/bn";
import { messages as juiceDraft } from "./juice/bn";
import { messages as modrangeDraft } from "./modrange/bn";
import { messages as tcrDraft } from "./tcr/bn";
import { messages as wireWizDraft } from "./wirewiz/bn";

export const batt: CalculatorRouteMessages = {
    ...battDraft,
    calculating: "গণনা করা হচ্ছে…",
    outputPower: "আউটপুট ক্ষমতা",
    batteryIntro: "একটি অন্তর্নির্মিত ব্যাটারি প্রিসেট বেছে নিন অথবা নিচে নিজের মান লিখুন।",
    currentHeadroom: "কারেন্টের নিরাপত্তা মার্জিন",
    estimatedRuntime: "আনুমানিক চলার সময়",
    continuousRuntime: "একটানা চলার সময়",
    safe: "আনুমানিক ব্যাটারি ব্যবহার কার্যকর সীমার মধ্যে আছে।",
    danger: "আনুমানিক ব্যাটারি ব্যবহার কার্যকর সীমা ছাড়িয়ে গেছে।",
    runtimeHelp: "এই আদর্শায়িত হিসাব গণনা করা ব্যাটারি ক্ষমতায় অবিচ্ছিন্ন আউটপুট ধরে নেয়। বাস্তব চলার সময় "
        + "কাট-অফ ভোল্টেজ, ভোল্টেজ পতন, কোষের বয়স, ডিভাইসের নিজস্ব বিদ্যুৎ খরচ এবং বিরতিযুক্ত ব্যবহারের সঙ্গে "
        + "বদলে যায়।",
    powerLabel: "ক্ষমতা",
    powerRegulated: "ক্ষমতা-নিয়ন্ত্রিত মড",
};

export const coil: CalculatorRouteMessages = {
    ...coilDraft,
    description: "তার ও কয়েলের গঠনসংক্রান্ত মান বেছে নিয়ে প্যাঁচের সংখ্যা, রোধ এবং উত্তাপের হিসাব করুন।",
    calculating: "গণনা করা হচ্ছে…",
    singleCoil: "একটি কয়েল।",
    targetResistance: "লক্ষ্য রোধ",
    wrapSpacing: "প্যাঁচের মধ্যবর্তী দূরত্ব",
    wraps: "প্যাঁচের সংখ্যা",
    resistancePerCoil: "প্রতি কয়েলের রোধ",
    heatFlux: "তাপ-প্রবাহের ঘনত্ব",
    targetHeatFlux: "লক্ষ্য তাপ-প্রবাহের ঘনত্ব",
    recommendedPower: "প্রস্তাবিত ক্ষমতা:",
    resistanceActual: "প্রকৃত রোধ",
    loopCircumference: "একটি প্যাঁচের পরিধি",
    loopLength: "একটি প্যাঁচের দৈর্ঘ্য",
    resistanceWireLength: "রোধের তারের দৈর্ঘ্য",
    perCoil: "প্রতি কয়েলে",
    setupSingle: "একটি কয়েল",
    setupParallel2: "দুই কয়েল (সমান্তরাল)",
    setupParallel3: "তিন কয়েল (সমান্তরাল)",
    legLength: "সংযোগ লিডের দৈর্ঘ্য",
    legPowerLoss: "সংযোগ লিডে ক্ষমতার ক্ষয়",
    wireLengthWarning: "সংযোগ লিডের পর কয়েলের জন্য পর্যাপ্ত তার অবশিষ্ট নেই।",
};

export const converter: CalculatorRouteMessages = {
    ...converterDraft,
    calculating: "গণনা করা হচ্ছে…",
    precisionHelp: "নির্ভুলতার সেটিংটি সংখ্যাসূচক ফলাফলে প্রযোজ্য। গেজ সারণির প্রকাশিত মান অপরিবর্তিত থাকে।",
};

export const juice: CalculatorRouteMessages = {
    ...juiceDraft,
    calculating: "গণনা করা হচ্ছে…",
    description: "নিকোটিন বেসের বৈশিষ্ট্য এবং কাঙ্ক্ষিত মিশ্রণের মান লিখুন।",
    canMix: "এই মিশ্রণটি তৈরি করা সম্ভব।",
    saved: "সেটিংস সংরক্ষণ করা হয়েছে।",
    noSaved: "সংরক্ষিত কোনও সেটিংস পাওয়া যায়নি।",
    loaded: "সেটিংস লোড করা হয়েছে।",
};

export const modrange: CalculatorRouteMessages = {
    ...modrangeDraft,
    eyebrow: "রেগুলেটেড মড ক্যালকুলেটর",
    title: "মডের পরিসর",
    description: "রেগুলেটেড মডের আউটপুট সীমা থেকে কার্যকর রোধের পরিসর নির্ণয় করুন।",
    manage: "মড পরিচালনা করুন",
    calculating: "গণনা করা হচ্ছে…",
    presetIntro: "একটি রেগুলেটেড মড প্রিসেট বেছে নিন।",
    preset: "রেগুলেটেড মড প্রিসেট",
    details: "এই মড সম্পর্কে বিস্তারিত",
    customMod: "কাস্টম মড",
    specs: "মডের স্পেসিফিকেশন",
    maxPower: "সর্বোচ্চ ক্ষমতা",
    minResistance: "সর্বনিম্ন রোধ (ঐচ্ছিক)",
    maxResistance: "সর্বোচ্চ রোধ (ঐচ্ছিক)",
    noLowerLimit: "কোনও নিম্ন সীমা নির্ধারিত নেই",
    noUpperLimit: "কোনও ঊর্ধ্ব সীমা নির্ধারিত নেই",
    optimalResistance: "সর্বোত্তম রোধ",
    maximumPowerRange: "সর্বোচ্চ-ক্ষমতার পরিসর",
    optimalRange: "সর্বোত্তম পরিসর",
    medianResistance: "মধ্যক রোধ",
    at: "ক্ষমতা",
    currentLimitRequires: "কারেন্ট সীমার জন্য প্রয়োজন",
    voltageLimitRequires: "ভোল্টেজ সীমার জন্য প্রয়োজন",
    resistanceAtLimit: "সীমায় রোধ",
    voltageReachedFirst: "ভোল্টেজ সীমা আগে পৌঁছায়।",
    currentReachedFirst: "কারেন্ট সীমা আগে পৌঁছায়।",
    adjustedGraph: "নির্ধারিত সর্বোচ্চ ক্ষমতা অন্য নথিভুক্ত সীমাগুলির সঙ্গে ব্যবহারযোগ্য রোধের পরিসর দেয় না। "
        + "এই গ্রাফে কমানো সর্বোচ্চ সীমা ব্যবহার করা হয়েছে",
    powerCurve: "ক্ষমতার রেখা",
    powerCurveDescription: "প্রদর্শিত রোধের পরিসরে অর্জনযোগ্য সর্বোচ্চ ক্ষমতা।",
    powerCurveDescriptionLong: "রোধের বিপরীতে অর্জনযোগ্য সর্বোচ্চ ক্ষমতার গ্রাফ; গণনা করা ব্যবহারযোগ্য পরিসরটি "
        + "বিশেষভাবে চিহ্নিত।",
    powerCurveLegend: "ক্ষমতার রেখার নির্দেশিকা",
    maxAchievablePower: "অর্জনযোগ্য সর্বোচ্চ ক্ষমতা",
    median: "মধ্যক",
    resistance: "রোধ",
    power: "ক্ষমতা",
};

export const tcr: CalculatorRouteMessages = {
    ...tcrDraft,
    title: "রোধের তাপমাত্রা সহগ",
    description: "TCR ও TFR উপকরণ তুলনা করুন, তারের রোধগুলি সমান্তরালে যুক্ত করুন এবং নর্মালাইজ করা DNA 200 "
        + "রোধের বক্ররেখা রপ্তানি করুন।",
    needModel: "কয়েলের পূর্ণাঙ্গ মডেল দরকার?",
    needModelText: "তারের জ্যামিতি, জটিল গঠন ও কয়েলের হিসাবের জন্য। এই বিশেষায়িত টুলটি রোধের বক্ররেখা তুলনা ও "
        + "একত্র করার কাজে উপযোগী।",
    calculating: "গণনা করা হচ্ছে…",
    results: "তাপমাত্রা অনুযায়ী রোধ",
    baseAt20: "সূচনা রোধ 20 °C-এ পরিমাপ করা হয়।",
    baseResistance: "সূচনা রোধ",
    totalParallel: "সমান্তরাল সংযোগের মোট রোধ",
    exportHelp: "বক্ররেখাটি ঠিক 20 °C-এ গণনা করা রোধের সাপেক্ষে নর্মালাইজ করা হয়।",
    aboutOne: "TFR উপকরণে ডেটা বিন্দুগুলির মধ্যে সরলরৈখিক ইন্টারপোলেশনসহ রোধের গুণকের সারণি ব্যবহৃত হয়। TFR "
        + "সারণি না থাকলে উপকরণের ধ্রুব TCR মান ব্যবহার করা হয়।",
    empty: "রোধের বক্ররেখা গণনা করতে এক বা একাধিক উপকরণ যোগ করুন।",
    aboutTwo: "নির্বাচিত একাধিক উপকরণকে সমান্তরাল রোধ হিসেবে গণ্য করা হয়। সংবেদনশীলতা 160–260 °C পরিসরে সম্মিলিত "
        + "রোধের পরিবর্তনকে পুরোনো Ni200 রেফারেন্স বক্ররেখার সঙ্গে তুলনা করে।",
    baseFor: "যার সূচনা রোধ",
    wireWizard: "Wire Wizard",
};

export const wirewiz: CalculatorRouteMessages = {
    ...wireWizDraft,
    eyebrow: "Wire Wizard",
    title: "Wire Wizard",
    importDesign: "Wire Wizard ডিজাইন আমদানি করুন",
    calculating: "গণনা করা হচ্ছে…",
    coilParameters: "কয়েলের পরামিতি",
    wraps: "প্যাঁচের সংখ্যা",
    wrapSpacing: "প্যাঁচের মধ্যবর্তী দূরত্ব",
    wireDesign: "তারের গঠন",
    resistanceFactor: "রোধের গুণক",
    temperatureDataExtrapolationUnavailable: "এক্সট্রাপোলেশন ছাড়া তারের গঠনের তাপমাত্রা-তথ্য এই তাপমাত্রা পর্যন্ত "
        + "প্রযোজ্য নয়।",
    sourceFactor: "আপনার তৈরি তারের রোধের গুণক",
    matchTemperature: "এই ফল মেলাতে মডের নির্ধারিত তাপমাত্রা",
    electrical: "বৈদ্যুতিক বৈশিষ্ট্য",
    resistance: "রোধ",
    perUnitLength: "প্রতি একক দৈর্ঘ্যে",
    thermal: "তাপীয় বৈশিষ্ট্য",
    vapingRange: "ভ্যাপিংয়ের পরিসরে",
    tcExplanation: "TCR ও রোধের গুণফল।",
    tcrExplanation: "20 °C থেকে 300 °C পর্যন্ত রোধের আপেক্ষিক পরিবর্তন।",
    heatFlux: "তাপ-প্রবাহের ঘনত্ব",
    heatCapacity: "তাপধারণ ক্ষমতা",
    powerDissipated: "ক্ষয়িত ক্ষমতা",
    physical: "ভৌত বৈশিষ্ট্য",
    coilParametersTitle: "কয়েলের পরামিতি",
    wireDesignTitle: "তারের গঠন",
    legLength: "সংযোগ লিডের দৈর্ঘ্য",
};
