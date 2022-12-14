const { getUsers, userSignup, userLogin } = require("../controller/users-controller");

const router = require("express").Router();

router.route("/").get(getUsers);
router.route("/signup").post(userSignup);
router.route("/login").post(userLogin);

module.exports = router;
