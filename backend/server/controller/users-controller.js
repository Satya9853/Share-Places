const userModel = require("../model/users-schema");

exports.getUsers = async (req, res, next) => {
  res.status(200).json({ message: "Working" });
};
exports.userSignup = async (req, res, next) => {
  res.status(200).json({ message: "Working" });
};
exports.userLogin = async (req, res, next) => {
  res.status(200).json({ message: "Working" });
};
