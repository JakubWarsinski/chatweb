
const date = new Date();

exports.getCurrentFullDatetime = () => {
    return date.toISOString().replace('T', ' ').substring(0, 19);
}

exports.getCurrentDate = () => {
    return date.toISOString().substring(0, 10);
}

exports.getCurrentDay = () => {
    return date.getDate();
}

exports.getCurrentMonth = () => {
    return date.getMonth() + 1;
}

exports.getCurrentYear = () => {
    return date.getFullYear();
}

exports.getCurrentHour = () => {
    return date.getHours();
}