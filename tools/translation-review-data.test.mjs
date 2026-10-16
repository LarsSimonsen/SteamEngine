import { describe, expect, it } from "vitest";
import { collectTranslationEntries } from "./translation-review-data.mjs";

describe("translation entry collection", () => {
    it("preserves placeholders in rest-parameter translation functions", () => {
        const entries = new Map();
        const translated = (...args) => "Value __se_arg_0__ and __SE_ARG_1__"
            .replace(/__SE_ARG_(\d+)__/g, (_, index) => String(args[Number(index)] ?? ""))
            .replace(/__se_arg_(\d+)__/g, (_, index) => String(args[Number(index)] ?? ""));

        collectTranslationEntries({ translated }, "messages", entries);

        expect(entries.get("messages.translated")).toBe("Value __SE_ARG_0__ and __SE_ARG_1__");
    });
});
