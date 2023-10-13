const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BebidasSchema = new Schema({
  bebida: { type: String, required: true },
  img: { type: String, required: true },
  id: { type: String, required: true, unique: true },
  tipo: { type: String, required: true }, 
  tamanho: { type: String, required: true }, 
  sabor:{ type: String, required: true }, 
  price: { type: Number, required: true },
});

module.exports = mongoose.model('Bebida', BebidasSchema);
