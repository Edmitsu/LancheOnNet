

const mongoose = require('mongoose');

const CarrinhoSchema = new mongoose.Schema({
  carrinho: [
    {
      quantidade: Number,
      tipo: String,
      id: String,
      nome: String,
      imagem: String,
      descricao: String,
      preco: Number,
    },
  ],
  precoTotal: Number, 
});

module.exports = mongoose.model('Carrinho', CarrinhoSchema);
