const express = require('express');
const auth = require('../lib/auth');
const router = new express.Router();
const userController = require('../controllers/user')


router.get('/users/me', auth, userController.getProfile);

router.post('/users', userController.createUser);

router.post('/users/login', userController.login);

router.post('/users/logout', userController.logout);

router.patch('/users/me', auth, userController.updateUser);

router.delete('/users/me', auth, userController.deleteUser);


module.exports = router;
