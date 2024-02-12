const Bet = require("../../models/bet.model");
const User = require("../../models/user.model");
const Project = require("../../models/project.model");
const RESPONSE_MESSAGE = require("../../lib/responseCode");
const asyncHandler = require("../../middleware/asyncHandler");
const { apiError } = require("../../lib/apiError");

class getWinner {
  async projectExists(projectId) {
    const projectExists = await Project.findOne({ _id: projectId });
    if (!projectExists) throw new apiError(400, "project does not exist!");
    return null;
  }

  async projectAuctioned(projectId) {
    const projectAuctioned = await Project.findOne({ _id: projectId }).select(
      "isActive winner -_id"
    );
    if (!projectAuctioned.isActive && !projectAuctioned.winner)
      throw new apiError(400, "Project is yet to be auctioned auction!");
    return null;
  }

  process = asyncHandler(async (req, res) => {
    const { projectId } = req.body;

    await this.projectExists(projectId);

    await this.projectAuctioned(projectId);

    const getWinner = await Project.findOne({ _id: projectId }).select(
      "winner winningBetAmt -_id"
    );
    console.log("🚀 ~ getWinner:", getWinner);

    const winnerId = getWinner.winner;
    console.log("🚀 ~ winnerId:", winnerId);
    const winningBetAmt = getWinner.winningBetAmt;
    console.log("🚀 ~ winningBetAmt:", winningBetAmt);

    const getUserName = await User.findOne({ _id: winnerId }).select(
      "userName -_id"
    );
    const winnerUserName = getUserName.userName;
    console.log("🚀 ~ winnerUserName:", winnerUserName);

    const winner = {
      winner: winnerUserName,
      Amount: winningBetAmt,
    };
    console.log("🚀 ~ winner:", winner);

    res.status(200).send({
      type: RESPONSE_MESSAGE.SUCCESS,
      data: winner,
    });
  });
}

module.exports = new getWinner();
