const express = require("express");
const router = express.Router();

const { authenticateUser } = require("../middleware/authMiddleware.js");

router.get("/getWinner", require("../controllers/Bet/getWinner.js").process);
router.post("/add", require("../controllers/Bet/add.js").process);

module.exports = router;
