const express = require("express");
const router = express.Router();

const {
  login,
  activateAccount,
  resentActivationToken,
} = require("../controllers/studentsController");

// router.get("/", student);
router.post("/login", login);
router.put("/activate-account", activateAccount);
router.put("/resent-activation-token", resentActivationToken);

module.exports = router;
