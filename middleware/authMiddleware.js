const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Role = require("../models/role.model");

const authenticateUser = async (req, res, next) => {
  let token;

  try {
    req.cookies;
    if (req.cookies?.jwt) {
      // Get token from header
      token = req.cookies?.jwt;

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token
      let isUser = await User.findOne({ _id: decoded.id });
      if (!isUser) {
        throw "Not authorized";
      }
      req.isUser = isUser;
    } else {
      throw "Not authorized !";
    }
    next();
  } catch (error) {
    console.log("🚀 ~ error:", error);
    res.status(400).json(error);
  }
};

const authenticateAuctioner = async (req, res, next) => {
  try {
    const auctionerRole = await Role.findOne({ role: "auctioner" });
    if (req.isUser && req.isUser.role.equals(auctionerRole._id)) {
      next();
    } else {
      res.status(401);
      throw "Auctioner authorization required !";
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { authenticateUser, authenticateAuctioner };
