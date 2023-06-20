const { model, Schema } = require("mongoose");

const AccountSchema = new Schema({
  name: { type: String, required: true, allowNull: false },
  funds: { type: Number, required: true, default: 0 },
});

module.exports = model("Account", AccountSchema);
