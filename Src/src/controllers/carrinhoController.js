const Carrinho = require('../models/carrinho');
const Combo = require('../models/combos');
const Porcao = require('../models/porcao');
const Bebida = require('../models/bebidas');

module.exports = {
  async addToCarrinho(req, res) {
    const { tipo, id } = req.body;

    try {
      let produto;

      if (tipo === 'combo') {
        produto = await Combo.findById(id);
      } else if (tipo === 'porcao') {
        produto = await Porcao.findById(id);
      } else if (tipo === 'bebida') {
        produto = await Bebida.findById(id);
      } else {
        return res.status(400).json({ error: 'Tipo de produto inválido.' });
      }

      
      const carrinhoItem = {
        tipo,
        id,
        nome: produto.name,
        imagem: produto.img,
        descricao: produto.description,
        preco: produto.price,
      };

      const carrinho = await Carrinho.findOne(); 
      carrinho.carrinho.push(carrinhoItem); 

    
      carrinho.precoTotal = carrinho.carrinho.reduce(
        (total, item) => total + item.preco,
        0
      );

      await carrinho.save();

      return res.json({ message: 'Produto adicionado ao carrinho.' });
    } catch (err) {
      return res.status(400).json({ error: 'Erro ao adicionar ao carrinho.' });
    }
  },

  async removeFromCarrinho(req, res) {
    const { carrinhoId } = req.params;

    try {
      const carrinho = await Carrinho.findOne(); 
      const carrinhoItem = carrinho.carrinho.id(carrinhoId);

      if (!carrinhoItem) {
        return res.status(400).json({ error: 'Item do carrinho não encontrado.' });
      }

      carrinhoItem.remove(); 

  
      carrinho.precoTotal = carrinho.carrinho.reduce(
        (total, item) => total + item.preco,
        0
      );

      await carrinho.save();

      return res.json({ message: 'Item removido do carrinho.' });
    } catch (err) {
      return res.status(400).json({ error: 'Erro ao remover do carrinho.' });
    }
  },

  async getCarrinho(req, res) {
    try {
      const carrinho = await Carrinho.findOne(); 
      return res.json({ carrinhoItens: carrinho.carrinho, precoTotal: carrinho.precoTotal });
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao buscar itens do carrinho.' });
    }
  },
};


