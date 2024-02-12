const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
    winningBetId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "bet",
      required: false,
    },
    winner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: false,
    },
    winningBetAmt: {
      type: Number,
      required: false,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
