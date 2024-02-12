const Bet = require("../../models/bet.model");
const User = require("../../models/user.model");
const Project = require("../../models/project.model");
// const validate = require("../../lib/validate");
// const addProductSchema = require("../../jsonSchema/Product/add");
const RESPONSE_MESSAGE = require("../../lib/responseCode");
const asyncHandler = require("../../middleware/asyncHandler");
const { apiError } = require("../../lib/apiError");

class addBet {
  async userExists(userId) {
    try {
      console.log("🚀 ~ userId:", userId);
      const userExists = await User.find({ _id: userId });
      if (!userExists) throw new apiError(400, "User doesn't exists!");
      return userExists;
    } catch (error) {
      throw error;
    }
  }
  async projectExists(projectId) {
    try {
      const projectExists = await Project.findOne({ _id: projectId });
      if (!projectExists) throw new apiError(400, "Project does not exists!");
      return projectExists;
    } catch (error) {
      throw error;
    }
  }

  async projectActive(projectId) {
    try {
      const projectActive = await Project.findOne({ _id: projectId }).select(
        "isActive -_id"
      );
      if (!projectActive.isActive)
        throw new apiError(400, "Project is not active!");
      return projectActive;
    } catch (error) {
      throw error;
    }
  }

  async projectAlreadyAuctioned(projectId) {
    const projectAlreadyAuctioned = await Project.findOne({_id: projectId}).select("winner -_id");
    if(projectAlreadyAuctioned.winner) throw new apiError(400, "Project already auctioned!");
    return null
}
  process = asyncHandler(async (req, res) => {
    // validate(req.body, addProductSchema);

    const { userId, projectId, betAmt } = req.body;

    await this.userExists(userId);
    await this.projectExists(projectId);
    await this.projectActive(projectId);
    await this.projectAlreadyAuctioned(projectId);

    const newBet = await Bet.create({
      userId: userId,
      projectId: projectId,
      betAmt: betAmt,
    });
    if (!newBet) throw new apiError(500, "Project not added !");

    res.status(200).send({
      type: RESPONSE_MESSAGE.SUCCESS,
      data: newBet,
    });
  });
}

module.exports = new addBet();
