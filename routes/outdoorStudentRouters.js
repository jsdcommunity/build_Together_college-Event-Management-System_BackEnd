const express = require("express");
const router = express.Router();

const { outdoorStudent } = require("../controllers/outdoorStudentControllers");

router.route("/").post(outdoorStudent);

module.exports = router;
