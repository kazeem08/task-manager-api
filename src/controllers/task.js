const Task = require('../models/task')

class TaskController {
    constructor() { }

    async createTask(req, res) {

        try {
            const task = new Task({ ...req.body, owner: req.user._id });
            await task.save();

            res.status(201).send(task);
        } catch (e) {
            res.status(400).send(e);
        }
    }
    async allTasks(req, res) {
        try {
            const tasks = await Task.find({ owner: req.user._id });

            const match = {};
            const sort = {};
            // const sortBy = parts[0];

            console.log(req.user)

            if (req.query.completed) {
                match.completed = req.query.completed === 'true';
            }

            if (req.query.sortBy) {
                const parts = req.query.sortBy.split(':');
                sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
            }

            await req.user
                .populate({
                    path: 'tasks',
                    match,
                    options: {
                        limit: parseInt(req.query.limit),
                        skip: parseInt(req.query.skip)
                    },
                    sort
                })
                .execPopulate();
            if (!tasks) return res.status(400).send('No task available')
            res.status(200).send(tasks);

        } catch (e) {
            res.status(500).send();
        }
    }

    async taskById(req, res) {
        const _id = req.params.id;
        console.log(req.user._id)

        try {
            const task = await Task.findOne({ _id, owner: req.user._id });
            if (!task) return res.status(404).send();
            res.send(task);
        } catch (e) {
            res.status(500).send();
        }
    }

    async updateTask(req, res) {
        const updates = Object.keys(req.body);
        const allowedUpdates = ['description', 'completed'];
        const isValidOperation = updates.every(update =>
            allowedUpdates.includes(update)
        );

        if (!isValidOperation) return res.status(400).send('Invalidate Updates');

        try {
            const task = await Task.findOne({
                _id: req.params.id,
                owner: req.user._id
            });
            updates.forEach(update => (task[update] = req.body[update]));
            await task.save();

            if (!task) return res.sendStatus(404).send();

            res.status(200).send(task);
        } catch (e) {
            res.status(400).send();
        }
    }

    async removeTask(req, res) {
        try {
            const task = await Task.findOneAndDelete({
                _id: req.params.id,
                owner: req.user._id
            });
            if (!task) return res.status(404).send();
            res.status(200).send(task);
        } catch (e) {
            res.status(500).send(e);
        }
    }
}

const taskController = new TaskController();

module.exports = taskController;