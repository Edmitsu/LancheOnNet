const Carrinho = require('../models/carrinho');
const Hamburger = require('../models/combos.js');
const Porcao = require('../models/porcao.js');
const Bebida = require('../models/bebidas.js');


module.exports = {
  async addToCarrinho(req, res) {
    const { hamburger, porcao, bebida} = req.body;

    try {
     
      const hamburger = await Hamburger.findById(id);
      if (!hamburger) {
        return res.status(404).json({ error: 'Hamburger não encontrado.' });
      }
      const porcao = await Porcao.findById(id);
      if (!hamburger) {
        return res.status(404).json({ error: 'Porção não encontrada.' });
      }
      const bebida = await Bebida.findById(id);
      if (!hamburger) {
        return res.status(404).json({ error: 'Bebida não encontrado.' });
      }

     
      const carrinhoItem = await Carrinho.create({
        hamburger,
        bebida,
        porcao,
        preco
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

