const express = require("express");
const router = express.Router();

const { authenticateUser } = require("../middleware/authMiddleware.js");

router.post("/add", require("../controllers/Bet/add.js").process);

module.exports = router;
