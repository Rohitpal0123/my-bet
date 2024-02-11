const Role = require("../../models/role.model");
// const validate = require("../../lib/validate");
// const addRoleSchema = require("../../jsonSchema/Role/add");
const RESPONSE_MESSAGE = require("../../lib/responseCode");
const asyncHandler = require("../../middleware/asyncHandler");
const { apiError } = require("../../lib/apiError");
class addRole {
  async roleExists(role) {
    try {
      const roleExists = await Role.findOne({ role: role });
      if (roleExists != null) throw "Role already exists !";

      return null;
    } catch (error) {
      throw error;
    }
  }
  process = asyncHandler(async (req, res) => {
    console.log("hit1");
    // validate(req.body, addRoleSchema);
    const { role, isActive } = req.body;

    await this.roleExists(role);

    const newRole = await Role.create({
      role: role,
      isActive: isActive,
    });
    if (!newRole) throw new apiError(500, "Role not added");

    res.status(200).send({
      type: RESPONSE_MESSAGE.SUCCESS,
      data: newRole,
    });
  });
}

module.exports = new addRole();
