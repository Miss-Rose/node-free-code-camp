const { getUsers, addUser } = require('../managers/userManager');

const getAllUsers = async (req, res) => {
    try {
        const users = await getUsers();
        return res.json(users);
    } catch (err) {
        res.status(400).send({status: 400, message: err.message});
    }
}

const createUser = async (req, res) => {
    const username = req?.body?.username;
    if (!username) {
        res.status(400).send({status: 400, message: 'User name is empty'});
        return;
    }
    try {
        const createdUser = await addUser(username);
        res.status(200).send(createdUser);
    } catch (err) {
        res.status(400).send({status: 400, message: err.message});
    }
}

module.exports = {
    getAllUsers, createUser,
}