import { useEffect, type RefObject } from "react";

/**
 * While the element sticks to the top of the viewport, reserves its height as scroll padding so that controls
 * scrolled into view by keyboard focus are not hidden behind it (WCAG 2.4.11).
 */
export const useStickyScrollPadding = (element: RefObject<HTMLElement | null>, active: boolean): void => {
    useEffect(() => {
        const target = element.current;
        if (!active || !target) return;
        const root = document.documentElement;
        const previous = root.style.scrollPaddingTop;
        const update = (): void => {
            const style = getComputedStyle(target);
            root.style.scrollPaddingTop = style.position === "sticky"
                ? `${target.offsetHeight + (Number.parseFloat(style.top) || 0) * 2}px`
                : previous;
        };
        update();
        const observer = typeof ResizeObserver === "undefined" ? undefined : new ResizeObserver(update);
        observer?.observe(target);
        window.addEventListener("resize", update);
        return () => {
            observer?.disconnect();
            window.removeEventListener("resize", update);
            root.style.scrollPaddingTop = previous;
        };
    }, [element, active]);
};
