const router = require('express').Router();
const usersController = require('../controllers/usersController');
const exerciseController = require('../controllers/exerciseController');
const logsController = require('../controllers/logsController');

router.get('/api/users', usersController.getAllUsers);
router.post('/api/users', usersController.createUser);
router.post('/api/users/:_id/exercises', exerciseController.createUserExercises);
router.get('/api/users/:_id/logs', logsController.getUserLogs);

module.exports = router;