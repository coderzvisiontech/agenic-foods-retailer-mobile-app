import moment from 'moment';

export const formatList = (list = []) => {
    return list.join(', ');
};

export const getDateData = () => {
    const data = [];

    for (let i = -1; i <= 3; i++) {
        const date = moment().add(i, 'days');
        data.push({
            day: date.format('ddd'), // 'Mon', 'Tue', etc.
            date: date.date(),       // just the day number like 26
            fullDate: date.format('YYYY-MM-DD'),
            disabled: i < 0 || i > 2 // Only Today, Tomorrow, and Day After are active
        });
    }

    return data;
};

export const getISTFullDate = (selectedDate) => {
    const now = new Date(); // current time
    const date = new Date(selectedDate);

    // Inject current time into selected date
    date.setHours(now.getHours());
    date.setMinutes(now.getMinutes());
    date.setSeconds(now.getSeconds());

    // This now has the selected date + current time
    return date.toString(); // Will output like "Thu Jun 26 2025 17:05:00 GMT+0530 (India Standard Time)"
};