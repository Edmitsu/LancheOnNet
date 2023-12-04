const Carrinho = require('../models/carrinho');
const Combo = require('../models/combos');
const Porcao = require('../models/porcao');
const Bebida = require('../models/bebidas');

module.exports = {
  async addToCarrinho(req, res) {
    const { tipo, id, opcaoEntrega } = req.body; // Adicione opcaoEntrega ao corpo da requisição

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

      if (!produto) {
        return res.status(400).json({ error: 'Produto não encontrado.' });
      }

      const baseUrl = "http://localhost:4000"; 
      const imagePath = produto.img ? produto.img.replace(/\\/g, '/') : ''; 
      const imageUrl = `${baseUrl}/${imagePath}`;

      const carrinhoItem = {
        tipo,
        id,
        nome: produto.name,
        imagem: imageUrl, 
        descricao: produto.description,
        preco: parseFloat(produto.price) * 100,
        quantity: 1,
        opcaoEntrega, 
      };

      let carrinho = await Carrinho.findOne();

      if (!carrinho) {
        carrinho = new Carrinho();
      }

      carrinho.carrinho.push(carrinhoItem);

      carrinho.precoTotal = carrinho.carrinho.reduce(
        (total, item) => total + item.preco * item.quantity,
        0
      );

      await carrinho.save();

      return res.json({ message: 'Produto adicionado ao carrinho.' });
    } catch (err) {
      return res.status(400).json({ error: 'Erro ao adicionar ao carrinho.' });
    }
  },
  
  async deleteCarrinho(req, res) {
    try {
      const carrinho = await Carrinho.findOne();

      if (!carrinho) {
        return res.status(404).json({ error: 'Carrinho não encontrado.' });
      }

      carrinho.carrinho = [];
      carrinho.precoTotal = 0;

      await carrinho.save();

      return res.json({ message: 'Carrinho excluído com sucesso.' });
    } catch (err) {
      return res.status(400).json({ error: 'Erro ao excluir o carrinho.' });
    }
  },

  async deleteCarrinhoItem(req, res) {
    const { Id } = req.params;

    try {
      const carrinho = await Carrinho.findOne();

      if (!carrinho) {
        return res.status(404).json({ error: 'Carrinho não encontrado.' });
      }

      const carrinhoItem = carrinho.carrinho.id(Id);

      if (!carrinhoItem) {
        return res.status(404).json({ error: 'Item do carrinho não encontrado.' });
      }

      carrinho.carrinho.pull(carrinhoItem);
      carrinho.precoTotal = carrinho.carrinho.reduce(
        (total, item) => total + item.preco * item.quantity,
        0
      );

      await carrinho.save();

      return res.json({ message: 'Item do carrinho excluído com sucesso.', precoTotal: carrinho.precoTotal });
    } catch (err) {
      return res.status(400).json({ error: 'Erro ao excluir o item do carrinho.' });
    }
  },

  async getCarrinho(req, res) {
    try {
      const carrinho = await Carrinho.findOne();
  
      if (!carrinho || carrinho.carrinho.length === 0) {
        return res.status(400).json({ error: 'Carrinho vazio.' });
      }
  
      return res.json({
        carrinhoItens: carrinho.carrinho,
        precoTotal: carrinho.precoTotal,
        opcaoEntrega: carrinho.opcaoEntrega,
        carrinhoId: carrinho._id, // Include carrinhoId in the response
      });
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao buscar itens do carrinho.' });
    }
  },

  async updateItemInCarrinho(req, res) {
    const { carrinhoId } = req.params;
    const { quantity } = req.body;

    try {
      const carrinho = await Carrinho.findOne();

      if (!carrinho) {
        return res.status(400).json({ error: 'Carrinho vazio.' });
      }

      const carrinhoItem = carrinho.carrinho.id(carrinhoId);

      if (!carrinhoItem) {
        return res.status(400).json({ error: 'Item do carrinho não encontrado.' });
      }

      carrinhoItem.quantity = quantity;

      carrinho.precoTotal = carrinho.carrinho.reduce(
        (total, item) => total + item.preco * item.quantity,
        0
      );

      await carrinho.save();

      return res.json({ message: 'Quantidade do item atualizada com sucesso.', precoTotal: carrinho.precoTotal });
    } catch (err) {
      return res.status(400).json({ error: 'Erro ao atualizar a quantidade do item no carrinho.' });
    }
  },

  async getCarrinhoBySessionId(req, res) {
    try {
      const session_id = req.params.session_id;
      const carrinhoData = await Carrinho.findOne({ session_id });

      if (!carrinhoData) {
        return res.status(404).json({ error: 'Carrinho não encontrado.' });
      }

      return res.json({ carrinhoData });
    } catch (error) {
      console.error('Erro ao recuperar dados do carrinho:', error);
      res.status(500).json({ error: 'Erro ao recuperar dados do carrinho. Verifique os logs para mais detalhes.' });
    }
  },
  

  async updateOpcaoEntrega(carrinhoId, opcaoEntrega) {
    try {
      // Validate opcaoEntrega here (ensure it's one of the valid enum values)
      const validOpcoesEntrega = ['LEVAR_PARA_CASA', 'COMER_NO_LOCAL'];
      if (!validOpcoesEntrega.includes(opcaoEntrega)) {
        throw new Error('Opção de entrega inválida.');
      }
  
      // Update the opcaoEntrega in the database
      const updatedCarrinho = await Carrinho.findByIdAndUpdate(
        carrinhoId,
        { opcaoEntrega },
        { new: true }
      );
  
      if (!updatedCarrinho) {
        throw new Error('Carrinho não encontrado.');
      }
  
      return { message: `Opção de entrega alterada para '${opcaoEntrega}'` };
    } catch (err) {
      console.error('Erro ao atualizar a opção de entrega:', err.message);
      return { error: err.message };
    }
    

    }

};
