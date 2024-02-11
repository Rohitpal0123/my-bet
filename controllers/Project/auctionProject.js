const Project = require("../../models/project.model");
// const validate = require("../../lib/validate");
// const updateProductSchema = require("../../jsonSchema/Product/update");
const RESPONSE_MESSAGE = require("../../lib/responseCode");
const asyncHandler = require("../../middleware/asyncHandler");
const { apiError } = require("../../lib/apiError");
class auctionProject {
  async projectExists(id) {
    try {
      const projectExists = await Project.findOne({ _id: id });
      if (!projectExists) throw "Project does not exists !";

      return null;
    } catch (error) {
      throw error;
    }
  }
  process = asyncHandler(async (req, res) => {
    // validate(req.body, updateProductSchema);
    const id = req.params.id;
    console.log("🚀 ~ id:", id);
    const update = req.body;
    console.log("🚀 ~ update:", update);

    await this.projectExists(id);

    const auctionProject = await Project.updateOne({ _id: id }, update);
    if (auctionProject.modifiedCount != 1)
      throw new apiError(500, "Failed to auction project !")();

    const getDuration = await Project.findOne({ _id: id }).select("duration");
    if (!getDuration) throw new apiError(400, "Project duration not found!");
    const duration = getDuration.duration;

    if (auctionProject && duration) {
      setTimeout(async () => {
        await Project.updateOne({ _id: id }, { isActive: false });
        console.log("Project updated to inactive");
      }, duration * 1000);
    }

    res.status(200).send({
      type: RESPONSE_MESSAGE.SUCCESS,
      data: auctionProject,
    });
  });
}

module.exports = new auctionProject();
