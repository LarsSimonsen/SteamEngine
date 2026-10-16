import { describe, expect, it } from "vitest";
import { calculatorMessagesFor } from "./calculator-messages";
import { messagesFor } from "./messages";

describe("Hindi translation corrections", () => {
    it("renders shared interpolation values without exposing machine-draft tokens", () => {
        const messages = messagesFor("hi");
        const rendered = [
            messages.catalogManager.manage("बैटरियाँ"),
            messages.catalogManager.shared("बैटरी"),
            messages.catalogManager.close("बैटरी"),
            messages.catalogManager.choose("बैटरियाँ"),
            messages.catalogManager.builtIn("बैटरियाँ"),
            messages.catalogManager.visibility("बैटरियाँ"),
            messages.catalogManager.custom("बैटरियाँ"),
            messages.catalogManager.newCustom("बैटरी"),
            messages.catalogManager.noneYet("बैटरियाँ"),
            messages.catalogManager.resetSaved("बैटरी"),
            messages.catalogManager.savedReset("बैटरी"),
            messages.catalogEditor.editCustom("बैटरी"),
            messages.catalogEditor.newCustom("बैटरी"),
            messages.catalogEditor.save("बैटरी"),
            messages.ohm.adjusting("वोल्टेज"),
            messages.ohm.lockSummary("वोल्टेज", "प्रतिरोध"),
        ];

        expect(rendered.every((value) => !value.toLowerCase().includes("__se_arg_"))).toBe(true);
        expect(rendered.every((value) => value.includes("बैट") || value.includes("वोल्टेज"))).toBe(true);
    });

    it("uses corrected calculator labels and preserves unit symbols", () => {
        const messages = calculatorMessagesFor("hi");

        expect(messages.juice.nicStrength).toBe("निकोटीन की सांद्रता");
        expect(messages.juice.percentage).toBe("प्रतिशत");
        expect(messages.juice.ml).toBe("ml");
        expect(messages.juice.grams).toBe("g");
        expect(messages.wirewiz.wraps).toBe("रैप्स");
        expect(messages.wirewiz.powerDissipated).toBe("शक्ति क्षय");
        expect(messages.coil.outerDiameter).toBe("बाहरी व्यास");
        expect(messages.coil.setupParallel2).toContain("कॉइल");
    });
});
