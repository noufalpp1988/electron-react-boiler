import { register, login } from '../controllers/AuthControllers';
import { checkUser } from '../middlewares/AuthMiddleware';

const AuthRouter = require('express').Router();

AuthRouter.post('/', checkUser);
AuthRouter.post('/register', register);
AuthRouter.post('/login', login);

module.exports = AuthRouter;
