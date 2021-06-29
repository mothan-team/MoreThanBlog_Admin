import moment from 'moment';

export const getTimeFormat = (time) => {
    return time ? moment(time).calendar() : '';
};