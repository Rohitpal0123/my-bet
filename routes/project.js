const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authenticateAuctioner,
} = require("../middleware/authMiddleware");

router.get("/get", require("../controllers/Project/get").process);
router.post("/add", require("../controllers/Project/add").process);

router.put(
  "/update/:id",
  authenticateUser,
  authenticateAuctioner,
  require("../controllers/Project/update").process
);

router.put(
  "/auction/:id",
  authenticateUser,
  authenticateAuctioner,
  require("../controllers/Project/auctionProject").process
);
module.exports = router;
