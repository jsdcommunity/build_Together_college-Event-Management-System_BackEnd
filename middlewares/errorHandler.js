const ErrorResponse = require("../classes/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;
  error.statusCode = err.statusCode;
  error.code = err.code;

  if (err.code === 11000) {
    const message = "Duplicate Field Value Enter";
    error = new ErrorResponse(message, 400);
  }

  if (err.code === "EAI_AGAIN" || err.code === "ENOTFOUND") {
    const message = "Check your internet properly";
    error = new ErrorResponse(message, 400);
  }

  if (err.code === "TokenExpiredError") {
    const message = "Your link expired";
    error = new ErrorResponse(message, 400);
  }

  if (err.code === "JsonWebTokenError") {
    const message = "Invalid Link";
    error = new ErrorResponse(message, 400);
  }

  if (err.name === "ValidationError") {
    const message = "ValidationError";
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Internal Server Error",
  });
};

module.exports = errorHandler;