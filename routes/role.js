const express = require("express");
const router = express.Router();

const { authenticateUser } = require("../middleware/authMiddleware");
router.post("/add", require("../controllers/Role/add").process);
router.get("/get", require("../controllers/Role/get").process);

// router.put("/update/:id", require("../controllers/Role/update").process);
// router.delete("/delete/:id", require("../controllers/Role/delete").process);

module.exports = router;
