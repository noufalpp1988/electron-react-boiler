const jwt = require('jsonwebtoken');
const { UserModel } = require('../models/model');

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  // pass the secret key as env var
  return jwt.sign({ id }, 'test secret key', {
    expiresIn: maxAge,
  });
};

const handleErrors = (err) => {
  const errors = { email: '', password: '' };

  if (err.message === 'Incorrect Email')
    errors.email = 'This Email is not registered';
  if (err.message === 'Incorrect Password')
    errors.email = 'This Password is not Correct';
  if (err.code === 11000) {
    errors.email = 'Email is already registered!';
    return errors;
  }
  if (err.message.includes('Users validation failed')) {
    Object.values(err.errors).forEach((prop) => {
      errors[prop.path] = prop.message;
    });
  }
  return errors;
};

module.exports.register = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.create({ email, password });
    const token = createToken(user._id);

    res.cookie('jwt', token, {
      withCredentials: true,
      httpOnly: false,
      maxAge: maxAge * 1000,
    });

    res.status(201).json({
      user: user._id,
      created: true,
    });
    next();
  } catch (error) {
    console.error('schema error:', error);
    const errors = handleErrors(error);
    res.json({ errors, created: false });
  }
};
module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.login(email, password);
    const token = createToken(user._id);

    res.cookie('jwt', token, {
      withCredentials: true,
      httpOnly: false,
      maxAge: maxAge * 1000,
    });

    res.status(200).json({
      user: user._id,
      created: true,
    });
    next();
  } catch (error) {
    console.error('schema error:', error);
    const errors = handleErrors(error);
    res.json({ errors, created: false });
  }
};
