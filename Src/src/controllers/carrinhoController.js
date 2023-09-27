// const Carrinho = require('../models/carrinho');
// const Pedido = require('../models/pedidos');

// module.exports = {
//   async addToCarrinho(req, res) {
//     const { pedidoId } = req.body;

//     try {
//       // Verifique se o pedido realmente existe
//       const pedido = await Pedido.findById(pedidoId);
//       if (!pedido) {
//         return res.status(404).json({ error: 'Pedido não encontrado.' });
//       }

//      
//       const carrinhoItem = await Carrinho.create({
//         pedidoId,
//         nome: pedido.nome,
//         carne: pedido.carne,
//         pao: pedido.pao,
//         opcionais: pedido.opcionais,
//         bebida: pedido.bebida,
//         porcao: pedido.porcao,
//         status: pedido.status,
//         comboId: pedido.combo.id,
//         descricaoCombo: pedido.descricaoCombo,
//         descricaoPorcao: pedido.descricaoPorcao,
//         numeroPedido: pedido.numeroPedido,
//         quantidade: pedido.combo.qtdCombo || 1, 
//         combo: { // Adicione os dados do combo ao carrinhoItem
//           nomeCombo: pedido.combo.nome,
//           descricaoCombo: pedido.combo.descricao,
//           
//         },
//       });

//       return res.json({ carrinhoItem, message: 'Pedido adicionado ao carrinho.' });
//     } catch (err) {
//       return res.status(400).json({ error: 'Erro ao adicionar ao carrinho.' });
//     }
//   },

//   async removeFromCarrinho(req, res) {
//     const { carrinhoId } = req.params;

//     try {
//       await Carrinho.findByIdAndDelete(carrinhoId);
//       return res.json({ message: 'Item removido do carrinho.' });
//     } catch (err) {
//       return res.status(400).json({ error: 'Erro ao remover do carrinho.' });
//     }
//   },

//   async getCarrinho(req, res) {
//     try {
//       const carrinhoItens = await Carrinho.find();
//       return res.json({ carrinhoItens });
//     } catch (err) {
//       return res.status(500).json({ error: 'Erro ao buscar itens do carrinho.' });
//     }
//   },

//   
// };

const Carrinho = require('../models/carrinho');
const Pedido = require('../models/pedidos');

module.exports = {
  async addToCarrinho(req, res) {
    const { pedidoId, quantidade, preco } = req.body;

    try {
     
      const pedido = await Pedido.findById(pedidoId);
      if (!pedido) {
        return res.status(404).json({ error: 'Pedido não encontrado.' });
      }

     
      const carrinhoItem = await Carrinho.create({
        pedidoId,
        nome: pedido.nome,
        carne: pedido.carne,
        pao: pedido.pao,
        opcionais: pedido.opcionais,
        bebida: pedido.bebida,
        porcao: pedido.porcao,
        status: pedido.status,
        comboId: pedido.combo.id,
        descricaoCombo: pedido.descricaoCombo,
        descricaoPorcao: pedido.descricaoPorcao,
        numeroPedido: pedido.numeroPedido,
        quantidade: quantidade,
        preco: preco,
        combo: {
          nomeCombo: pedido.combo.nome,
          descricaoCombo: pedido.combo.descricao,
        
        },
      });

      return res.json({ carrinhoItem, message: 'Pedido adicionado ao carrinho.' });
    } catch (err) {
      return res.status(400).json({ error: 'Erro ao adicionar ao carrinho.' });
    }
  },

  async removeFromCarrinho(req, res) {
    const { carrinhoId } = req.params;

    try {
      await Carrinho.findByIdAndDelete(carrinhoId);
      return res.json({ message: 'Item removido do carrinho.' });
    } catch (err) {
      return res.status(400).json({ error: 'Erro ao remover do carrinho.' });
    }
  },

  async getCarrinho(req, res) {
    try {
      const carrinhoItens = await Carrinho.find();
      return res.json({ carrinhoItens });
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao buscar itens do carrinho.' });
    }
  },

 
};
