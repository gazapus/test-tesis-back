const { authJwt } = require("../middleware");
var router = require('express').Router();
var answerController = require('../controllers/answer');

router.get('/', [authJwt.verifyToken], answerController.find_all);
router.get('/get/:id', [authJwt.verifyToken], answerController.find_one);
router.post('/create', answerController.create);
router.delete('/delete/:id', [authJwt.verifyToken],  answerController.delete);
router.delete('/delete', [authJwt.verifyToken], answerController.delete_all);

module.exports = router;