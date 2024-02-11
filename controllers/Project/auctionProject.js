const Project = require("../../models/project.model");
const Bet = require("../../models/bet.model");
const mongoose = require("mongoose");
// const validate = require("../../lib/validate");
// const updateProductSchema = require("../../jsonSchema/Product/update");
const RESPONSE_MESSAGE = require("../../lib/responseCode");
const asyncHandler = require("../../middleware/asyncHandler");
const { apiError } = require("../../lib/apiError");
class auctionProject {
  async projectExists(id) {
    const projectExists = await Project.findOne({ _id: id });
    if (!projectExists) throw new apiError(400, "Project does not exists !");
    return null;
  }

  async isProjectActive(projectId) {
    const isProjectActive = await Project.findOne({ _id: projectId }).select(
      "isActive -_id"
    );
    if (isProjectActive.isActive)
      throw new apiError(400, "Project is already in Auction!");
  }

  async isProjectAuctioned(projectId) {
    const isProjectAuctioned = await Project.findOne({ _id: projectId }).select(
      "winner -_id"
    );
    if (isProjectAuctioned.winner)
      throw new apiError(400, "Project is already auctioned!");
  }
  process = asyncHandler(async (req, res) => {
    // validate(req.body, updateProductSchema);
    const projectId = req.params.id;
    const update = req.body;

    await this.projectExists(projectId);

    await this.isProjectActive(projectId);

    await this.isProjectAuctioned(projectId);

    const auctionProject = await Project.updateOne({ _id: projectId }, update);
    if (auctionProject.modifiedCount != 1)
      throw new apiError(500, "Failed to auction project !")();

    const getDuration = await Project.findOne({ _id: projectId }).select(
      "duration"
    );
    if (!getDuration) throw new apiError(400, "Project duration not found!");
    const duration = getDuration.duration;

    if (auctionProject && duration) {
      setTimeout(async () => {
        const deActivateProject = await Project.updateOne(
          { _id: projectId },
          { isActive: false }
        );
        if (!deActivateProject)
          throw new apiError(400, "Project not deactivated!");
        console.log("Project in activated!");

        const getWinningBet = await Bet.aggregate([
          {
            $match: {
              projectId: new mongoose.Types.ObjectId(projectId),
            },
          },
          {
            $sort: {
              betAmt: -1,
            },
          },
          {
            $limit: 1,
          },
        ]);
        if (getWinningBet.length == 0)
          throw new apiError(400, "No winner found!");

        const updateProject = await Project.updateOne(
          { _id: projectId },
          {
            winningBetId: getWinningBet[0]._id,
            winner: getWinningBet[0].userId,
            winningBetAmt: getWinningBet[0].betAmt,
          }
        );
        if (!updateProject) throw new apiError(400, "Project not updated!");
      }, duration * 1000);
    }

    res.status(200).send({
      type: RESPONSE_MESSAGE.SUCCESS,
      data: auctionProject,
    });
  });
}

module.exports = new auctionProject();
