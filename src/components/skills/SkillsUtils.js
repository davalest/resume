import moment from "moment";

const getYears = (start) => {
    const end = moment(new Date());
    let duration = moment.duration(end.diff(start));
    let years = duration.asYears();
    return Math.round(years)
}

const HTML_START = moment("2016-05-01", 'YYYY-MM-DD');
const REACT_START = moment("2017-02-01", 'YYYY-MM-DD');

export const HTML_EXPERTISE = getYears(HTML_START);
export const REACT_EXPERTISE = getYears(REACT_START);
