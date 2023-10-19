const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BebidasSchema = new Schema({
  name: { type: String, required: true },
  img: { type: String, required: true },
  id: { type: String, required: true, unique: true },
  description: { type: String, required: true }, 
  price: { type: Number, required: true },
});

module.exports = mongoose.model('Bebida', BebidasSchema);
