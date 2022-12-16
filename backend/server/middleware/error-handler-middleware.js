const { StatusCodes } = require("http-status-codes");
const fs = require("fs");

const errorHandlingMiddleware = (error, req, res, next) => {
  // rollback changes in file if we are encountering any error
  fs.unlink(req.file.path, (error) => {
    console.log(error);
  });

  let customError = {
    statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: error.message || "Something went wrong try again later",
  };

  return res.status(customError.statusCode).json({ message: customError.message });
};

module.exports = errorHandlingMiddleware;
