const mongoose = require('mongoose');

const AcompanhamentosSchema = new mongoose.Schema({
  bebidas: [
    {
      id: Number,
      tipo: String,
    },
  ],
  porcoes: [
    {
      id: Number,
      tipo: String,
    },
  ],
});

module.exports = mongoose.model('Acompanhamentos', AcompanhamentosSchema);
