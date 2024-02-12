const Project = require("../../models/project.model");
const RESPONSE_MESSAGE = require("../../lib/responseCode");
const asyncHandler = require("../../middleware/asyncHandler");
const { apiError } = require("../../lib/apiError");

class getProject {
  process = asyncHandler(async (req, res) => {
    const getProject = await Project.find({});
    if (!getProject) throw new apiError(400, "Projects not found!");

    res.status(400).send({
      type: RESPONSE_MESSAGE.SUCCESS,
      data: getProject,
    });
  });
}

module.exports = new getProject();
