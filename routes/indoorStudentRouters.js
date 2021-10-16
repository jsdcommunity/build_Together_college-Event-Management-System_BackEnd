const express = require("express");
const router = express.Router();

const {
  indoorStudent,
  signup,
} = require("../controllers/indoorStudentControllers");

router.get("/", indoorStudent);
router.post("/signup", signup);

module.exports = router;
