const mongoose = require('mongoose');

const CarrinhoSchema = new mongoose.Schema({
  nome: String,
  bebida: String,
  comboId: String,
  descricaoCombo: String,
  descricaoPorcao: String,
  numeroPedido: Number,
  quantidade: Number,
  preco: Number,
  
  combo: {
    nomeCombo: String,
    descricaoCombo: String,
    
  },
});

module.exports = mongoose.model('Carrinho', CarrinhoSchema);

