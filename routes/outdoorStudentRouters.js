const express = require("express");
const router = express.Router();

const {
  outdoorStudent,
  signup
} = require("../controllers/outdoorStudentControllers");

router.get("/", outdoorStudent);
router.post("/signup", signup);

module.exports = router;
