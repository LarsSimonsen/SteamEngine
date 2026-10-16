import type { SharedMessages } from "../messages";
import { messages as draftMessages } from "./hi";

const catalogNouns: Readonly<Record<string, string>> = {
    material: "सामग्री", materials: "सामग्री",
    battery: "बैटरी", batteries: "बैटरियाँ",
    mod: "मॉड", mods: "मॉड",
};

const localizeCatalogNoun = (noun: string): string => catalogNouns[noun.toLowerCase()] ?? noun;

export const messages: SharedMessages = {
    ...draftMessages,
    catalogManager: {
        ...draftMessages.catalogManager,
        manage: (plural) => `${localizeCatalogNoun(plural)} प्रबंधित करें`,
        shared: (noun) => `साझा ${localizeCatalogNoun(noun)} कैटलॉग`,
        close: (noun) => `${localizeCatalogNoun(noun)} प्रबंधक बंद करें`,
        choose: (plural) => "दृश्यमान अंतर्निर्मित विकल्प चुनें या इस ब्राउज़र में संग्रहीत "
            + `${localizeCatalogNoun(plural)} बनाएँ।`,
        builtIn: (plural) => `अंतर्निर्मित ${localizeCatalogNoun(plural)}`,
        visibility: (arg0) => "दृश्यता में किए गए बदलाव तुरंत सहेजे जाते हैं। छिपी प्रविष्टियों ("
            + localizeCatalogNoun(arg0)
            + ") की प्रतिलिपि बनाई जा सकती है।",
        custom: (plural) => `कस्टम ${localizeCatalogNoun(plural)}`,
        newCustom: (arg0) => "कस्टम प्रविष्टि बनाएँ: "
            + localizeCatalogNoun(arg0),
        noneYet: (arg0) => "अभी तक कोई कस्टम प्रविष्टि नहीं है ("
            + localizeCatalogNoun(arg0)
            + ")।",
        resetSaved: (noun) => `सहेजा गया ${localizeCatalogNoun(noun)} डेटा रीसेट करें`,
        savedReset: (noun) => `सहेजा गया ${localizeCatalogNoun(noun)} डेटा रीसेट कर दिया गया।`,
        cancel: "रद्द करें",
        edit: "संपादित करें",
        delete: "हटाएँ",
        resetSavedMessage: "इससे केवल सहेजा गया डेटा हटेगा। जारी रखें?",
        customItemsDescription: (arg0) => "कस्टम "
            + localizeCatalogNoun(arg0)
            + " कैलकुलेटर के चयन विकल्पों में हमेशा दिखाई देते हैं।",
    },
    catalogEditor: {
        ...draftMessages.catalogEditor,
        editCustom: (noun) => `कस्टम ${localizeCatalogNoun(noun)} संपादित करें`,
        newCustom: (arg0) => "कस्टम प्रविष्टि बनाएँ: "
            + localizeCatalogNoun(arg0),
        save: (noun) => `${localizeCatalogNoun(noun)} सहेजें`,
        cancel: "रद्द करें",
        clone: (arg0) => arg0
            + " की प्रतिलिपि बनाएँ",
        properties: (arg0) => localizeCatalogNoun(arg0)
            + " के गुण",
        model: "मॉडल",
        batteryAccess: "बैटरी बदलने का विकल्प",
        formFactor: "आकार-प्रकार",
        prismatic: "प्रिज़्माकार",
        markings: "चिह्न",
        safetyWarning: "सुरक्षा चेतावनी",
        batteryHelp: "कम से कम एक सतत डिस्चार्ज सीमा दर्ज करें। एकीकृत बैटरियाँ मॉड के आंतरिक पैक "
            + "हैं, इसलिए अलग सेल के आयामों की आवश्यकता नहीं है। हटाने योग्य सेल के आयाम "
            + "नाममात्र हैं; बिक्री के समय मापे गए वास्तविक आयाम नोट्स में लिखें। यदि दोनों "
            + "डिस्चार्ज सीमाएँ दी गई हों और उनमें पर्याप्त अंतर हो, तो कैलकुलेटर उनसे निकली "
            + "अधिक सुरक्षित सीमा का उपयोग करता है।",
        normalizationHelp: "सहेजने पर वक्र क्रमबद्ध होता है, 20 °C का संदर्भ जोड़ा या निकाला जाता है और "
            + "सभी कारक सामान्यीकृत होते हैं।",
        normalizationInterpolated: " 20 °C बिंदु का अंतर्वेशन किया गया और वक्र को सामान्यीकृत किया गया।",
        nominalDiameter: "नाममात्र व्यास (mm)",
        nominalLength: "नाममात्र लंबाई (mm)",
        length: "लंबाई (mm)",
        width: "चौड़ाई (mm)",
        thickness: "मोटाई (mm)",
        ratedCapacity: "रेटेड क्षमता (mAh)",
        continuousCurrent: "सतत् निर्वहन धारा (A)",
        continuousC: "सतत् निर्वहन C रेटिंग",
        nominalVoltage: "नाममात्र वोल्टेज (V)",
        density: "घनत्व (g/cm³)",
        tcrPerDegree: "TCR (प्रति °C)",
        temperature: "तापमान (°C)",
        normalizationExtrapolated: " 20 °C बिंदु को एक्सट्रपलेशन किया गया और वक्र को सामान्यीकृत किया गया।",
        normalizationExisting: " TFR वक्र को 20 °C पर सामान्यीकृत किया गया।",
        maxOutputVoltage: "अधिकतम आउटपुट वोल्टेज (V)",
        maxOutputPower: "अधिकतम आउटपुट पावर (W)",
        maxOutputCurrent: "अधिकतम आउटपुट करंट (A)",
        heatCapacity: "विशिष्ट ऊष्मा धारिता (J/g·K)",
        sizeCodePlaceholder: "वैकल्पिक, जैसे 18650",
        wrapperColorPlaceholder: "वैकल्पिक, वर्णनात्मक",
        markingsPlaceholder: "वैकल्पिक; प्रत्येक पंक्ति में रैपर का एक चिह्न",
        currentWithCRatingPlaceholder: "C रेटिंग दी हो तो वैकल्पिक",
        cRatingWithCurrentPlaceholder: "करंट दिया हो तो वैकल्पिक",
        saved: (arg0) => "सहेजा गया: "
            + localizeCatalogNoun(arg0)
            + "।",
    },
    ohm: {
        ...draftMessages.ohm,
        adjusting: (field) => `${field} समायोजित करते समय`,
        lockSummary: (adjusted, locked) => `${adjusted} बदलने पर ${locked} स्थिर रहता है।`,
        descriptionBeforeOhm: "यह",
        descriptionAfterLaws: "पर आधारित एक सरल कैलकुलेटर है।",
        joulesLawLinkLabel: "जूल के नियम",
    },
    encyclopediaDetail: {
        ...draftMessages.encyclopediaDetail,
        breadcrumb: "ब्रेडक्रंब नेविगेशन",
        recordStatus: "रिकॉर्ड स्थिति",
        catalogImplication: "कैटलॉग पर प्रभाव",
        batteryAccess: "बैटरी बदलने का विकल्प",
        propertyLabels: {
            ...draftMessages.encyclopediaDetail.propertyLabels,
            formFactor: "आकार-प्रकार",
            resistivity: "20 °C पर विद्युत प्रतिरोधकता",
            dimensions: "आयाम",
            specificHeatCapacity: "विशिष्ट ऊष्मा धारिता",
        },
        markings: "चिह्न",
        categoryLabels: {
            ...draftMessages.encyclopediaDetail.categoryLabels,
            concepts: "अवधारणाएँ",
            batteries: "बैटरियाँ",
        },
        availableBy: (arg0) => arg0
            + " तक उपलब्ध",
        sources: "स्रोत",
        property: "गुण",
        additionalPropertyNotes: "गुणों पर अतिरिक्त टिप्पणियाँ",
        unknownPropertyValue: "कैटलॉग में इस गुण का मान स्थापित नहीं है।",
        value: "मान",
        limitation: "सीमा",
        confidence: "विश्वसनीयता",
        continuousDischargeCurrent: (arg0) => "कैटलॉग में "
            + arg0
            + " A की सतत-डिस्चार्ज रेटिंग दी गई है।",
        unknownBatteryIntroductionNotice:
            "इस सेल के बाज़ार में आने की तारीख अज्ञात है, इसलिए इसकी उम्र और यह कि इसकी जगह "
            + "नए मॉडल आ चुके हैं या नहीं, निर्धारित नहीं किया जा सकता।",
        protectedCell: "संरक्षित सेल।",
        unprotectedCell: "असंरक्षित सेल।",
        materialCatalog: "कॉइल सामग्री सूची",
        basedOnArticle: "Steam Engine ज्ञान-आधारित लेख पर आधारित",
    },
    error: {
        ...draftMessages.error,
        cancel: "रद्द करें",
    },
    home: {
        ...draftMessages.home,
        blogEyebrow: "नई जानकारी पाते रहें",
        tools: {
            ...draftMessages.home.tools,
            converter: {
                ...draftMessages.home.tools.converter,
                label: "रूपांतरण",
            },
            old: {
                ...draftMessages.home.tools.old,
                label: "पुरानी साइट",
            },
            wirewiz: {
                ...draftMessages.home.tools.wirewiz,
                description: "एक कॉइल और उसके तापमान वक्र को आकार देने के लिए विभिन्न तारों को मिलाएं।",
            },
        },
        intro: "Steam Engine कॉइल बनाने, बैटरी ड्रेन की जांच करने, ई-लिक्विड मिश्रण करने और "
            + "आपके सेटअप के पीछे की संख्याओं को समझने के लिए व्यावहारिक कैलकुलेटर का एक सूट है।",
        blogTitle: "Steam Engine ब्लॉग",
        blogDescription: "Steam Engine ब्लॉग पर अपडेट और कैलकुलेटर युक्तियाँ प्राप्त करें।",
        catalogDescription: "अवधारणाओं को जानें और Steam Engine द्वारा उपयोग की जाने वाली सामग्रियों, "
            + "बैटरी, मॉड और बोर्ड को देखें।",
    },
    encyclopedia: {
        ...draftMessages.encyclopedia,
        categoryLabels: {
            ...draftMessages.encyclopedia.categoryLabels,
            concepts: "अवधारणाएँ",
            batteries: "बैटरियाँ",
        },
        kicker: "Steam Engine संदर्भ",
    },
};
