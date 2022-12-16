const { StatusCodes } = require("http-status-codes");

const UserModel = require("../model/users-schema");
const { BadRequestError, NotFoundError, CustomApiError, UnauthenticatedError } = require("../errors/index");

exports.getUsers = async (req, res, next) => {
  let users = await UserModel.find({}).select("-password");

  if (!users) throw new NotFoundError("Currently there are no users");

  users = users.map((user) => user.toObject({ getters: true }));

  res.status(StatusCodes.OK).json({ users });
};

exports.userSignup = async (req, res, next) => {
  // modifying the image file
  req.body.image = req.file.path;
  const user = await UserModel.create(req.body);
  if (!user) throw Error();

  res.status(StatusCodes.CREATED).json({ user: { name: user.name, id: user._id } });
};

exports.userLogin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) throw new BadRequestError("Please provide email and password");

  const user = await UserModel.findOne({ email });

  if (!user) throw new UnauthenticatedError("Invalid Credentials");

  res.status(StatusCodes.OK).json({ user: { name: user.name, id: user._id } });
};
