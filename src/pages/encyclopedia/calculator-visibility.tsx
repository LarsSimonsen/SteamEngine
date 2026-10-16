import type { ReactElement } from "react";
import { messagesFor } from "../../i18n/messages";
import { pageLocale } from "../../i18n/page-locale";

export type CalculatorVisibilityProps = {
    readonly label: string;
    readonly visible: boolean;
    readonly onChange: (visible: boolean) => void;
};

export const CalculatorVisibility = ({ label, visible, onChange }: CalculatorVisibilityProps): ReactElement => {
    const messages = messagesFor(pageLocale()).calculatorVisibility;
    return <div className="encyclopedia-entry-card__visibility">
        <span>{messages.label}</span>
        <button type="button" className="encyclopedia-visibility-toggle" aria-pressed={visible}
            aria-label={messages.ariaLabel(label)} onClick={() => onChange(!visible)}>
            <span aria-hidden="true" className="encyclopedia-visibility-toggle__track">
                <span className="encyclopedia-visibility-toggle__thumb" />
            </span>
            <span>{visible ? messages.shown : messages.hidden}</span>
        </button>
    </div>;
};
