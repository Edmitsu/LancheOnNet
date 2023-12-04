// const mongoose = require('mongoose');

// const PedidoSchema = new mongoose.Schema({
//   carrinho: [
//     {
//       quantity: Number,
//       tipo: String,
//       id: String,
//       nome: String,
//       imagem: String,
//       descricao: String,
//       preco: Number,
//     },
//   ],
//   precoTotal: Number,
//   status: {
//     type: String,
//     enum: ['PAGO', 'PENDENTE', 'CANCELADO'], 
//     default: 'PAGO', 
//   },
//   numeroPedido: {
//     type: String,
//     unique: true,
//     default: () => Date.now().toString(),
//   },
// });

// module.exports = mongoose.model('Pedido', PedidoSchema);

const mongoose = require('mongoose');

const PedidoSchema = new mongoose.Schema({
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
  precoTotal: Number,
  status: {
    type: String,
    enum: ['PAGO', 'PENDENTE', 'CANCELADO'], 
    default: 'PAGO', 
  },
  numeroPedido: {
    type: String,  // Mantenha como String para o formato de 4 dígitos
    unique: true,
    default: () => Math.floor(1000 + Math.random() * 9000).toString(), // Gera um número aleatório de 4 dígitos
  },
  opcaoEntrega: {
    type: String,
    enum: ['COMER_NO_LOCAL', 'LEVAR_PARA_CASA'],
    default: 'COMER_NO_LOCAL',
    
  },
});

module.exports = mongoose.model('Pedido', PedidoSchema);