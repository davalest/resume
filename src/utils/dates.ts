export const getYearsBetweenDates = (start: Date, end: Date = new Date()): number => {
    if (!(start instanceof Date) || isNaN(start.getTime())) {
        throw new Error("Invalid start date");
    }
    const duration = end.getTime() - start.getTime();
    const years = duration / (1000 * 60 * 60 * 24 * 365.25);
    return Math.round(years);
};

export const parseDate = (dateString: string): Date => {
    const [year, month, day] = dateString.split('-').map(Number);
    if (!year || !month || !day) {
        throw new Error(`Invalid date format: ${dateString}. It should be 'YYYY-MM-DD'.`);
    }
    return new Date(year, month - 1, day);
};

const HTML_START = parseDate("2016-05-01");
const REACT_START = parseDate("2017-02-01");

export const HTML_YEAR_EXPERTISE = getYearsBetweenDates(HTML_START);
export const REACT_YEAR_EXPERTISE = getYearsBetweenDates(REACT_START);
