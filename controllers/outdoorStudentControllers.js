const outdoorStudentHelper = require("../helpers/outdoorStudentHelper");
const studentHelper = require("../helpers/studentHelper");

module.exports = {
  outdoorStudent: (req, res, next) => {
    res.status(200).json({
      success: true,
      error: 0,
      errormsg: "",
      data: "Hii I'm Outdoor Student's Route",
    });
  },
  signup: (req, res, next) => {
    req.body.role = "Outdoor Student";
    studentHelper
      .signup(req.body)
      .then((result) => {
        res.status(200).json({
          success: true,
          data: result,
        });
      })
      .catch((err) => {
        // return next(new ErrorResponse(err.message, 400));
        res.status(400).json({
          success: false,
          errorMsg: err.message,
        });
      });
  },
};
