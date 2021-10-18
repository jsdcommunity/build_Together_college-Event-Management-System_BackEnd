module.exports = {
  indoorStudent: (req, res, next) => {
    res.status(200).json({
      success: true,
      error: 0,
      errormsg: "",
      data: "Hii I'm Indoor Student's Route",
    });
  },
};