const isDateCorrect = (str) => {
    let arr = str.split('-');
    const year = arr[0];
    const month = arr[1]-1;
    const day = +arr[2];
    let date = new Date(year, month, day);

    return date.getFullYear() === +year && date.getMonth() === +month && date.getDate() === +day;
}

module.exports = {
    isDateCorrect
}