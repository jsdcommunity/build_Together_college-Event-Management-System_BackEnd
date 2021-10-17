const outdoorStudentHelper = require("../helpers/outdoorStudentHelper");
const studentHelper = require("../helpers/studentHelper");
const ErrorResponse = require("../classes/errorResponse");

/**
 * Signup for Student with some credential
 * @method POST
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const signup = (req, res, next) => {
  req.body.role = "Outdoor Student";
  studentHelper
    .signup(req.body)
    .then((result) => {
      res.status(201).json({
        success: true,
        data: result,
      });
    })
    .catch((err) => {
      return next(new ErrorResponse(err.message, 400));
    });
};

module.exports = { signup };
