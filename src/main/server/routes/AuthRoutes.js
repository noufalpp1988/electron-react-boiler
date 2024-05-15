import { register, login } from '../controllers/AuthControllers';

const AuthRouter = require('express').Router();

// AuthRouter.post('/');
AuthRouter.post('/register', register);
AuthRouter.post('/login', login);

module.exports = AuthRouter;
