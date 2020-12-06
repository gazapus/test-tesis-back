var router = require('express').Router();
var questionController = require('../controllers/question');

router.get('/', questionController.find_all);

module.exports = router;