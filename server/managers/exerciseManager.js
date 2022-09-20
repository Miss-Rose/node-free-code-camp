const myDB = require('../database/db');
const { isDateCorrect } = require('../helpers/checkDate');

const createExercise = async (userID, exercise) => {
    const {description, duration, date} = exercise;

    if(!userID) {
        throw new Error('you have an empty id field');
    }

    if(!description) {
        throw new Error('you have an empty description field');
    }

    if(!duration || Number.isNaN(Number(exercise.duration))) {
        throw new Error('you have an incorrect duration field');
    }

    let statement;

    if (date) {
        if(!isDateCorrect(date)) {
            throw new Error('input correct date');
        } else {
            statement = await myDB.run('INSERT INTO Exercises (description, duration, date, userId) VALUES (?, ?, ?, ?)',
                [description, duration, date, userID]);
        }
    } else {
        const todayDate = new Date().toISOString().split('T')[0];
        statement= await myDB.run('INSERT INTO Exercises (description, duration, date, userId) VALUES (?, ?, ?, ?)',
            [description, duration, todayDate, userID]);
    }

    const { lastID } = statement;
    return await myDB.all('SELECT * FROM Exercises WHERE _id = ?', [lastID]);
}

const getUserExercises = async (userID, from, to, limit) => {

    let sql = 'SELECT duration, description, date FROM Exercises WHERE userId = ?';

    if (from && to) {
        sql += ` AND date >= ? AND date <= ?` + ' ORDER BY date ASC' + `${limit ? ' LIMIT ?' : ''}`;
        return await myDB.all(sql, [userID, from, to, limit]);
    }

    if (from && !to) {
        sql += ` AND date >= ?` + ' ORDER BY date ASC' + `${limit ? ' LIMIT ?' : ''}`;
        return await myDB.all(sql, [userID, from, limit]);
    }

    if (!from && to) {
        sql += ' AND date <= ?' + ' ORDER BY date ASC' + `${limit ? ' LIMIT ?' : ''}`;
        return await myDB.all(sql, [userID, to, limit]);
    }

    if (!from && !to) {
        sql += ' ORDER BY date ASC' + ` ${limit ? 'LIMIT ?' : ''}`;
        return await myDB.all(sql, [userID, limit]);
    }
}

const getExerciseByUserID = async (userID) => {
    return await myDB.all('SELECT * FROM Exercises WHERE userId = ?', [userID]);
}

module.exports = {
    createExercise,
    getUserExercises,
    getExerciseByUserID
}


