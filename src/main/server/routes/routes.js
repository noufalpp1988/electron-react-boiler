const router = require('express').Router();
const controller = require('../controllers/controller');

router.post('/task', controller.createTask).get('/task', controller.getTasks);
module.exports = router;
