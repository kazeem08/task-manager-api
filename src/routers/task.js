const express = require('express');
const router = new express.Router();
const Task = require('../models/task');
const auth = require('../middleware/auth');
const redis = require('redis');
const util = require('util');

// const redisUrl = "redis://127.0.0.1/6379";
// const client =  redis.createClient(redisUrl);

// client.get = util.promisify(client.get);

router.get('/tasks', auth, async (req, res) => {
	try {
		const tasks = await Task.find({ owner: req.user._id });
		// const match = {};
		// const sort = {};
		// const sortBy = parts[0];

		// if (req.query.completed) {
		// 	match.completed = req.query.completed === 'true';
		// }

		// if (req.query.sortBy) {
		// 	const parts = req.query.sortBy.split(':');
		// 	sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
		// }

		// await req.user
		// 	.populate({
		// 		path: 'tasks',
		// 		match,
		// 		options: {
		// 			limit: parseInt(req.query.limit),
		// 			skip: parseInt(req.query.skip)
		// 		},
		// 		sort
		// 	})
		// 	.execPopulate();
		if(!tasks) return res.status(400).send('No task available')
		// res.status(200).send(req.user.tasks);
		res.status(200).send(tasks);

	} catch (e) {
		res.status(500).send();
	}
});

router.get('/tasks/:id', auth, async (req, res) => {
	const _id = req.params.id;

	try {
		const task = await Task.findOne({ _id, owner: req.user._id });
		if (!task) return res.status(404).send();
		res.send(task);
	} catch (e) {
		res.status(500).send();
	}
});

router.post('/tasks', auth, async (req, res) => {
	const task = new Task({
		...req.body,
		owner: req.user._id
	});

	try {
		await task.save();
		res.status(201).send(task);
	} catch (e) {
		res.status(400).send(e);
	}
});

router.patch('/tasks/:id', auth, async (req, res) => {
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
});

router.delete('/tasks/:id', auth, async (req, res) => {
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
});

module.exports = router;
