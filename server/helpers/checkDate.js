const isDateCorrect = (str) => {
    return str.match(/[1-9][0-9]{3}-[0-1][0-9]-[0-9][1-9]/);
}

module.exports = {
    isDateCorrect
}