const sentMail  = require("../utils/sentMail");

module.exports = {
  admin: (req, res, next) => {
      res.status(200).json({
      success: true,
      error: 0,
      errormsg: "",
      data: "Hii I'm Admin's Route",
    });
  },
};
