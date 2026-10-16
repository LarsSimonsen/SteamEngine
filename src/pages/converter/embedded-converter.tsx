import type { ReactElement } from "react";
import { ConverterPanel } from "./converter-panel";
import { calculatorMessagesFor } from "../../i18n/calculator-messages";
import { pageLocale } from "../../i18n/page-locale";

export type EmbeddedConverterProps = {
    readonly idPrefix: string;
    readonly className?: string;
};

export const EmbeddedConverter = ({ idPrefix, className }: EmbeddedConverterProps): ReactElement => {
    const messages = calculatorMessagesFor(pageLocale()).converter;
    return <div id={idPrefix}>
        <section className={`se-embedded-tool${className === undefined ? "" : ` ${className}`}`}
            aria-labelledby={`${idPrefix}-title`}>
            <header className="se-embedded-tool__header">
                <div>
                    <p className="eyebrow">{messages.eyebrow}</p>
                    <h2 id={`${idPrefix}-title`}>{messages.title}</h2>
                    <p>{messages.embeddedDescription}</p>
                </div>
            </header>
            <ConverterPanel idPrefix={idPrefix} />
        </section>
    </div>;
};
