const { getUserById } = require('../managers/userManager');
const { createExercise } = require('../managers/exerciseManager');

const createUserExercises = async (req, res) => {
    try {
        const { _id } = req.params;
        const user = await getUserById(_id);

        if (!user) {
            throw new Error('User does not exist');
        }

        const result = await createExercise(_id, req.body);
        res.status(200).send(result);
    } catch(err) {
        res.status(400).send({status: 400, message: err.message});
    }
}

module.exports = {
    createUserExercises,
}