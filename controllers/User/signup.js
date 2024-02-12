const UserVerification = require("../../models/userVerification.model");
const User = require("../../models/user.model");
const generateToken = require("../../lib/generateToken");
// const createDBLog = require("../../lib/createDBLog");
// const axios = require("axios");

class signup {
  process = async (req, res) => {
    try {
      const { email, otp } = req.body;
      console.log("🚀 ~ otp:", otp);
      console.log("🚀 ~ email:", email);

      const userVerification = await UserVerification.findOne({
        email: email,
      });
      console.log("🚀 ~ userVerification:", userVerification);

      if (otp != userVerification.otp && email != userVerification.email) {
        throw "Invalid OTP or Email!";
      }
      const newUser = await User.create({
        firstName: userVerification.firstName,
        lastName: userVerification.lastName,
        userName: userVerification.userName,
        email: userVerification.email,
        password: userVerification.password,
        role: userVerification.role,
      });
      if (!newUser) throw "User not signedup !";

      const deletedUser = await UserVerification.deleteOne({
        _id: userVerification._id,
      });
      if (!deletedUser)
        throw "User not deleted from User Verification collection !";

      // const dbLogger = await createDBLog();
      // dbLogger.info(`Login attempt by ${newUser.userName}`, {
      //   details: {
      //     email: newUser.email,
      //     role: newUser.role,
      //     userName: newUser.userName,
      //     requestMethod: req.method,
      //     requestURL: req.url,
      //     requestIP: req.ip,
      //     requestHostname: req.hostname,
      //     requestHTTPVersion: req.httpVersion,
      //     clientDetails: req.rawHeaders,
      //   },
      // });

      const token = generateToken(newUser._id, newUser.role);
      const options = {
        httpOnly: true,
        secure: true,
      };
      res.status(200).cookie("jwt", token, options).json({
        _id: newUser._id,
        email: newUser.email,
        role: newUser.role,
      });
    } catch (error) {
      console.log("🚀 ~ signup ~ process= ~ error:", error);
      res.status(400).json(error);
    }
  };
}

module.exports = new signup();
