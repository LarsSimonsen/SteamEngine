import type { SharedMessages } from "../messages";
import { messages as draftMessages } from "./bn";

export const messages: SharedMessages = {
    ...draftMessages,
    error: {
        ...draftMessages.error,
        retrying: "আবার চেষ্টা করা হচ্ছে…",
    },
    catalogEditor: {
        ...draftMessages.catalogEditor,
        integratedMod: "মডে সংযুক্ত",
        resistanceFactor: "রোধের গুণক",
        basedOnPreset: "যে প্রিসেটের ভিত্তিতে তৈরি",
        maxOutputPower: "সর্বোচ্চ আউটপুট ক্ষমতা (W)",
        minAtomizerResistance: "সর্বনিম্ন অ্যাটোমাইজার রোধ (Ω)",
        maxAtomizerResistance: "সর্বোচ্চ অ্যাটোমাইজার রোধ (Ω)",
        batteryHelp: "অন্তত একটি অবিচ্ছিন্ন ডিসচার্জ সীমা লিখুন। সংযুক্ত ব্যাটারি মডের অভ্যন্তরীণ প্যাক, তাই "
            + "স্বতন্ত্র কোষের মাত্রা প্রয়োজন হয় না। অপসারণযোগ্য কোষের মাত্রা নামমাত্র; বিক্রয়কালীন মাপের জন্য "
            + "নোট দেখুন। দুটি ডিসচার্জ সীমাই দেওয়া থাকলে সেগুলির মধ্যে উল্লেখযোগ্য পার্থক্য হলে ক্যালকুলেটর "
            + "নির্ণীত নিরাপদ সীমাটি ব্যবহার করে।",
    },
    home: {
        ...draftMessages.home,
        catalogDescription: "ধারণাগুলি জানুন এবং Steam Engine-এ ব্যবহৃত উপকরণ, ব্যাটারি, মড ও নিয়ন্ত্রণ বোর্ড দেখুন।",
        tools: {
            ...draftMessages.home.tools,
            coil: {
                ...draftMessages.home.tools.coil,
                label: "কয়েল মোড়ানো",
            },
            batt: {
                ...draftMessages.home.tools.batt,
                description: "ব্যাটারিচালিত ডিভাইসের কারেন্ট ও ক্ষমতার ব্যবহার দেখুন।",
            },
            ohm: {
                ...draftMessages.home.tools.ohm,
                label: "ওহমের সূত্র",
                description: "জুল উত্তাপসহ রোধ, ভোল্টেজ, কারেন্ট ও ক্ষমতা গণনা করুন।",
            },
            juice: {
                ...draftMessages.home.tools.juice,
                description: "লক্ষ্য নিকোটিনের ঘনত্ব ও VG/PG অনুপাত অনুযায়ী একটি রেসিপি তৈরি করুন।",
            },
            modrange: {
                label: "মডের পরিসর",
                description: "রেগুলেটেড মডের কার্যকর রোধের পরিসর নির্ণয় করুন।",
            },
            wirewiz: {
                ...draftMessages.home.tools.wirewiz,
                label: "Wire Wizard",
                description: "বিভিন্ন তার একত্র করে কয়েল ও তার তাপমাত্রা–রোধ বক্ররেখার গঠন নির্ধারণ করুন।",
            },
        },
    },
    ohm: {
        ...draftMessages.ohm,
        eyebrow: "ওহমের সূত্রের ক্যালকুলেটর",
        title: "ওহমের সূত্র",
        fields: {
            ...draftMessages.ohm.fields,
            resistance: "রোধ",
            power: "ক্ষমতা",
        },
    },
    encyclopedia: {
        ...draftMessages.encyclopedia,
        lead: "ক্যালকুলেটরগুলির ভিত্তি হিসেবে ব্যবহৃত ধারণা, উপকরণ, ব্যাটারি, মড ও নিয়ন্ত্রণ বোর্ড দেখুন।",
        noMatches: "এই অনুসন্ধানের সঙ্গে মেলে এমন কোনও এন্ট্রি নেই।",
        categoryLabels: {
            ...draftMessages.encyclopedia.categoryLabels,
            mods: "মড ও নিয়ন্ত্রণ বোর্ড",
        },
        categoryDescriptions: {
            ...draftMessages.encyclopedia.categoryDescriptions,
            concepts: "ক্যালকুলেটর ও তাদের ফলাফলের অন্তর্নিহিত নীতিগুলি।",
            batteries: "কোষ, প্যাক ও সংযুক্ত বিদ্যুৎ উৎস।",
            materials: "রোধের তার ও তাপমাত্রা-নিয়ন্ত্রণের উপকরণ।",
            mods: "রেগুলেটেড ডিভাইস ও নিয়ন্ত্রণ-বোর্ডের প্রোফাইল।",
        },
        browseCategory: (label, count) => `${label} দেখুন (${count}টি এন্ট্রি)`,
    },
    encyclopediaDetail: {
        ...draftMessages.encyclopediaDetail,
        categoryLabels: {
            ...draftMessages.encyclopediaDetail.categoryLabels,
            mods: "মড",
        },
        rewrapExplanation: "লেবেলটিকে রিওর্যাপ ব্র্যান্ড হিসেবে ধরা হয়; মোড়ক দেখে ভেতরের কোষের প্রস্তুতকারক "
            + "অনুমান করা হয় না।",
        nonRemovableBatteryProfile: "এই মডে অপসারণ-অযোগ্য ব্যাটারির প্রোফাইল রয়েছে:",
        basedOnBoardProfile: "এই ডিভাইসের প্রোফাইলটি নিয়ন্ত্রণ-বোর্ডের প্রোফাইলের উপর ভিত্তি করে:",
        builtIntoModProfile: "এই ব্যাটারির প্রোফাইলটি মডের প্রোফাইলে অন্তর্ভুক্ত:",
        integratedInMod: "মডে সংযুক্ত",
        noUsableResistanceRange: "ক্যাটালগের সীমা থেকে ব্যবহারযোগ্য রোধের পরিসর গণনা করা যায় না।",
        loadingPowerCurve: "ক্ষমতার বক্ররেখা লোড হচ্ছে",
        temperatureResistanceCurve: "তাপমাত্রা–রোধ বক্ররেখা",
        relativeResistance: "আপেক্ষিক রোধ",
        loadingTemperatureCurve: "তাপমাত্রার বক্ররেখা লোড হচ্ছে…",
        loadingResearchRecord: "গবেষণা নথি লোড হচ্ছে…",
        inVaping: "ভ্যাপিংয়ে",
        continuousDischargeCurrent: (value) =>
            `ক্যাটালগে ${value} A অবিচ্ছিন্ন ডিসচার্জের মান দেওয়া আছে।`,
        continuousDischargeC: (value) =>
            `ক্যাটালগে ${value} C অবিচ্ছিন্ন ডিসচার্জের মান দেওয়া আছে।`,
        noContinuousDischarge: "ক্যাটালগে অবিচ্ছিন্ন ডিসচার্জের মান নির্ধারিত নেই।",
        materialCatalog: "কয়েলের উপকরণের ক্যাটালগ",
        noSources: "এই এন্ট্রির জন্য কোনও উৎস পাওয়া যায়নি।",
        unknownAuthenticitySummary: "নথিটিতে আরও বিস্তারিত সত্যতা-সংক্রান্ত সারাংশ নেই।",
        noAuthenticityAssessment: "এই এন্ট্রির জন্য নির্দিষ্ট কোনও সত্যতা মূল্যায়ন নথিভুক্ত নেই।",
        noMaterialSources: "এই উপকরণের জন্য কোনও উৎস পাওয়া যায়নি।",
        modBoardCatalog: "মড ও নিয়ন্ত্রণ-বোর্ডের ক্যাটালগ",
        propertyLabels: {
            ...draftMessages.encyclopediaDetail.propertyLabels,
            boardController: "নিয়ন্ত্রণ বোর্ড",
            maximumPower: "সর্বোচ্চ ক্ষমতা",
            continuousDischarge: "অবিচ্ছিন্ন ডিসচার্জের মান",
            resistivity: "20 °C-এ বৈদ্যুতিক রোধকতা",
            resistanceRange: "রোধের পরিসর",
            fullResistanceCurve: "রোধের সম্পূর্ণ বক্ররেখা",
        },
    },
};
