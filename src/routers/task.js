const express = require('express');
const router = new express.Router();
const auth = require('../lib/auth');
const taskController = require('../controllers/task')


router.get('/tasks', auth, taskController.allTasks);

router.get('/tasks/:id', auth, taskController.taskById);

router.post('/tasks', auth, taskController.createTask);

router.patch('/tasks/:id', auth, taskController.updateTask);

router.delete('/tasks/:id', auth, taskController.removeTask);

module.exports = router;
