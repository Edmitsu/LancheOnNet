const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ComboSchema = new Schema({
  name: { type: String, required: true },
  img: { type: String, required: true },
  description: { type: String },
  id: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model("Combo", ComboSchema);


