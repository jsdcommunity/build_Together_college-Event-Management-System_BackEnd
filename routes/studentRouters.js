const express = require("express");
const router = express.Router();

const {
  login,
  signup,
  activateAccount,
  forgetPassword,
  resetPassword,
  logout
} = require("../controllers/studentsController");

// router.get("/", student);
router.route("/login").post(login);
router.route("/signup").post(signup);
router.route("/activate-account").patch(activateAccount);
router.route("/forget-password").patch(forgetPassword);
router.route("/reset-password").patch(resetPassword);
router.route("/logout").get(logout);

module.exports = router;
