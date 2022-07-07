const express = require('express');

// Controller
const {
    getAllActiveUsers,
	createUser,
	login,
	updateUser,
	deleteUser
} = require('../controllers/user.controller');

// Middleware
const {
    createUserValidators
} = require('../middlewares/validator.middleware');
const { userExist } = require('../middlewares/user.middleware');
const {
    protectSession,
    protectUserAccount
} = require('../middlewares/auth.middleware')

const userRouter = express.Router();

userRouter.post('/', createUserValidators, createUser);

userRouter.post('/login', login);

userRouter.use(protectSession);

userRouter.get('/', getAllActiveUsers);

userRouter
    .use('/:id', userExist).use(protectUserAccount)
    .route('/:id')
    .patch(updateUser)
    .delete(deleteUser)

module.exports = { userRouter };