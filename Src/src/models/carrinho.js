// const mongoose = require('mongoose');

// const CarrinhoSchema = new mongoose.Schema({
//   nome: String,
//   carne: String,
//   pao: String,
//   opcionais: [String],
//   bebida: String,
//   status: String,
//   comboId: String,
//   descricaoCombo: String,
//   descricaoPorcao: String,
//   numeroPedido: Number,
//   quantidade: Number,
//   // Dados do combo
//   combo: {
//     nomeCombo: String,
//     descricaoCombo: String,
//     
//   },
// });

// module.exports = mongoose.model('Carrinho', CarrinhoSchema);

const mongoose = require('mongoose');

const CarrinhoSchema = new mongoose.Schema({
  nome: String,
  carne: String,
  pao: String,
  opcionais: [String],
  bebida: String,
  status: String,
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

