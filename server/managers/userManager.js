const myDB = require('../database/db');

const addUser = async (user) => {
    const query = `INSERT INTO Users (username) VALUES (?)`;

    try {
        const { lastID } = await myDB.run(query, [user]);
        return await myDB.all('SELECT * FROM Users WHERE _id = ?', [lastID]);
    } catch (err) {
        throw new Error('error in add user')
    }
}

const getUsers = async () => {
    const query = 'SELECT * FROM Users';
    return await myDB.all(query);
}

const getUserById = async (id) => {
    return await myDB.get('SELECT * FROM Users WHERE _id = ?', id);
}

module.exports = {
    addUser,
    getUsers,
    getUserById
}