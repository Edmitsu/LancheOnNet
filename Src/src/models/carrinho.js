const mongoose = require('mongoose');

const CarrinhoSchema = new mongoose.Schema({
  carrinho: [
    {
      quantity: Number,
      tipo: String,
      id: String,
      nome: String,
      imagem: String,
      descricao: String,
      preco: Number,
    },
  ],
    opcaoEntrega: {
        type: String,
        enum: ['LEVAR_PARA_CASA', 'COMER_NO_LOCAL'],
        default: 'COMER_NO_LOCAL',
      },
  precoTotal: Number,
});

module.exports = mongoose.model('Carrinho', CarrinhoSchema);
