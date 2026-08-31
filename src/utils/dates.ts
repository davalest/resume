import type {SupportedLanguage} from "./i18n.ts";

export type YearMonth = string;

export interface DateRange {
    start: YearMonth;
    end?: YearMonth;
}

const MONTHS: Record<SupportedLanguage, readonly string[]> = {
    en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    es: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sept", "oct", "nov", "dic"],
};

const formatYearMonth = (value: YearMonth, locale: SupportedLanguage): string => {
    const [year, month] = value.split("-").map(Number);
    if (!year) {
        throw new Error(`Invalid date: ${value}. It should be 'YYYY' or 'YYYY-MM'.`);
    }
    if (!month) {
        return String(year);
    }

    const name = MONTHS[locale][month - 1];
    if (!name) {
        throw new Error(`Invalid month in ${value}: ${month}. It should be 1-12.`);
    }

    return `${name} ${year}`;
};

export const formatDateRange = (
    {start, end}: DateRange,
    locale: SupportedLanguage,
    ongoingLabel: string,
): string => {
    const from = formatYearMonth(start, locale);

    if (!end) {
        return `${from} — ${ongoingLabel}`;
    }

    const to = formatYearMonth(end, locale);
    return from === to ? from : `${from} — ${to}`;
};

export interface DateRangeParts {
    /** Machine-readable bound for `<time datetime>`, or undefined when ongoing. */
    readonly startDateTime: YearMonth;
    readonly endDateTime: YearMonth | undefined;
    readonly startLabel: string;
    readonly endLabel: string;
    /** True when both bounds render the same label and one `<time>` is enough. */
    readonly collapsed: boolean;
}

/**
 * The same range as `formatDateRange`, split so a template can wrap each bound in
 * its own `<time datetime>` without re-deriving the labels.
 */
export const dateRangeParts = (
    {start, end}: DateRange,
    locale: SupportedLanguage,
    ongoingLabel: string,
): DateRangeParts => {
    const startLabel = formatYearMonth(start, locale);
    const endLabel = end ? formatYearMonth(end, locale) : ongoingLabel;

    return {
        startDateTime: start,
        endDateTime: end,
        startLabel,
        endLabel,
        collapsed: end !== undefined && startLabel === endLabel,
    };
};
