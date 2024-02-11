const Project = require("../../models/project.model");
// const validate = require("../../lib/validate");
// const updateProductSchema = require("../../jsonSchema/Product/update");
const RESPONSE_MESSAGE = require("../../lib/responseCode");
const asyncHandler = require("../../middleware/asyncHandler");
const { apiError } = require("../../lib/apiError");
class updateProject {
  async projectExists(id) {
    try {
      const projectExists = await Project.findOne({ _id: id });
      console.log("🚀 ~ projectExists:", projectExists);
      if (!projectExists) throw "Project doesn't exists !";

      return null;
    } catch (error) {
      throw error;
    }
  }
  process = asyncHandler(async (req, res) => {
    // validate(req.body, updateProductSchema);
    const id = req.params.id;
    const update = req.body;

    await this.projectExists(id);

    const updateProject = await Project.updateOne({ _id: id }, update);
    if (updateProject.modifiedCount != 1)
      throw new apiError(500, "Failed to update project !");

    res.status(200).send({
      type: RESPONSE_MESSAGE.SUCCESS,
      data: updateProject,
    });
  });
}

module.exports = new updateProject();
