import type { ModComparisonMessages } from "../comparison-messages";
import { messages as draftMods } from "./mods/bn";

export const mods: ModComparisonMessages = {
    ...draftMods,
    powerLimits: "ক্ষমতার সীমা",
    baseProfile: "ভিত্তি প্রোফাইল",
    invalidSelection: "এই শেয়ার করা লিঙ্কে উল্লেখিত মড বা নিয়ন্ত্রণ বোর্ডটি ক্যাটালগে পাওয়া যায়নি।",
    sameSelection: "দুই পাশেই একই মড বা নিয়ন্ত্রণ বোর্ড বেছে নেওয়া হয়েছে।",
};
