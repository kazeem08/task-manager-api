// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;

const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017'; //connect to the local host server
const database = 'task-manager';

// const id = new ObjectID();
// console.log(id);
// console.log(id.toHexString().length);
// console.log(id.id.length);

MongoClient.connect(
	connectionURL,
	{ useNewUrlParser: true },
	(error, client) => {
		if (error) {
			return console.log('unable to connect to database');
		}

		const db = client.db(database);

		// db.collection('users').insertOne(
		// 	{
		// 		name: 'kazeem',
		// 		age: 78
		// 	},
		// 	(error, result) => {
		// 		if (error) return console.log('Unable to insert document');

		// 		console.log(result.ops);
		// 	}
		// );

		// db.collection('tasks').insertMany(
		// 	[
		// 		{ description: 'first', completed: true },
		// 		{ description: 'second', completed: false },
		// 		{ description: 'third', completed: true }
		// 	],
		// 	(error, result) => {
		// 		if (error) return console.log('Unable to insert documents');
		// 		console.log(result.ops);
		// 	}
		// );

		//Querying the database

		// db.collection('users').findOne(
		// 	{ _id: new ObjectID('5cdb007d2279f6330a4c0855') },
		// 	(error, user) => {
		// 		if (error) return console.log('Unable to fetch data');
		// 		console.log(user);
		// 	}
		// );

		// db.collection('users')
		// 	.find({ age: 78 })
		// 	.toArray((error, users) => {
		// 		console.log(users);
		// 	});

		// db.collection('users')
		// 	.find({ age: 78 })
		// 	.count((error, count) => {
		// 		console.log(count);
		// 	});

		//updating the db
		// db.collection('users')
		// 	.updateOne(
		// 		{ _id: new ObjectID('5cdb007d2279f6330a4c0855') },
		// 		// { $set: { name: 'Ola' } }
		// 		{ $inc: { age: -1 } }
		// 	)
		// 	.then(result => {
		// 		console.log(result);
		// 	})
		// 	.catch(error => {
		// 		console.log(error);
		// 	});

		// db.collection('tasks')
		// 	.updateMany({ completed: false }, { $set: { completed: true } })
		// 	.then(result => {
		// 		console.log(result);
		// 	})
		// 	.catch(error => {
		// 		console.log(error);
		// 	});

		db.collection('tasks')
			.deleteMany({ completed: true })
			.then(result => {
				console.log(result);
			})
			.catch(error => console.log(error));
	}
);
