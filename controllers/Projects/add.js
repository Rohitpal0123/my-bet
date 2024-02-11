const Project = require("../../models/project.model");
// const validate = require("../../lib/validate");
// const addProductSchema = require("../../jsonSchema/Product/add");
const RESPONSE_MESSAGE = require("../../lib/responseCode");
const asyncHandler = require("../../middleware/asyncHandler");
const { apiError } = require("../../lib/apiError");
class addProject {
  process = asyncHandler(async (req, res) => {
    // validate(req.body, addProductSchema);
    const projectData = req.body;
    console.log("🚀 ~ projectData:", projectData);

    const newProject = await Project.create(projectData);
    if (!newProject) throw new apiError(500, "Project not added !");

    res.status(200).send({
      type: RESPONSE_MESSAGE.SUCCESS,
      data: newProject,
    });
  });
}

module.exports = new addProject();
