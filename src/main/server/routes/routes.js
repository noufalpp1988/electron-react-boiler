const router = require('express').Router();
const controller = require('../controllers/controller');

router.post('/', controller.createTask).get('/', controller.getTasks);
module.exports = router;
