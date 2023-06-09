const mongoose = require('mongoose');

const PedidoSchema = new mongoose.Schema({
  nome: String,
  carne: String,
  pao: String,
  opcionais: [String],
  bebida: String,
  porcao: String,
  status: String,
  combo: {
    nome: String,
    qtdCombo: Number,
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Combos'
    }
  },
  descricaoCombo: String,
  descricaoPorcao: String,
  numeroPedido: { type: Number, unique: true }
});


//Gera o Numero do pedido 

function generateRandomNumber() {
  return Math.floor(1000 + Math.random() * 9000);
}


PedidoSchema.pre('save', async function (next) {
  try {
    if (!this.numeroPedido) {
      let randomNumber = generateRandomNumber();
      
      const existingPedido = await this.constructor.findOne({ numeroPedido: randomNumber }).exec();
      
      
      while (existingPedido) {
        randomNumber = generateRandomNumber();
        existingPedido = await this.constructor.findOne({ numeroPedido: randomNumber }).exec();
      }
      
      this.numeroPedido = randomNumber;
    }
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('Pedido', PedidoSchema);
