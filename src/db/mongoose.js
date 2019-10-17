const mongoose = require('mongoose');
const validator = require('validator');
const config = require('../config/config')

let url = config.mongo;

// if (process.env.NODE_ENV === 'development') {
// 	console.log('dev');
// 	url = process.env.LOCAL_DB;
// } else {
// 	url = process.env.MONGODB_URL;
// }

mongoose
	.connect(url, {
		useNewUrlParser: true,
		useCreateIndex: true,
		useFindAndModify: false
	})
	.then(() => console.log('connected to mongoDB...'));
