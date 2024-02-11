const express = require("express");
const router = express.Router();

const { authenticateUser } = require("../middleware/authMiddleware.js");

router.post(
  "/add",
  authenticateUser,
  require("../controllers/Bet/add.js").process
);

module.exports = router;
