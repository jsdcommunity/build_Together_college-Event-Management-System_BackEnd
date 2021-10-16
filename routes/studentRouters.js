const express = require("express");
const router = express.Router();

const { student, login } = require("../controllers/studentsController");

router.get("/", student);
router.post("/login", login);

module.exports = router;
