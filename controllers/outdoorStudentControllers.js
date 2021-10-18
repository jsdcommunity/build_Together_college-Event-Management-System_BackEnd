module.exports = {
  outdoorStudent: (req, res, next) => {
    res.status(200).json({
      success: true,
      error: 0,
      errormsg: "",
      data: "Hii I'm Outdoor Student's Route",
    });
  },
};