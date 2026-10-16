import type { ReactElement, ReactNode } from "react";
import { messagesFor } from "../../i18n/messages";
import { pageLocale } from "../../i18n/page-locale";

export type CalculatorPageHeaderProps = {
    readonly title: string;
    readonly description?: ReactNode;
    readonly eyebrow?: string;
    readonly actions?: ReactNode;
    readonly className?: string;
    readonly copyClassName?: string;
    readonly actionsClassName?: string;
};

const rootRelativeLegacyHref = (href: string): string => href.startsWith("/") ? href : `/${href}`;

export const CalculatorPageHeader = ({
    title,
    description,
    eyebrow,
    actions,
    className,
    copyClassName,
    actionsClassName,
}: CalculatorPageHeaderProps): ReactElement =>
    <header className={`se-page-header${className === undefined ? "" : ` ${className}`}`}>
        <div className={copyClassName}>
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h1>{title}</h1>
            {description && <p>{description}</p>}
        </div>
        {actions && <div className={`se-page-header__actions${actionsClassName === undefined
            ? ""
            : ` ${actionsClassName}`}`}>{actions}</div>}
    </header>;

export const CalculatorLegacyNote = ({ href }: { readonly href: string }): ReactElement =>
    <p className="se-calculator-legacy-note">
        {messagesFor(pageLocale()).calculatorHeader.oldVersionNote} <a href={rootRelativeLegacyHref(href)}>
            {messagesFor(pageLocale()).calculatorHeader.oldVersionLinkLabel}
        </a>.
    </p>;
