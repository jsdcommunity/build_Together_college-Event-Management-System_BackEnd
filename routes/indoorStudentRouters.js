const express = require("express");
const router = express.Router();

const { indoorStudent } = require("../controllers/indoorStudentControllers");

router.get("/", indoorStudent);

module.exports = router;
