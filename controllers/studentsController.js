const studentHelper = require("../helpers/studentHelper");

module.exports = {
  student: (req, res, next) => {
    res.status(200).send("Hii I'm Student's Route");
  },
  login: (req, res, next) => {
    const { email, password } = req.body;
    studentHelper
      .login(email, password)
      .then((result) => {
        res.status(201).json({
          success: true,
          data: result,
        });
      })
      .catch((err) => {
        // return next(new ErrorResponse(err.message, 403));
        res.status(400).json({
          success: false,
          errorMsg: err.message,
        });
      });
  },
};
