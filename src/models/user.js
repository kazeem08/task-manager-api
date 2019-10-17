const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('./task');

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true
		},
		email: {
			type: String,
			required: true,
			trim: true,
			unique: true,
			lowercase: true,
			validate(value) {
				if (!validator.isEmail(value)) {
					throw new Error('Invalid email');
				}
			}
		},
		password: {
			type: String,
			required: true,
			trim: true,
			minlength: 6,
			validate(value) {
				if (value.toLowerCase().includes('password')) {
					throw new Error('Password cannot contain password');
				}
			}
		},
		age: {
			type: Number,
			default: 0
		},
		tokens: [
			{
				token: {
					type: String,
					required: true
				}
			}
		],
		avatar: {
			type: Buffer
		}
	},
	{ timestamps: true }
);

userSchema.virtual('tasks', {
	ref: 'Task',
	localField: '_id',
	foreignField: 'owner'
});

userSchema.methods.toJSON = function() {
	const user = this;
	const userObject = user.toObject();

	delete userObject.password;
	delete userObject.tokens;
	delete userObject.avatar;

	return userObject;
};

userSchema.methods.generateAuthToken = async function() {
	const user = this;
	const token = await jwt.sign(
		{ _id: user._id.toString() },
		process.env.JWT_SECRET_KEY
	);
	// user.tokens = user.tokens.concat({ token });
	// await user.save();
	return token;
};

userSchema.statics.findByCredentials = async function(email, password) {
	const user = await User.findOne({ email });
	if (!user) throw new Error('Unable to login');

	const isValidPassword = await bcrypt.compare(password, user.password);
	if (!isValidPassword) throw new Error('Unable to login');

	return user;
};

//hash password before user is saved
userSchema.pre('save', async function(next) {
	const user = this;
	if (user.isModified('password')) {
		user.password = await bcrypt.hash(user.password, 8);
	}
	next();
});

//Delete user tasks when user is removed
userSchema.pre('remove', async function(next) {
	const user = this;
	await Task.deleteMany({ owner: user._id });
	next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
