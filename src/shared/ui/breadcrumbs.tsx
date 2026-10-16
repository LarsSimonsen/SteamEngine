import type { ReactElement } from "react";
import "./breadcrumbs.css";

export type BreadcrumbItem = Readonly<{
    readonly label: string;
    readonly href?: string;
}>;

export const Breadcrumbs = ({ label, items }: Readonly<{
    label: string;
    items: readonly BreadcrumbItem[];
}>): ReactElement => <nav className="breadcrumbs" aria-label={label}>
    {items.map((item, index) => <span className="breadcrumbs__item" key={`${item.label}-${index}`}>
        {index > 0 && <span className="breadcrumbs__separator" aria-hidden="true">/</span>}
        {item.href ? <a href={item.href}>{item.label}</a> : <span aria-current="page">{item.label}</span>}
    </span>)}
</nav>;
