const router = require('express').Router();
const controller = require('./controller');

router.post('/', controller.createTask).get('/', controller.getTasks);
module.exports = router;
