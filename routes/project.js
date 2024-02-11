const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authenticateAuctioner,
} = require("../middleware/authMiddleware");
router.post("/add", require("../controllers/Projects/add").process);

router.put(
  "/update/:id",
  authenticateUser,
  authenticateAuctioner,
  require("../controllers/Projects/update").process
);

router.put(
  "/auction/:id",
  authenticateUser,
  authenticateAuctioner,
  require("../controllers/Projects/auctionProject").process
);
module.exports = router;
