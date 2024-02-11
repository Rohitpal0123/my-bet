const User = require("../../models/user.model");
const bcrypt = require("bcryptjs");
// const validate = require("../../lib/validate");
const generateToken = require("../../lib/generateToken");
// const loginUserSchema = require("../../jsonSchema/User/login");
const RESPONSE_MESSAGE = require("../../lib/responseCode");
// const createDBLog = require("../../lib/createDBLog");
const Role = require("../../models/role.model");
const asyncHandler = require("../../middleware/asyncHandler");
const { apiError } = require("../../lib/apiError");
class loginUser {
  async userExists(email) {
    const userExists = await User.findOne({ email: email });
    if (userExists == null) throw new apiError(400, "User doesn't exists !");
    return userExists;
  }

  process = asyncHandler(async (req, res) => {
    // validate(req.body, loginUserSchema);

    const { email, password } = req.body;

    const user = await this.userExists(email);

    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) throw new apiError(400, "Invalid password !");

    //Find user role name
    const userRole = await Role.findById(user.role);

    //Log user to accessLog Database
    // const dbLogger = await createDBLog();
    // dbLogger.info(`Login attempt by ${userRole.role} - ${user.userName}!`, {
    //   details: {
    //     email: user.email,
    //     role: userRole.role,
    //     userName: user.userName,
    //     requestMethod: req.method,
    //     requestURL: req.url,
    //     requestIP: req.ip,
    //     requestHostname: req.hostname,
    //     requestHTTPVersion: req.httpVersion,
    //     clientDetails: req.rawHeaders,
    //   },
    // });

    const token = generateToken(user._id, user.role);
    const options = {
      httpOnly: true,
      secure: true,
    };
    res
      .status(200)
      .cookie("jwt", token, options)
      .send({
        type: RESPONSE_MESSAGE.SUCCESS,
        data: {
          id: user._id,
          email: user.email,
          role: user.role,
        },
      });
  });
}

module.exports = new loginUser();
