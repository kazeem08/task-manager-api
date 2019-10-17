const mongoose = require('mongoose');
const config = require('../config/config')

const url = config.mongo;

mongoose
	.connect(url, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false
	})
	.then(() => console.log('connected to mongoDB...'));
