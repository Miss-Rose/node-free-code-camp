const { getUserById } = require('../managers/userManager');
const { isDateCorrect } = require('../helpers/checkDate');
const { getUserExercises } = require('../managers/exerciseManager');

const getUserLogs = async (req, res) => {
    try {
        const { _id } = req.params;
        const user = await getUserById(_id);

        if (!user) {
            throw new Error('User does not exist');
        }

        const { from, to, limit } = req.query;

        if ((from && !isDateCorrect(from)) || (to && !isDateCorrect(to))) {
            throw new Error('Date format is not valid');
        }

        user.exercises = await getUserExercises(_id, from, to, limit);
        user.count = user.exercises.length;

        res.json(user);
    } catch(err) {
        res.status(400).send({status: 400, message: err.message});
    }
}

module.exports = {
    getUserLogs,
}