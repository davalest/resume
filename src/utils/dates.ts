const getYears = (start: Date): number => {
    const end = new Date();
    const duration = end.getTime() - start.getTime();
    const years = duration / (1000 * 60 * 60 * 24 * 365.25);
    return Math.round(years);
}

const parseDate = (dateString: string): Date => {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
}

const HTML_START = parseDate("2016-05-01");
const REACT_START = parseDate("2017-02-01");

export const HTML_EXPERTISE = getYears(HTML_START);
export const REACT_EXPERTISE = getYears(REACT_START);
