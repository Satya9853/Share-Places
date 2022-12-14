const { StatusCodes } = require("http-status-codes");

const UserModel = require("../model/users-schema");
const { BadRequestError, NotFoundError, CustomApiError } = require("../errors/index");

exports.getUsers = async (req, res, next) => {
  const users = await UserModel.find({}).select("-password");

  if (!users) throw new NotFoundError("Currently there are no users");

  users = users.map((user) => user.toObject({ getters: true }));

  res.status(StatusCodes.OK).json({ users });
};

exports.userSignup = async (req, res, next) => {};
exports.userLogin = async (req, res, next) => {
  res.status(200).json({ message: "Working" });
};
