import type { ReactElement } from "react";
import { ConverterPanel, converterStorageKey } from "./converter-panel";
import "../../shared/styles/foundation.css";
import { CalculatorLegacyNote, CalculatorPageHeader } from "../../shared/ui/calculator-page-header";
import { SiteLayout } from "../../shared/ui/site-layout";
import { calculatorMessagesFor } from "../../i18n/calculator-messages";
import { pageLocale } from "../../i18n/page-locale";

export const Converter = (): ReactElement => {
    const messages = calculatorMessagesFor(pageLocale()).converter;
    return <SiteLayout basePath="./" className="converter-app" currentRoute="converter" rootHref=".">
    <main className="page-content">
        <CalculatorPageHeader className="converter-page-header" eyebrow={messages.eyebrow}
            title={messages.title} description={messages.description} />
        <ConverterPanel persistenceKey={converterStorageKey} />
        <CalculatorLegacyNote href="old/converter" />
    </main>
</SiteLayout>;
};
