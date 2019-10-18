const User = require('../models/user');
const { redisClient } = require('../lib/redis');
const sendmail = require('../lib/mail');

class UserController {
    constructor() { }

    async getProfile(req, res) {
        try {
            return res.send(req.user);

        } catch (e) {
            console.log('error', e)
        }
    }

    async createUser(req, res) {
        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send('user already exist');

        user = new User(req.body);

        try {
            await user.save();
            sendmail(user.email, user.name);
            res.status(201).send(user);
        } catch (e) {
            res.status(400).send(e);
        }
    }

    async login(req, res) {
        try {
            const user = await User.findByCredentials(
                req.body.email,
                req.body.password
            );

            const token = await user.generateAuthToken();
            await redisClient.setValue(token, user['_id'].toString());

            res.send({ user, token });
            
        } catch (e) {
            res.status(400).send();
        }
    }

    async logout(req, res) {
        try {
            const token = req.header('Authorization').replace('Bearer ', '');
            let status = redisClient.getValue(token);

            if (status) {
                redisClient.delValue(token)
                return res.send("Logged out");
            }

            return res.send("You are not logged in");

        } catch (err) {
            res.status(500).send('server error');
        }
    }

    async updateUser(req, res) {
        const updates = Object.keys(req.body);
        const allowedUpdates = ['name', 'email', 'password', 'age'];
        const isValidOperation = updates.every(update =>
            allowedUpdates.includes(update)
        );

        if (!isValidOperation) return res.status(400).send('Invalidate Updates');

        try {
            updates.forEach(update => (req.user[update] = req.body[update]));
            await req.user.save();

            res.status(200).send(req.user);
        } catch (e) {
            res.status(400).send(e);
        }
    }

    async deleteUser(req, res){
        try {
            await req.user.remove();
            // cancelEmail(req.user.email, req.user.name);
            res.status(200).send(req.user);
        } catch (e) {
            res.status(500).send(e);
        }
    }

}

const userController = new UserController();

module.exports = userController;