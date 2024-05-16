const AuthRouter = require('express').Router();
const { checkUser } = require('../middlewares/AuthMiddleware');

const { register, login } = require('../controllers/AuthControllers');

AuthRouter.post('/', checkUser);
AuthRouter.post('/register', register);
AuthRouter.post('/login', login);

module.exports = AuthRouter;
