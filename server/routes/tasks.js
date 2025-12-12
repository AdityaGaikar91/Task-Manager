const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

// @route   GET api/tasks
// @desc    Get all users tasks
// @access  Private
router.get('/', authMiddleware, taskController.getTasks);

// @route   POST api/tasks
// @desc    Add new task
// @access  Private
router.post('/', authMiddleware, taskController.createTask);

// @route   PUT api/tasks/:id
// @desc    Update task
// @access  Private
router.put('/:id', authMiddleware, taskController.updateTask);

// @route   DELETE api/tasks/:id
// @desc    Delete task
// @access  Private
router.delete('/:id', authMiddleware, taskController.deleteTask);

module.exports = router;
