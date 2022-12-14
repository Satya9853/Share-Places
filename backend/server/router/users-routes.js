const { getUsers, userSignup, userLogin } = require("../controller/users-controller");

const Route = require("express").Router();

Route.route("/").get(getUsers);
Route.route("/signup").post(userSignup);
Route.route("/login").post(userLogin);

module.exports = Route;
