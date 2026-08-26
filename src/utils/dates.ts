export const getYearsBetweenDates = (start: Date, end: Date = new Date()): number => {
    if (!(start instanceof Date) || isNaN(start.getTime())) {
        throw new Error("Invalid start date");
    }

    const years = end.getFullYear() - start.getFullYear();
    const monthsIntoYear = end.getMonth() - start.getMonth();
    const anniversaryPassed =
        monthsIntoYear > 0 || (monthsIntoYear === 0 && end.getDate() >= start.getDate());

    return anniversaryPassed ? years : years - 1;
};

export const parseDate = (dateString: string): Date => {
    const [year, month, day] = dateString.split("-").map(Number);
    if (!year || !month || !day) {
        throw new Error(`Invalid date format: ${dateString}. It should be 'YYYY-MM-DD'.`);
    }
    return new Date(year, month - 1, day);
};

export type YearMonth = string;

export interface DateRange {
    start: YearMonth;
    end?: YearMonth;
}

const formatYearMonth = (value: YearMonth, locale: string): string => {
    const [year, month] = value.split("-").map(Number);
    if (!year) {
        throw new Error(`Invalid date: ${value}. It should be 'YYYY' or 'YYYY-MM'.`);
    }
    if (!month) {
        return String(year);
    }
    return new Intl.DateTimeFormat(locale, {month: "short", year: "numeric"}).format(
        new Date(year, month - 1, 1),
    );
};

export const formatDateRange = (
    {start, end}: DateRange,
    locale: string,
    ongoingLabel: string,
): string => {
    const from = formatYearMonth(start, locale);

    if (!end) {
        return `${from} — ${ongoingLabel}`;
    }

    const to = formatYearMonth(end, locale);
    return from === to ? from : `${from} — ${to}`;
};

const HTML_START = parseDate("2016-05-01");
const REACT_START = parseDate("2017-02-01");

export const HTML_YEAR_EXPERTISE = getYearsBetweenDates(HTML_START);
export const REACT_YEAR_EXPERTISE = getYearsBetweenDates(REACT_START);
