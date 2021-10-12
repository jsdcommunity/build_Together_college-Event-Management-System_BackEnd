const express = require("express");
const router = express.Router();

const { outdoorStudent } = require("../controllers/outdoorStudentControllers");

router.get("/", outdoorStudent);

module.exports = router;
