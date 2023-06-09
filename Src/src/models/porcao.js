const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PorcaoSchema = new Schema({
  name: { type: String, required: true },
  src: { type: String, required: true },
  description: { type: String },
  id: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("Porcao", PorcaoSchema);


