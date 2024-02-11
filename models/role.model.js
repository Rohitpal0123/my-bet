const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roleSchema = Schema(
  {
    role: {
      type: String,
      enum: ["auctioner", "user"],
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Role = mongoose.model("Role", roleSchema);

module.exports = Role;
