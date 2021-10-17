const express = require("express");
const router = express.Router();

const { signup } = require("../controllers/indoorStudentControllers");

router.post("/signup", signup);

module.exports = router;
