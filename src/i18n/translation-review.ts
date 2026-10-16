import reviewMetadata from "./translation-review.json";
import type { Locale } from "./locales";
import { contactEmailHref } from "../shared/contact-email";

export type TranslationReviewState = "source" | "machine" | "needs-review" | "reviewed" | "approved";

const localeReviewStates = Object.fromEntries(Object.entries(reviewMetadata.locales).map(([locale, review]) => [
    locale,
    review.state,
])) as Readonly<Record<Locale, TranslationReviewState>>;

export const translationReviewStateFor = (locale: Locale): TranslationReviewState => localeReviewStates[locale];

export const localeNeedsTranslationReview = (locale: Locale): boolean =>
    !["source", "reviewed", "approved"].includes(translationReviewStateFor(locale));

export const translationCorrectionHref = (locale: Locale, pagePath: string): string => contactEmailHref(
    `Steam Engine translation correction (${locale})`,
    `Locale: ${locale}\nPage: ${pagePath}\n\nCurrent text:\n\nSuggested correction:\n\nExplanation (optional):\n`,
);
