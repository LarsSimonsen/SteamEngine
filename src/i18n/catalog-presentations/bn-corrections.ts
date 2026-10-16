import type { CatalogPresentationSet } from "../catalog-presentations";
import {
    batteryTexts as draftBatteryTexts,
    materialTexts,
    modTexts as draftModTexts,
    presentations as draftPresentations,
} from "./bn";

type MutableExample = {
    title?: string;
    setup?: string;
    conclusion?: string;
    formulas?: string[];
};

type MutableSection = {
    id: string;
    title?: string;
    paragraphs?: string[];
    bullets?: string[];
    formulas?: Array<{ expression: string }>;
    examples?: MutableExample[];
    table?: { headers: string[]; rows: string[][] };
};

type MutableConcept = {
    displayName?: string;
    description?: string;
    summary?: string;
    sections: MutableSection[];
};

type MutablePresentationSet = {
    concepts: Record<string, MutableConcept>;
    batteries: Record<string, { notes?: string[] }>;
    mods: Record<string, { description?: string; summary?: string }>;
};

const corrected = JSON.parse(JSON.stringify(draftPresentations)) as MutablePresentationSet;

const getSection = (conceptId: string, sectionId: string): MutableSection => {
    const section = corrected.concepts[conceptId].sections.find((candidate) => candidate.id === sectionId);
    if (!section) {
        throw new Error("Bengali catalog section not found: " + conceptId + "/" + sectionId);
    }

    return section;
};

const ohmsLawRelationship = getSection("concept-ohms-law", "relationship");
corrected.concepts["concept-ohms-law"].description =
    "ওহমের সূত্র বৈদ্যুতিক সার্কিটের ভোল্টেজ, কারেন্ট ও রোধের মধ্যে সম্পর্ক স্থাপন করে।";
ohmsLawRelationship.paragraphs![0] =
    "কোনও উপাদানের রোধ প্রায় অপরিবর্তিত থাকলে এই মৌলিক সম্পর্কটি ব্যবহার করা যায়।";
ohmsLawRelationship.bullets![1] = "I হল কারেন্ট, অ্যাম্পিয়ারে (A) মাপা হয়।";
ohmsLawRelationship.bullets![2] = "R হল রোধ, ওহমে (Ω) মাপা হয়।";

const ohmsLawExamples = getSection("concept-ohms-law", "worked-examples");
ohmsLawExamples.title = "সমাধানসহ উদাহরণ";
ohmsLawExamples.examples![0].title = "কারেন্ট নির্ণয়";
ohmsLawExamples.examples![0].formulas![0] = "I = 4.2 V / 1.0 Ω = 4.2 A";
ohmsLawExamples.examples![0].conclusion = "লোডের কারেন্ট হল 4.2 A।";
ohmsLawExamples.examples![1].title = "রোধ নির্ণয়";
ohmsLawExamples.examples![1].setup =
    "একটি সার্কিটে 12 V ভোল্টেজ আছে এবং 2 A কারেন্ট প্রবাহিত হয়।";
ohmsLawExamples.examples![1].formulas![0] = "R = 12 V / 2 A = 6 Ω";
ohmsLawExamples.examples![1].conclusion = "সার্কিটের রোধ হল 6 Ω।";
ohmsLawExamples.examples![2].title = "ভোল্টেজ নির্ণয়";
ohmsLawExamples.examples![2].formulas![0] = "V = 0.5 A × 10 Ω = 5 V";

const ohmsLawPower = getSection("concept-ohms-law", "electrical-power");
ohmsLawPower.paragraphs![0] =
    "ওহমের সূত্রটি P = V × I ক্ষমতার সম্পর্কের সঙ্গে একত্রে ব্যবহার করা যায়। P ক্ষমতা ওয়াটে (W) মাপা হয়। "
    + "4.2 V উৎস এবং 1.0 Ω লোডের জন্য আদর্শ ক্ষমতা 17.64 W। উৎপন্ন তাপ নিরাপদে অপসারণের জন্য "
    + "উপাদানটির পর্যাপ্ত তাপধারণ ক্ষমতা এবং অতিরিক্ত সীমা থাকা দরকার।";

const jouleHeating = corrected.concepts["concept-joule-heating"];
jouleHeating.description =
    "জুল উত্তাপ বর্ণনা করে, যেখানে রোধের মধ্য দিয়ে কারেন্ট প্রবাহিত হলে বৈদ্যুতিক শক্তি তাপে রূপান্তরিত হয়।";
jouleHeating.summary = "কারেন্ট কীভাবে রোধে তাপ তৈরি করে।";
jouleHeating.sections[0].title = "উত্তাপের ক্ষমতা";
jouleHeating.sections[0].paragraphs![0] = "বৈদ্যুতিক উত্তাপের ক্ষমতা হল:";
jouleHeating.sections[0].bullets![0] = "P হল ওয়াটে (W) মাপা ক্ষমতা।";
jouleHeating.sections[0].bullets![2] = "I হল অ্যাম্পিয়ারে (A) মাপা কারেন্ট।";
jouleHeating.sections[1].title = "সমাধানসহ উদাহরণ";
jouleHeating.sections[3].title = "ব্যবহারিক পরীক্ষা";
jouleHeating.sections[3].paragraphs![0] =
    "উপাদান, সংযোগ এবং নিরোধক প্রত্যাশিত কারেন্ট ও ক্ষমতা সহ্য করতে পারে কি না নিশ্চিত করুন। উপযুক্ত "
    + "অতিরিক্ত সীমা রাখুন, কারণ বাস্তব উপাদান অসমভাবে গরম হতে পারে এবং তাপমাত্রার সঙ্গে রোধ বদলাতে পারে। "
    + "ব্যাটারি ও বিদ্যুৎ সরবরাহেরও অবিচ্ছিন্ন কারেন্টের সীমা থাকে।";

const kirchhoffsCurrentLaw = getSection("concept-kirchhoffs-laws", "current-law");
kirchhoffsCurrentLaw.title = "কির্শহফের কারেন্টের সূত্র";
kirchhoffsCurrentLaw.paragraphs![0] =
    "একটি নোডে 8 A প্রবেশ করলে এবং একটি শাখা দিয়ে 3 A বের হলে, বাকি শাখাগুলোকে মোট 5 A বহন করতে হবে। "
    + "হিসাবের আগে কারেন্টের দিক নির্ধারণ করুন; ফল ঋণাত্মক হলে প্রকৃত কারেন্ট অনুমিত দিকের বিপরীতে প্রবাহিত হয়।";

const kirchhoffsVoltageLaw = getSection("concept-kirchhoffs-laws", "voltage-law");
kirchhoffsVoltageLaw.formulas![2].expression =
    "V_total = V_1 = V_2 = ... (সমান্তরাল শাখা)";

ohmsLawPower.title = "বৈদ্যুতিক ক্ষমতা";

const kirchhoffsLaws = corrected.concepts["concept-kirchhoffs-laws"];
kirchhoffsLaws.displayName = "কির্শহফের সূত্রসমূহ";
kirchhoffsLaws.description =
    "কির্শহফের কারেন্ট ও ভোল্টেজের সূত্র সার্কিটের নোডে কারেন্ট এবং বন্ধ লুপে ভোল্টেজ সংরক্ষণ বর্ণনা করে।";
getSection("concept-kirchhoffs-laws", "circuit-terms").title = "সার্কিটের পরিভাষা";
getSection("concept-kirchhoffs-laws", "series-and-parallel").formulas![1].expression =
    "R_total = R_1 + R_2 + ...";
getSection("concept-kirchhoffs-laws", "series-and-parallel").examples![0].formulas![0] = "R_total = 0.40 Ω";
getSection("concept-kirchhoffs-laws", "voltage-law").paragraphs![0] =
    "বন্ধ লুপের চারপাশে ভোল্টেজ বৃদ্ধি ও পতনের বীজগাণিতিক যোগফল শূন্য। একটি লুপের দিক বেছে নিয়ে পোলারিটি "
    + "একইভাবে রাখুন। দিক উল্টালে চিহ্ন বদলাবে, ভৌত সমাধান নয়। বৃহত্তর সিরিজ রোধে ভোল্টেজ পতনও বেশি হয়, কারণ "
    + "একই কারেন্ট প্রতিটি সিরিজ উপাদানের মধ্য দিয়ে প্রবাহিত হয়।";

getSection("concept-temperature-coefficient-of-resistance", "positive-and-negative").bullets![3] =
    "সহগের চিহ্ন গুরুত্বপূর্ণ; ঋণাত্মক মানের পরিবর্তে তার পরম মান ব্যবহার করলে পূর্বাভাসের দিক উল্টে যায়।";
getSection("concept-temperature-coefficient-of-resistance", "power-and-limits").paragraphs![0] =
    "ধ্রুবক ভোল্টেজে চালিত ধনাত্মক TCR-যুক্ত রোধে তাপমাত্রা বাড়লে রোধ বাড়ে এবং কারেন্ট কমার প্রবণতা থাকে। "
    + "ধ্রুবক কারেন্টের উৎসে একই রোধ বাড়লে ক্ষমতা বাড়ে।";

getSection("concept-trigonometry", "right-triangles").paragraphs![0] =
    "একটি কোণ θ-এর সাপেক্ষে বিপরীত বাহু কোণের অন্য পাশে থাকে, সন্নিহিত বাহু কর্ণ না হয়ে কোণটিকে স্পর্শ করে, "
    + "এবং কর্ণ সমকোণের বিপরীতে থাকে। SOH-CAH-TOA মনে রাখার নিয়ম: sine = বিপরীত/কর্ণ, "
    + "cosine = সন্নিহিত/কর্ণ, এবং tangent = বিপরীত/সন্নিহিত।";
getSection("concept-trigonometry", "right-triangles").formulas![1].expression =
    "cos(θ) = adjacent / hypotenuse";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas![0].expression =
    "θ = sin^-1(opposite / hypotenuse)";

corrected.concepts["concept-heat-capacity"].displayName = "তাপধারণ ক্ষমতা";
getSection("concept-heat-capacity", "object-and-material").paragraphs![0] =
    "তাপধারণ ক্ষমতা পুরো বস্তুর বৈশিষ্ট্য এবং কতটা পদার্থ উপস্থিত তার উপর নির্ভর করে। নির্দিষ্ট তাপধারণ ক্ষমতা "
    + "পদার্থের একটি বৈশিষ্ট্য। একই পদার্থের ভর দ্বিগুণ করলে তাপধারণ ক্ষমতাও দ্বিগুণ হয়।";
getSection("concept-heat-capacity", "phase-changes-and-limits").paragraphs![1] =
    "সরল সমীকরণটি ধরে নেয় যে নির্দিষ্ট তাপধারণ ক্ষমতা প্রায় ধ্রুবক। তাপক্ষয়, পরিচলন, বিকিরণ, বাষ্পীভবন, "
    + "সংযোগ-রোধ এবং অসম তাপমাত্রার কারণে বাস্তব ফল আদর্শ ফল থেকে ভিন্ন হতে পারে।";
getSection("concept-heat-capacity", "basic-relationships").bullets![3] =
    "1 K তাপমাত্রার পার্থক্য 1 °C-এর পার্থক্যের সমান।";

getSection("concept-heat-flux", "definition").formulas![0].expression = "q'' = Q_dot / A";
getSection("concept-heat-flux", "worked-example").title = "সমাধানসহ উদাহরণ";
getSection("concept-heat-flux", "practical-checks").title = "ব্যবহারিক পরীক্ষা";
getSection("concept-heat-flux", "practical-checks").bullets![1] =
    "গড় তাপ প্রবাহ এবং স্থানীয় সর্বোচ্চ প্রবাহের মধ্যে পার্থক্য করুন; উত্তাপ অসম হতে পারে।";
getSection("concept-heat-flux", "practical-checks").bullets![3] =
    "তাপ প্রবাহ স্থানান্তরের হার, তাপমাত্রা নয়; তাপমাত্রা পরিবর্তনের জন্য তাপধারণ ক্ষমতা ব্যবহার করুন।";

const baseUnits = getSection("concept-si-system-and-imperial-units", "base-units").table!;
baseUnits.rows[5] = ["পদার্থের পরিমাণ", "মোল", "mol"];
baseUnits.rows[6] = ["আলোক তীব্রতা", "ক্যান্ডেলা", "cd"];
getSection("concept-si-system-and-imperial-units", "base-units").bullets![2] = "ক্ষমতা: ওয়াট (W)।";

getSection("concept-wire-gauges-awg-swg-bwg", "awg-formula").paragraphs![0] =
    "1/0, 2/0, 3/0 এবং 4/0-এর জন্য n = 0, -1, -2 এবং -3 ব্যবহার করুন। AWG পরিবাহকের আকার নির্ধারণ করে, "
    + "সর্বজনীন নিরাপদ কারেন্ট নয়; কারেন্ট বহন ক্ষমতা উপাদান, নিরোধক, শীতলকরণ, স্থাপন এবং প্রযোজ্য বৈদ্যুতিক "
    + "নিয়মের উপরও নির্ভর করে।";
getSection("concept-wire-gauges-awg-swg-bwg", "resistance").paragraphs![0] =
    "রোধ পরিবাহকের দৈর্ঘ্য L, প্রস্থচ্ছেদ ক্ষেত্রফল A এবং উপাদানের রোধাঙ্ক ρ-এর উপর নির্ভর করে। ব্যাসের বর্গের সঙ্গে "
    + "ক্ষেত্রফল বদলায়, তাই ব্যাসের সামান্য পার্থক্যেও রোধে বড় পার্থক্য হতে পারে। একই উপাদান ও তাপমাত্রায় AWG-তে "
    + "প্রায় তিন গেজ বাড়লে ক্ষেত্রফল অর্ধেক এবং একক দৈর্ঘ্যে রোধ দ্বিগুণ হয়।";

getSection("concept-ohms-law", "rearranged-formulas").formulas![0].expression = "I = V / R";
getSection("concept-ohms-law", "rearranged-formulas").formulas![1].expression = "R = V / I";
getSection("concept-ohms-law", "worked-examples").examples![2].conclusion = "ভোল্টেজ হল 5 V।";

getSection("concept-joule-heating", "what-affects-heating").title = "উত্তাপকে কী প্রভাবিত করে";
getSection("concept-joule-heating", "what-affects-heating").bullets![0] =
    "ধ্রুবক রোধে কারেন্ট দ্বিগুণ করলে উত্তাপের ক্ষমতা চার গুণ হয়।";
getSection("concept-joule-heating", "what-affects-heating").bullets![1] =
    "ধ্রুবক কারেন্টে রোধ দ্বিগুণ করলে উত্তাপের ক্ষমতাও দ্বিগুণ হয়।";
getSection("concept-joule-heating", "what-affects-heating").bullets![2] =
    "ধ্রুবক ভোল্টেজে রোধ কমলে উত্তাপের ক্ষমতা বাড়ে।";
getSection("concept-joule-heating", "practical-checks").paragraphs![0] =
    "উপাদান, সংযোগ এবং নিরোধক প্রত্যাশিত কারেন্ট ও ক্ষমতা সহ্য করতে পারে কি না নিশ্চিত করুন। উপযুক্ত নিরাপত্তা "
    + "মার্জিন রাখুন, কারণ বাস্তব উপাদান অসমভাবে গরম হতে পারে এবং তাপমাত্রার সঙ্গে রোধ বদলাতে পারে। ব্যাটারি ও "
    + "বিদ্যুৎ সরবরাহেরও অবিচ্ছিন্ন কারেন্টের সীমা থাকে।";
getSection("concept-joule-heating", "worked-example").examples![0].conclusion =
    "কুণ্ডলীটি প্রতি সেকেন্ডে 7.2 J হারে, অর্থাৎ 10 সেকেন্ডে 72 J শক্তি তাপে রূপান্তরিত করে।";

getSection("concept-trigonometry", "right-triangles").formulas![0].expression =
    "sin(θ) = বিপরীত বাহু / কর্ণ";
getSection("concept-trigonometry", "right-triangles").formulas![1].expression =
    "cos(θ) = সন্নিহিত বাহু / কর্ণ";
getSection("concept-trigonometry", "right-triangles").formulas![2].expression =
    "tan(θ) = বিপরীত বাহু / সন্নিহিত বাহু";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas![0].expression =
    "θ = sin^-1(বিপরীত বাহু / কর্ণ)";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas![1].expression =
    "θ = cos^-1(সন্নিহিত বাহু / কর্ণ)";
getSection("concept-trigonometry", "finding-sides-and-angles").formulas![2].expression =
    "θ = tan^-1(বিপরীত বাহু / সন্নিহিত বাহু)";

corrected.concepts["concept-heat-capacity"].description =
    "তাপধারণ ক্ষমতা একটি বস্তুর তাপমাত্রা পরিবর্তন করতে প্রয়োজনীয় শক্তির পরিমাণ বর্ণনা করে।";
getSection("concept-heat-capacity", "basic-relationships").bullets![1] =
    "Q হল জুলে (J) পরিমাপ করা স্থানান্তরিত তাপশক্তি।";
getSection("concept-heat-capacity", "basic-relationships").bullets![2] =
    "m হল কিলোগ্রামে ভর এবং c হল J/(kg·K) এককে বিশিষ্ট তাপধারণ ক্ষমতা।";
getSection("concept-heat-capacity", "electrical-heating").examples![0].setup =
    "কোনও ক্ষতি ছাড়া একটি ধ্রুবক 100 W উৎস দিয়ে 41.8 kJ-এর উদাহরণটি গরম করুন।";
getSection("concept-heat-capacity", "electrical-heating").examples![0].conclusion =
    "আদর্শ সময় প্রায় 7.0 মিনিট; 80% স্থানান্তর দক্ষতায় সময়টি প্রায় 523 s।";

getSection("concept-heat-flux", "definition").bullets![2] =
    "A হল যে ক্ষেত্রফলের মধ্য দিয়ে তাপ স্থানান্তরিত হয়, m² এককে।";
getSection("concept-heat-flux", "worked-example").examples![0].title =
    "হিটারের গড় তাপ প্রবাহ ঘনত্ব";
getSection("concept-heat-flux", "conduction").title = "সমতল স্তরের মধ্য দিয়ে পরিবাহন";
getSection("concept-heat-flux", "convection-and-radiation").paragraphs![0] =
    "পরিচলন একটি পৃষ্ঠ-সহগ ব্যবহার করে। বিকিরণে নিঃসরণ ক্ষমতা ε এবং স্টেফান-বোল্টজম্যান ধ্রুবক σ ব্যবহৃত হয়; "
    + "বিকিরণ সমীকরণের তাপমাত্রা অবশ্যই কেলভিনে পরম তাপমাত্রা হতে হবে।";
getSection("concept-si-system-and-imperial-units", "unit-checks").bullets![3] =
    "শুধু শেষে পূর্ণসংখ্যায় গোল করুন, যাতে মধ্যবর্তী ফলাফলে যথেষ্ট নির্ভুলতা বজায় থাকে।";

getSection("concept-ohms-law", "unit-conversions").bullets![3] =
    "1 W = 1,000 mW";

corrected.concepts["concept-temperature-coefficient-of-resistance"].description =
    "তাপমাত্রার সহগ একটি উপাদান গরম বা ঠান্ডা হলে তার রোধ কীভাবে পরিবর্তিত হয় তা বর্ণনা করে।";
corrected.concepts["concept-temperature-coefficient-of-resistance"].summary =
    "তাপমাত্রার সঙ্গে একটি উপাদানের রোধ কীভাবে পরিবর্তিত হয়।";
getSection("concept-temperature-coefficient-of-resistance", "positive-and-negative").bullets![2] =
    "শূন্যের কাছাকাছি TCR নির্দিষ্ট পরিসরে রোধের সামান্য পরিবর্তন বোঝায়।";
getSection("concept-temperature-coefficient-of-resistance", "positive-and-negative").bullets![3] =
    "সহগের চিহ্ন গুরুত্বপূর্ণ; ঋণাত্মক মানের বদলে তার পরম মান ব্যবহার করলে পূর্বাভাসের দিক উল্টে যায়।";
getSection("concept-temperature-coefficient-of-resistance", "worked-example").examples![0].title = "উত্তপ্ত রোধ";
getSection("concept-temperature-coefficient-of-resistance", "power-and-limits").formulas![0].expression =
    "I = V / R";
getSection("concept-temperature-coefficient-of-resistance", "power-and-limits").paragraphs![0] =
    "ধ্রুবক ভোল্টেজে চালিত ধনাত্মক TCR-যুক্ত রোধে তাপমাত্রা বাড়লে রোধ বাড়ে এবং কারেন্ট কমার প্রবণতা থাকে। "
    + "ধ্রুবক কারেন্টের উৎসে একই রোধ বাড়লে বৈদ্যুতিক ক্ষমতাও বাড়ে।";

getSection("concept-trigonometry", "finding-sides-and-angles").title =
    "অজানা বাহু ও কোণ নির্ণয়";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].setup =
    "10 সেমি দৈর্ঘ্যের একটি কর্ণ 30° কোণ তৈরি করে।";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].conclusion =
    "বাহুর দৈর্ঘ্য জানা থাকলে একটি বিপরীতমুখী ত্রিকোণমিতিক ফাংশন ব্যবহার করুন।";
getSection("concept-trigonometry", "waveforms-and-identities").bullets![2] =
    "দিক বা ফেজ গুরুত্বপূর্ণ হলে চিহ্ন ও চতুর্ভুজ ঠিক রাখুন।";

getSection("concept-heat-capacity", "worked-example").title = "সমাধানসহ উদাহরণ";
getSection("concept-heat-capacity", "worked-example").examples![0].setup =
    "c = 4,180 J/(kg·K) ব্যবহার করে 0.20 kg জলকে 20 °C থেকে 70 °C পর্যন্ত গরম করুন।";
getSection("concept-heat-capacity", "electrical-heating").title = "বৈদ্যুতিক শক্তিতে উত্তাপ";
getSection("concept-heat-capacity", "electrical-heating").formulas![1].expression =
    "t = m × c × ΔT / P";
getSection("concept-heat-capacity", "object-and-material").paragraphs![0] =
    "তাপধারণ ক্ষমতা পুরো বস্তুর বৈশিষ্ট্য এবং কতটা পদার্থ উপস্থিত তার উপর নির্ভর করে। নির্দিষ্ট তাপধারণ ক্ষমতা "
    + "পদার্থের একটি বৈশিষ্ট্য। একই পদার্থের ভর দ্বিগুণ করলে তাপধারণ ক্ষমতাও দ্বিগুণ হয়।";
getSection("concept-heat-capacity", "phase-changes-and-limits").paragraphs![0] =
    "গলে যাওয়া বা ফুটানোর সময়, সরবরাহকৃত শক্তি তাপমাত্রা না বদলেই উপাদানের দশা পরিবর্তন করতে পারে। L হল "
    + "J/kg এককে নির্দিষ্ট সুপ্ত তাপ।";

corrected.concepts["concept-heat-flux"].summary =
    "একক ক্ষেত্রফল দিয়ে তাপ স্থানান্তরের হার।";
getSection("concept-heat-flux", "definition").bullets![0] =
    "q'' হল W/m² এককে তাপ-প্রবাহের ঘনত্ব।";
getSection("concept-heat-flux", "worked-example").examples![0].setup =
    "একটি 100 W হিটার 0.020 m² ক্ষেত্রফল দিয়ে তাপ স্থানান্তর করে।";
getSection("concept-heat-flux", "convection-and-radiation").paragraphs![0] =
    "পরিচলন একটি পৃষ্ঠ-সহগ ব্যবহার করে। বিকিরণে নির্গম্যতা ε এবং স্টেফান-বোল্টজম্যান ধ্রুবক σ ব্যবহৃত হয়; "
    + "বিকিরণ সমীকরণের তাপমাত্রা অবশ্যই কেলভিনে পরম তাপমাত্রা হতে হবে।";

getSection("concept-si-system-and-imperial-units", "base-units").title = "মৌলিক এসআই একক";
getSection("concept-si-system-and-imperial-units", "base-units").table!.rows[2] =
    ["সময়", "সেকেন্ড", "s"];
getSection("concept-si-system-and-imperial-units", "base-units").table!.rows[3] =
    ["তাপমাত্রা", "কেলভিন", "K"];

getSection("concept-joule-heating", "heating-power").bullets![1] =
    "V হল ভোল্টেজ, ভোল্টে (V) মাপা হয়।";
getSection("concept-joule-heating", "what-affects-heating").paragraphs![0] =
    "বৈদ্যুতিক ক্ষমতা শক্তি স্থানান্তরের হার, তাপমাত্রা নয়। তাপধারণ ক্ষমতা ও তাপপ্রবাহ নির্ধারণ করে শক্তি কীভাবে "
    + "তাপমাত্রা বদলায় এবং কত দ্রুত তাপ পৃষ্ঠ থেকে বেরিয়ে যায়।";

getSection("concept-kirchhoffs-laws", "cells").bullets![0] =
    "সিরিজে যুক্ত কোষগুলি ভোল্টেজ যোগ করে, কিন্তু অ্যাম্পিয়ার-ঘণ্টায় ক্ষমতা প্রায় একটি কোষের সমান থাকে।";
getSection("concept-kirchhoffs-laws", "cells").bullets![1] =
    "সমান্তরালে যুক্ত কোষগুলি একই ভোল্টেজ বজায় রাখে, আর ক্ষমতা ও উপলব্ধ কারেন্ট প্রায় যোগ হয়।";
getSection("concept-kirchhoffs-laws", "cells").bullets![2] =
    "কারেন্টের বণ্টন অভ্যন্তরীণ রোধ, সংযোগ, তার ও সুইচের উপর নির্ভর করে।";
getSection("concept-kirchhoffs-laws", "solving-and-limits").title = "বাস্তব সার্কিট বিশ্লেষণ";
getSection("concept-kirchhoffs-laws", "solving-and-limits").bullets![0] =
    "নোডের ভোল্টেজ, শাখার কারেন্ট এবং অনুমিত কারেন্টের দিক চিহ্নিত করুন।";
getSection("concept-kirchhoffs-laws", "solving-and-limits").bullets![1] =
    "স্বাধীন নোডে KCL এবং স্বাধীন লুপে KVL প্রয়োগ করুন।";
getSection("concept-kirchhoffs-laws", "solving-and-limits").bullets![2] =
    "V = I × R ব্যবহার করে রোধের ভোল্টেজ ও কারেন্টের সম্পর্ক স্থাপন করুন।";
getSection("concept-kirchhoffs-laws", "solving-and-limits").bullets![3] =
    "যুগপৎ সমীকরণগুলি সমাধান করে ক্ষমতার ভারসাম্য যাচাই করুন।";

getSection("concept-trigonometry", "waveforms-and-identities").bullets![0] =
    "A হল অ্যামপ্লিটিউড, f হল হার্টজে কম্পাঙ্ক, t হল সেকেন্ডে সময়, এবং φ হল ফেজ কোণ।";
getSection("concept-trigonometry", "waveforms-and-identities").bullets![1] =
    "কৌণিক কম্পাঙ্ক ω প্রতি সেকেন্ডে রেডিয়ানে মাপা হয়।";

getSection("concept-heat-capacity", "basic-relationships").bullets![0] =
    "C হল J/K বা J/°C এককে তাপধারণ ক্ষমতা।";
getSection("concept-heat-capacity", "worked-example").examples![0].conclusion =
    "আদর্শভাবে প্রয়োজনীয় শক্তি 41.8 kJ; তাপক্ষয়ের কারণে বাস্তব হিটারের আরও বেশি শক্তি প্রয়োজন।";
getSection("concept-heat-capacity", "electrical-heating").examples![0].title =
    "আদর্শ উত্তাপের সময়";

getSection("concept-heat-flux", "definition").bullets![1] =
    "Q_dot হল ওয়াটে (W) মোট তাপ স্থানান্তরের হার।";
getSection("concept-heat-flux", "worked-example").examples![0].conclusion =
    "গড় তাপ-প্রবাহের ঘনত্ব 5,000 W/m², অর্থাৎ 0.5 W/cm²।";
getSection("concept-heat-flux", "conduction").bullets![1] =
    "ΔT হল স্তরটির দুই পাশের তাপমাত্রার পার্থক্য।";
getSection("concept-heat-flux", "conduction").bullets![2] =
    "L হল স্তরটির পুরুত্ব, মিটারে।";
getSection("concept-heat-flux", "practical-checks").bullets![0] =
    "W/m² ব্যবহার করার আগে ক্ষেত্রফলকে m²-এ রূপান্তর করুন।";

baseUnits.rows[0] = ["দৈর্ঘ্য", "মিটার", "m"];
baseUnits.rows[1] = ["ভর", "কিলোগ্রাম", "kg"];
baseUnits.rows[4] = ["বৈদ্যুতিক প্রবাহ", "অ্যাম্পিয়ার", "A"];
getSection("concept-si-system-and-imperial-units", "base-units").bullets![0] = "ভোল্টেজ: ভোল্ট (V)।";

getSection("concept-wire-gauges-awg-swg-bwg", "system-comparison").paragraphs![0] =
    "এই মানগুলি নামমাত্র। পণ্যের সহনশীলতা, আবরণ, নিরোধক এবং বহু-তারের গঠন মাপা বা মোট ব্যাস পরিবর্তন করতে পারে।";

corrected.concepts["concept-kirchhoffs-laws"].description =
    "কির্শহফের কারেন্ট ও ভোল্টেজের সূত্র নোডে চার্জ এবং বন্ধ লুপে শক্তির সংরক্ষণ ব্যাখ্যা করে।";
getSection("concept-kirchhoffs-laws", "current-law").paragraphs![0] =
    "কোনও নোডে 8 A প্রবেশ করে এবং একটি শাখা দিয়ে 3 A বের হলে, বাকি শাখাগুলি দিয়ে মোট 5 A বের হতে হবে। হিসাবের " +
    "আগে কারেন্টের দিক নির্ধারণ করুন; ঋণাত্মক ফল প্রকৃত কারেন্টের বিপরীত দিক নির্দেশ করে।";
getSection("concept-kirchhoffs-laws", "voltage-law").formulas![1].expression =
    "+8.0 V - V_1 - V_2 = 0";
corrected.concepts["concept-heat-flux"].displayName = "তাপ-প্রবাহের ঘনত্ব";
getSection("concept-wire-gauges-awg-swg-bwg", "practical-specification").bullets![4] =
    "শুধু গেজ নম্বর নয়, পণ্যের তথ্য ও বৈদ্যুতিক নিয়মের ভিত্তিতে কারেন্ট বহনক্ষমতা নির্ধারণ করুন।";

getSection("concept-joule-heating", "what-affects-heating").title =
    "যে বিষয়গুলো উত্তাপকে প্রভাবিত করে";
getSection("concept-joule-heating", "what-affects-heating").paragraphs![0] =
    "বৈদ্যুতিক ক্ষমতা শক্তি স্থানান্তরের হার, তাপমাত্রা নয়। তাপধারণ ক্ষমতা ও তাপপ্রবাহ নির্ধারণ করে শক্তি কীভাবে তাপমাত্রা " +
    "পরিবর্তন করে এবং কত দ্রুত তা পৃষ্ঠ থেকে বেরিয়ে যায়।";
getSection("concept-ohms-law", "relationship").bullets![1] =
    "I হল কারেন্ট, অ্যাম্পিয়ারে (A) পরিমাপ করা হয়।";
getSection("concept-ohms-law", "unit-conversions").bullets![3] = "1 W = 1,000 mW";
getSection("concept-joule-heating", "heating-power").bullets![2] =
    "I হল অ্যাম্পিয়ারে পরিমাপ করা কারেন্ট (A)।";
getSection("concept-si-system-and-imperial-units", "base-units").bullets = [
    "ভোল্টেজ: ভোল্ট (V)।",
    "রোধ: ওহম (Ω)।",
    "ক্ষমতা: ওয়াট (W)।",
    "শক্তি: জুল (J)।",
    "বল: নিউটন (N)।",
    "চাপ: পাস্কাল (Pa)।",
    "কম্পাঙ্ক: হার্টজ (Hz)।"
];
getSection("concept-si-system-and-imperial-units", "decimal-prefixes").table!.rows[1][1] = "M";
getSection("concept-si-system-and-imperial-units", "decimal-prefixes").table!.rows[2][1] = "m";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].title =
    "একটি বাহু নির্ণয় করুন";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].formulas![0] =
    "বিপরীত বাহু = 10 × sin(30°) = 5 সেমি";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].formulas![1] =
    "সন্নিহিত বাহু = 10 × cos(30°) ≈ 8.66 সেমি";

getSection("concept-ohms-law", "rearranged-formulas").bullets![2] =
    "শূন্য Ω রোধ একটি আদর্শ শর্ট সার্কিট; একে আলাদাভাবে বিবেচনা করতে হবে।";
const ohmExamples = getSection("concept-ohms-law", "worked-examples").examples!;
ohmExamples[0].setup = "একটি 4.2 V উৎস 1.0 Ω লোডের সঙ্গে যুক্ত।";
ohmExamples[2].setup = "0.5 A কারেন্ট একটি 10 Ω রোধের মধ্য দিয়ে প্রবাহিত হয়।";
getSection("concept-ohms-law", "unit-conversions").bullets![0] = "1 kΩ = 1,000 Ω";
getSection("concept-ohms-law", "unit-conversions").bullets![1] = "1 MΩ = 1,000,000 Ω";

getSection("concept-joule-heating", "worked-example").examples![0].setup =
    "0.8 Ω রোধের একটি কয়েলের মধ্য দিয়ে 3 A কারেন্ট প্রবাহিত হয়।";
getSection("concept-joule-heating", "what-affects-heating").paragraphs![0] =
    "বৈদ্যুতিক ক্ষমতা শক্তি স্থানান্তরের হার, তাপমাত্রা নয়। তাপধারণ ক্ষমতা ও তাপ-প্রবাহের ঘনত্ব নির্ধারণ করে " +
    "সেই শক্তি তাপমাত্রাকে কীভাবে বদলায় এবং কত দ্রুত তাপ পৃষ্ঠ থেকে বেরিয়ে যায়।";

const kirchhoffExamples = getSection("concept-kirchhoffs-laws", "series-and-parallel").examples!;
kirchhoffExamples[0].setup = "0.20 Ω মানের দুটি রোধ 8.0 V উৎসের সঙ্গে সিরিজে যুক্ত।";
kirchhoffExamples[1].setup = "0.40 Ω মানের দুটি সমান শাখা 4.0 V উৎসের সঙ্গে সমান্তরালে যুক্ত।";
kirchhoffExamples[1].formulas![0] = "R_total = 0.20 Ω";
const kirchhoffCells = getSection("concept-kirchhoffs-laws", "cells");
kirchhoffCells.bullets![0] =
    "সিরিজে যুক্ত কোষগুলির ভোল্টেজ যোগ হয়, কিন্তু অ্যাম্পিয়ার-ঘণ্টা ক্ষমতা একটি সমান কোষের ক্ষমতার সমান থাকে।";

const tcrLinear = getSection("concept-temperature-coefficient-of-resistance", "linear-model");
tcrLinear.bullets![0] = "R_0 হল রেফারেন্স তাপমাত্রা T_0-এ রোধ।";
tcrLinear.bullets![2] = "α হল পদার্থের তাপমাত্রা সহগ, যা 1/°C বা ppm/°C এককে প্রকাশ করা হয়।";
const tcrExample = getSection("concept-temperature-coefficient-of-resistance", "worked-example").examples![0];
tcrExample.setup = "20 °C-এ একটি রোধের মান 1.00 Ω এবং তার TCR 400 ppm/°C।";
tcrExample.formulas![0] = "α = 400 × 10^-6 / °C = 0.0004 / °C";
tcrExample.formulas![1] = "ΔT = 100 - 20 = 80 °C";
tcrExample.formulas![2] = "R_T = 1.00 [1 + 0.0004 × 80] = 1.032 Ω";
tcrExample.conclusion = "আনুমানিক রোধ 1.032 Ω, যা 20 °C-এর মানের চেয়ে প্রায় 3.2% বেশি।";
corrected.concepts["concept-temperature-coefficient-of-resistance"].displayName =
    "রোধের তাপমাত্রা সহগ (TCR)";

getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].formulas![0] =
    "বিপরীত বাহু = 10 × sin(30°) = 5 cm";
getSection("concept-trigonometry", "finding-sides-and-angles").examples![0].formulas![1] =
    "সন্নিহিত বাহু = 10 × cos(30°) ≈ 8.66 cm";

getSection("concept-heat-capacity", "electrical-heating").title = "বৈদ্যুতিক ক্ষমতা দিয়ে উত্তাপ";
getSection("concept-si-system-and-imperial-units", "length-conversions").examples![0].conclusion =
    "ক্ষেত্রফল ও আয়তনের রূপান্তরে দৈর্ঘ্যের রূপান্তর গুণককে সংশ্লিষ্ট ঘাতে উন্নীত করতে হয়।";

const gaugeTable = getSection("concept-wire-gauges-awg-swg-bwg", "system-comparison").table!;
for (const row of gaugeTable.rows) {
    row[1] = row[1].replace("মিমি", "mm");
    row[2] = row[2].replace("মিমি", "mm");
    row[3] = row[3].replace("মিমি", "mm");
}

getSection("concept-ohms-law", "rearranged-formulas").bullets![1] =
    "ভোল্টেজ অপরিবর্তিত থাকলে রোধ বাড়ার সঙ্গে কারেন্ট কমে।";
getSection("concept-ohms-law", "rearranged-formulas").bullets![0] =
    "রোধ অপরিবর্তিত থাকলে ভোল্টেজ বাড়ার সঙ্গে কারেন্ট বাড়ে।";
getSection("concept-ohms-law", "limits").paragraphs![0] =
    "ওহমের সূত্র একটি আদর্শায়িত মডেল। বাস্তব উপাদান অ-ওমিক হতে পারে: তাপমাত্রা, ভোল্টেজ, কারেন্ট, কম্পাঙ্ক " +
    "বা পরিচালন অবস্থার সঙ্গে তার রোধ বদলাতে পারে। সিরিজ ও সমান্তরাল নেটওয়ার্কে ওহমের সূত্রের সঙ্গে কির্শহফের " +
    "সূত্র ব্যবহার করুন।";
corrected.concepts["concept-kirchhoffs-laws"].summary =
    "সংযুক্ত সার্কিটে কারেন্ট ও ভোল্টেজের আচরণ।";
const kirchhoffTerms = getSection("concept-kirchhoffs-laws", "circuit-terms");
kirchhoffTerms.bullets![1] = "শাখা হল দুটি নোডের মধ্যবর্তী কারেন্টের পথ।";
kirchhoffTerms.bullets![3] = "সিরিজ সংযোগে উপাদানগুলির মধ্য দিয়ে কারেন্টের জন্য একটিমাত্র পথ থাকে।";

getSection("concept-si-system-and-imperial-units", "decimal-prefixes").paragraphs![0] =
    "উদাহরণস্বরূপ, 2.2 kΩ সমান 2,200 Ω এবং 15 mA সমান 0.015 A। সূত্র ব্যবহারের আগে মানগুলিকে "
    + "সামঞ্জস্যপূর্ণ এককে রূপান্তর করুন।";
kirchhoffExamples[1].conclusion = "শাখা দুটির রোধ সমান হওয়ায় প্রতিটি শাখা দিয়ে 10 A কারেন্ট প্রবাহিত হয়।";
getSection("concept-temperature-coefficient-of-resistance", "power-and-limits").paragraphs![1] =
    "সরলরৈখিক মডেলটি সীমিত তাপমাত্রা পরিসরে কেবল একটি আনুমানিক হিসাব। পর্যায় পরিবর্তন, অক্সিডেশন, "
    + "যান্ত্রিক বিকৃতি এবং উপাদানের গঠনের পরিবর্তন রোধকে এমনভাবে বদলাতে পারে যা একটি ধ্রুব TCR দিয়ে ধরা যায় না।";
getSection("concept-trigonometry", "degrees-and-radians").paragraphs![0] =
    "একটি পূর্ণ ঘূর্ণন হল 360° বা 2π রেডিয়ান। ক্যালকুলেটর বা প্রোগ্রামিং ভাষা কোন কোণ একক প্রত্যাশা করে তা "
    + "সবসময় যাচাই করুন; ডিগ্রি ও রেডিয়ান গুলিয়ে ফেললে ফলাফল ভুল হবে।";

export const batteryTexts: typeof draftBatteryTexts = {
    ...draftBatteryTexts,
    "battery.note.battery-93.evidence":
        "12 A অবিচ্ছিন্ন মান; 20 A শুধু পালসের জন্য। পরীক্ষিত মোড়কটি ঠিক SA110 / INR18650/40 নামে নথিভুক্ত।",
    "battery.note.battery-94.evidence":
        "পরীক্ষিত মোড়কের মান 20 A; পরীক্ষক অবিচ্ছিন্ন ব্যবহারে 15 A-এর নিচে থাকার পরামর্শ দেন। Vapehuset "
        + "শিরোনামে 25 A প্রচার করে; পরবর্তী রিওর্যাপের উৎস বা মোড়কের সংস্করণ ভিন্ন হতে পারে।",
    "battery.note.battery-95.evidence":
        "পরীক্ষিত নির্দিষ্ট মডেলের মান 30 A; এটি একটি রিওর্যাপ, তাই পরবর্তী মোড়কের সংস্করণ বা ভেতরের কোষের উৎস "
        + "ভিন্ন হতে পারে।",
    "battery.note.battery-96.evidence":
        "পরীক্ষিত পাঁচ-পা সংস্করণের মান 30 A; একই মোড়ক ব্যবহার করা চার-পা ও পরবর্তী সংস্করণগুলি উল্লেখযোগ্যভাবে "
        + "ভিন্ন, তাই এই প্রোফাইল সেগুলির ক্ষেত্রে প্রয়োগ করা যাবে না।",
};

export const modTexts: typeof draftModTexts = {
    ...draftModTexts,
    "mod.preset-231.profile":
        "18650 অ্যাডাপ্টারসহ দুইটি 21700 কোষের রেগুলেটেড মড; VAPORESSO-এর ঘোষিত মান 220 W; পরীক্ষায় 208 W, "
        + "8.979 V ও 39 A পরিমাপ করা হয়েছে।",
    "mod.preset-234.profile":
        "দুইটি 18650 কোষের রেগুলেটেড মড; VAPORESSO-এর ঘোষিত মান 220 W; পরীক্ষায় 215 W, 9.08 V ও 37 A "
        + "পরিমাপ করা হয়েছে।",
    "mod.preset-235.profile":
        "অন্তর্নির্মিত ব্যাটারির 100 W রেগুলেটেড মড; পরীক্ষায় 101 W, 29 A এবং অন্তত 7.97 V পরিমাপ করা হয়েছে।",
    "mod.preset-236.profile":
        "AS Chip 4.0-সহ একটি 18650 কোষের রেগুলেটেড মড; প্রস্তুতকারকের প্রোফাইল 100 W, 7.5 V, 32 A ও 0.1–3 Ω।",
    "mod.preset-237.profile":
        "21700 কোষ বা অ্যাডাপ্টারসহ 18650 কোষের এক-কোষী মড; Eleaf-এর ঘোষিত মান 100 W, 9 V ও 0.05–3.5 Ω; "
        + "পরীক্ষায় 30 A সীমা শনাক্ত হয়েছে।",
    "mod.preset-238.profile":
        "21700, 20700 বা অ্যাডাপ্টারসহ 18650 কোষের জন্য এক-কোষী রেগুলেটেড স্কোয়াঙ্ক মড; এর রক্ষণশীল প্রোফাইল "
        + "95 W, 6 V ও 34 A।",
};

for (const batteryId of ["battery-93", "battery-94", "battery-95", "battery-96"] as const) {
    corrected.batteries[batteryId].notes![0] = batteryTexts[`battery.note.${batteryId}.evidence`];
}
for (const modId of ["preset-231", "preset-234", "preset-235", "preset-236", "preset-237", "preset-238"] as const) {
    const profile = modTexts[`mod.${modId}.profile`];
    corrected.mods[modId].description = profile;
    corrected.mods[modId].summary = profile;
}

jouleHeating.sections[1].examples![0].title = "রোধযুক্ত লোড";
jouleHeating.sections[1].examples![0].conclusion =
    "কয়েলটি প্রতি সেকেন্ডে 7.2 J হারে, অর্থাৎ 10 সেকেন্ডে 72 J শক্তি তাপে রূপান্তরিত করে।";
corrected.concepts["concept-kirchhoffs-laws"].description =
    "কির্শহফের কারেন্ট ও ভোল্টেজের সূত্র সার্কিটের নোডে চার্জ এবং বদ্ধ লুপে শক্তির সংরক্ষণ ব্যাখ্যা করে।";
kirchhoffExamples[0].title = "সিরিজ রোধ";
kirchhoffExamples[1].title = "সমান্তরাল রোধ";
kirchhoffExamples[0].conclusion = "একই 20 A কারেন্ট দুটি রোধের মধ্য দিয়েই প্রবাহিত হয়।";
tcrLinear.bullets![1] = "R_T হল T তাপমাত্রায় রোধের আনুমানিক মান।";
getSection("concept-temperature-coefficient-of-resistance", "positive-and-negative").bullets![0] =
    "ধনাত্মক TCR হলে তাপমাত্রা বাড়ার সঙ্গে রোধ বাড়ে; অনেক ধাতু এভাবে আচরণ করে।";
getSection("concept-temperature-coefficient-of-resistance", "positive-and-negative").bullets![1] =
    "ঋণাত্মক TCR হলে তাপমাত্রা বাড়ার সঙ্গে রোধ কমে।";
getSection("concept-heat-flux", "practical-checks").bullets![2] =
    "প্রয়োজনে সংযোগস্থলের তাপীয় রোধ, পরিচলন, বিকিরণ ও তাপক্ষয় অন্তর্ভুক্ত করুন।";
corrected.concepts["concept-si-system-and-imperial-units"].description =
    "আন্তর্জাতিক একক পদ্ধতি প্রকৌশলের জন্য সামঞ্জস্যপূর্ণ মৌলিক একক, উদ্ভূত একক ও দশমিক স্কেলিং দেয়।";
getSection("concept-si-system-and-imperial-units", "decimal-prefixes").table!.headers[2] = "গুণক";
getSection("concept-wire-gauges-awg-swg-bwg", "resistance").title = "গেজ, ক্ষেত্রফল ও রোধ";
corrected.concepts["concept-ohms-law"].summary = "ভোল্টেজ, কারেন্ট ও রোধের মধ্যকার সম্পর্ক।";
getSection("concept-kirchhoffs-laws", "circuit-terms").paragraphs![0] =
    "নিচের মৌলিক পরিভাষাগুলি সার্কিট ডায়াগ্রাম বিশ্লেষণ করতে সাহায্য করে:";
getSection("concept-kirchhoffs-laws", "voltage-law").title = "কির্শহফের ভোল্টেজের সূত্র";
getSection("concept-kirchhoffs-laws", "solving-and-limits").paragraphs![0] =
    "সরলীকৃত মডেলে কোষের অভ্যন্তরীণ রোধ, সংযোগস্থলের রোধ, কনভার্টারের দক্ষতা, তাপমাত্রার প্রভাব, ক্ষণস্থায়ী "
    + "আচরণ, সুরক্ষা সার্কিট ও উপাদানের সহনশীলতা বাদ পড়তে পারে। উচ্চ-কারেন্ট সার্কিটে উল্লেখযোগ্য প্রভাব ফেলে "
    + "এমন প্রতিটি বাদ দেওয়া আচরণ অন্তর্ভুক্ত করুন।";
getSection("concept-temperature-coefficient-of-resistance", "linear-model").paragraphs![0] =
    "তাপমাত্রার ছোট বা মাঝারি পরিবর্তনের জন্য নিচের প্রথম-ক্রমের সম্পর্কটি ব্যবহার করুন:";
getSection("concept-temperature-coefficient-of-resistance", "worked-example").title = "সমাধানসহ উদাহরণ";
corrected.concepts["concept-trigonometry"].description =
    "ত্রিকোণমিতি কোণ ও দৈর্ঘ্যের মধ্যে সম্পর্ক স্থাপন করে এবং ভেক্টর, ফেজের সম্পর্ক ও তরঙ্গরূপ বিশ্লেষণে কাজে লাগে।";
corrected.concepts["concept-heat-flux"].description =
    "তাপ সঞ্চয়কারী পদার্থের মোট পরিমাণ নির্বিশেষে কোনও পৃষ্ঠ দিয়ে তাপ কত দ্রুত যায়, তা তাপ-প্রবাহের ঘনত্ব বোঝায়।";
getSection("concept-heat-flux", "definition").paragraphs![0] =
    "তাপ-প্রবাহের ঘনত্ব ও তাপধারণ ক্ষমতা এক নয়: তাপধারণ ক্ষমতা প্রতি একক তাপমাত্রা পরিবর্তনে সঞ্চিত শক্তি বোঝায়, "
    + "আর তাপ-প্রবাহের ঘনত্ব বোঝায় কোনও পৃষ্ঠ দিয়ে তাপ প্রবাহের হার।";
corrected.concepts["concept-si-system-and-imperial-units"].summary =
    "প্রকৌশল গণনায় ব্যবহৃত একক, উপসর্গ ও রূপান্তর।";
getSection("concept-si-system-and-imperial-units", "unit-checks").title = "ব্যবহারিক একক যাচাই";
corrected.concepts["concept-wire-gauges-awg-swg-bwg"].description =
    "গেজ পদ্ধতির নাম উল্লেখ থাকলেই একটি গেজ নম্বর নির্দিষ্ট নামমাত্র আকার বোঝায়।";
corrected.concepts["concept-wire-gauges-awg-swg-bwg"].summary =
    "তার-গেজের নম্বরের সঙ্গে কেন পদ্ধতির নাম ও নির্দিষ্ট ব্যাস উল্লেখ করা দরকার।";
getSection("concept-wire-gauges-awg-swg-bwg", "gauge-systems").paragraphs![0] =
    "SWG ও BWG সারণিভিত্তিক পদ্ধতি; এগুলি AWG সূত্র দিয়ে গণনা করা যাবে না। তাই একই নম্বর সব পদ্ধতিতে একই ব্যাস "
    + "নির্দেশ করে না।";

export const presentations = corrected as unknown as CatalogPresentationSet;

export { materialTexts };
