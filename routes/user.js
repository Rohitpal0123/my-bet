const express = require("express");
const router = express.Router();

router.post(
  "/signup",
  require("../controllers/UserVerification/userVerification").process
);

router.post("/submitOtp/", require("../controllers/User/signup").process);

router.post("/login", require("../controllers/User/login").process);
module.exports = router;
