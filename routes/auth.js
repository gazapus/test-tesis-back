const { authJwt } = require("../middleware");
const controller = require("../controllers/authController");
var router = require('express').Router();

router.post("/signup", controller.signup);
router.post("/signin", controller.signin);
router.get("/check", [authJwt.verifyToken], controller.authorizedAccess);

module.exports = router;