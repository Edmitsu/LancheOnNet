const mongoose = require('mongoose');

const CarrinhoSchema = new mongoose.Schema({
  hamburger: Object,
  bebida: Object,
  porcao: Object,
  preco: Number,
});

module.exports = mongoose.model('Carrinho', CarrinhoSchema);

