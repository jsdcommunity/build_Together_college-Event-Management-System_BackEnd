module.exports.sayHi = (req, res, next) => {
  res.status(200).json({
    success: true,
    error: 0,
    errormsg: "",
    data: "Let's Build Together",
  });
};
