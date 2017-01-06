var express = require('express');
var userRouter = express.Router();
var userController = require('../controllers/userController.js');

userRouter.post('/login', userController.login);
userRouter.post('/register', userController.register);

module.exports = userRouter;