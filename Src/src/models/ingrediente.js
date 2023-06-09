const mongoose = require('mongoose');

const IngredientesSchema = new mongoose.Schema({
  paes: {
    type: [
      {
        id: Number,
        tipo: String,
      }
    ]
  },
  carnes: {
    type: [
      {
        id: Number,
        tipo: String,
      }
    ]
  },
  opcionais: {
    type: [
      {
        id: Number,
        tipo: String,
      }
    ]
  }
});

module.exports = mongoose.model('Ingredientes', IngredientesSchema);
