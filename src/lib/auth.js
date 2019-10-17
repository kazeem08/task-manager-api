const User = require('../models/user');
const { client } = require('./redis');
const { promisify } = require('util')
const getAsync = promisify(client.get).bind(client);

const auth = async (req, res, next) => {
	try {
		const token = req.header('Authorization').replace('Bearer ', '');

		let id = await getAsync(token);
		if (!id) throw new Error();

		if (id) {
			user = await User.findOne({
				_id: id,
				'tokens.token': token
			});
			req.user = user;
		}

		// req.token = token; //This will be used in logout route
		next();
	} catch (e) {
		res.status(401).send('Authentication failed');
	}
};

module.exports = auth;
