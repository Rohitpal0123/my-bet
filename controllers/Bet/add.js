const Bet = require("../../models/bet");
// const validate = require("../../lib/validate");
// const addProductSchema = require("../../jsonSchema/Product/add");
const RESPONSE_MESSAGE = require("../../lib/responseCode");
const asyncHandler = require("../../middleware/asyncHandler");
const { apiError } = require("../../lib/apiError");

class addBet {
  process = asyncHandler(async (req, res) => {
    // validate(req.body, addProductSchema);
    const betData = req.body;
    console.log("🚀 ~ betData:", betData);

    const newBet = await Bet.create(betData);
    if (!newBet) throw new apiError(500, "Project not added !");

    res.status(200).send({
      type: RESPONSE_MESSAGE.SUCCESS,
      data: newBet,
    });
  });
}

module.exports = new addBet();
