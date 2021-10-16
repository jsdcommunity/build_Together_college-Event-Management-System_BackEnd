const studentHelper = require("../helpers/studentHelper");
const ErrorResponse = require("../classes/errorResponse");

const NODE_ENV = process.env.NODE_ENV || "development";
const ACCESS_TOKEN_EXPIRE = process.env.ACCESS_TOKEN_EXPIRE || 86400000; // 1 day

module.exports = {
  student: (req, res, next) => {
    res.status(200).send("Hii I'm Student's Route");
  },
  /**
   * Login for Student with some credential
   * @method POST
   * @param {*} req 
   * @param {*} res 
   * @param {*} next 
   */ 
  login: (req, res, next) => {
    const { email, password } = req.body;
    studentHelper
      .login(email, password)
      .then((result) => {
        res.cookie("AccessToken", result.token, {
          httpOnly: true,
          secure: NODE_ENV === "production" ? true : false,
          expires: new Date(
            new Date().getTime() + parseInt(ACCESS_TOKEN_EXPIRE)
          ),
          sameSite: "strict",
        });
        res.cookie("AccessSession", true, {
          httpOnly: true,
          expires: new Date(
            new Date().getTime() + parseInt(ACCESS_TOKEN_EXPIRE)
          ),
        });
        res.status(200).json({
          success: true,
          data: result,
        });
      })
      .catch((err) => {
        return next(new ErrorResponse(err.message, 403));
      });
  },
};
