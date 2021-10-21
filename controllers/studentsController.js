const studentHelper = require("../helpers/studentHelper");
const ErrorResponse = require("../classes/errorResponse");
const config = require("../config/default");

const { NODE_ENV, ACCESS_TOKEN_EXPIRE } = config.SERVER;

/**
 * Login for Student with some credential
 * @method POST
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const login = (req, res, next) => {
  const { email, password } = req.body;
  studentHelper
    .login(email, password)
    .then((result) => {
      res.cookie("AccessToken", result.token, {
        httpOnly: true,
        secure: NODE_ENV === "production" ? true : false,
        expires: new Date(new Date().getTime() + parseInt(ACCESS_TOKEN_EXPIRE)),
        sameSite: "strict",
      });
      res.cookie("AccessSession", true, {
        httpOnly: true,
        expires: new Date(new Date().getTime() + parseInt(ACCESS_TOKEN_EXPIRE)),
      });
      res.status(200).json({
        success: true,
        data: result,
      });
    })
    .catch((err) => {
      return next(
        new ErrorResponse(err.message, err.statusCode || 400, err.code)
      );
    });
};

/**
 * Signup for Student with some credential
 * @method POST
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const signup = (req, res, next) => {
  studentHelper
    .signup(req.body)
    .then((result) => {
      res.status(201).json({
        success: true,
        data: result,
      });
    })
    .catch((err) => {
      return next(
        new ErrorResponse(err.message, err.statusCode || 400, err.code)
      );
    });
};

/**
 * Activation token
 * @method PATCH
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const activateAccount = (req, res, next) => {
  const { token, password } = req.body;
  studentHelper
    .activateAccount(token, password)
    .then((result) => {
      res.status(200).json({
        success: true,
        data: result,
      });
    })
    .catch((err) => {
      return next(
        new ErrorResponse(err.message, err.statusCode || 400, err.code)
      );
    });
};

/**
 * Forget password for Student
 * @method PATCH
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const forgetPassword = (req, res, next) => {
  studentHelper
    .forgetPassword(req.body.email)
    .then((result) => {
      res.status(200).json({
        success: true,
        data: result,
      });
    })
    .catch((err) => {
      return next(
        new ErrorResponse(err.message, err.statusCode || 400, err.code)
      );
    });
};

/**
 * Reset password for student
 * @method PATCH
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const resetPassword = (req, res, next) => {
  const { token, password } = req.body;
  studentHelper
    .resetPassword(token, password)
    .then((result) => {
      res.status(200).json({
        success: true,
        data: result,
      });
    })
    .catch((err) => {
      return next(
        new ErrorResponse(err.message, err.statusCode || 400, err.code)
      );
    });
};

/**
 * Logout for student
 * @method GET
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const logout = (req, res, next) => {
  try {
    res.clearCookie("AccessToken");
    res.clearCookie("AccessSession");
    res.status(200).json({
      success: true,
      message: "Logout succesfully",
    });
  } catch (err) {
    return next(
      new ErrorResponse(err.message, err.statusCode || 400, err.code)
    );
  }
};

module.exports = {
  login,
  signup,
  activateAccount,
  forgetPassword,
  resetPassword,
  logout,
};
