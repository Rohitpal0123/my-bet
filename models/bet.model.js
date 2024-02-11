const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const betSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "project",
      required: true,
    },
    betAmt: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Bet = mongoose.model("Bet", betSchema);

module.exports = Bet;
