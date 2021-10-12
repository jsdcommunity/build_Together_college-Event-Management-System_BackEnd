const express = require("express");
const router = express.Router();

const { organizer } = require("../controllers/organizerControllers");

router.get("/", organizer);

module.exports = router;
