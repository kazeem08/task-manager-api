const mongoose = require('mongoose');
const validator = require('validator');

const url = process.env.MONGODB_URL;

mongoose.connect(url, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false
});
