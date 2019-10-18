const User = require('../models/user');
const { redisClient} = require('./redis');

const auth = async (req, res, next) => {
	try {
		const token = req.header('Authorization').replace('Bearer ', '');

		let id = await redisClient.getValue(token);

		if (!id) throw new Error();

		user = await User.findOne({ _id: id });
		req.user = user;

		next();
	} catch (e) {
		res.status(401).send('Authentication failed');
	}
};

module.exports = auth;

// 5da83fc402144f0a3a58029f