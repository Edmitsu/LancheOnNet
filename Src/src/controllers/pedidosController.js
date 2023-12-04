const Pedido = require('../models/pedidos');

module.exports = {
  async createPedido({ carrinhoItens, precoTotal, opcaoEntrega, res }) {
    try {
      if (!carrinhoItens || !Array.isArray(carrinhoItens) || carrinhoItens.length === 0) {
        console.error('Carrinho vazio ou não encontrado. Não é possível criar o pedido.');
        return res.status(400).json({ error: 'Carrinho vazio ou não encontrado. Não é possível criar o pedido.' });
      }

      const carrinhoItensFormatted = carrinhoItens.map(item => ({
        quantity: item.quantity || 1,
        tipo: item.tipo || 'combo',
        id: item.id || '',
        nome: item.nome || '',
        imagem: item.imagem || '',
        descricao: item.descricao || '',
        preco: item.preco || 0,
        _id: item._id || '',
        opcaoEntrega: item.opcaoEntrega || "LEVAR_PARA_CASA"
      }));

      // Gerar um número de pedido de 4 dígitos
      const numeroPedido = Math.floor(1000 + Math.random() * 9000);

      const pedidoData = {
        carrinho: carrinhoItensFormatted,
        precoTotal: precoTotal,
        opcaoEntrega: opcaoEntrega,  // <-- Add this line to define opcaoEntrega
        numeroPedido: numeroPedido, // Adiciona o número de pedido gerado
      };

      console.log('Dados enviados para a rota /pedidos:', pedidoData);

      const pedido = new Pedido(pedidoData);

      console.log('Pedido antes de salvar:', pedido);

      await pedido.save();

      console.log('Pedido criado com sucesso. Número do Pedido:', pedido.numeroPedido);

      return { message: 'Pedido criado com sucesso.', numeroPedido: pedido.numeroPedido };
    } catch (err) {
      console.error('Erro ao criar o pedido:', err);
      return { error: `Erro ao criar o pedido. Detalhes do erro: ${err.message}` };
    }
  },
  async getPedido(req, res) {
    try {
      const numeroPedido = req.params.numeroPedido;

      const pedido = await Pedido.findOne({ numeroPedido });

      if (!pedido) {
        return { message: 'Pedido não encontrado.' };
      }

      return pedido;
    } catch (err) {
      console.error('Erro ao buscar o pedido:', err);
      throw err;
    }
  },

  async deletePedido(req, res) {
    try {
      const numeroPedido = req.params.numeroPedido;

      const result = await Pedido.deleteOne({ numeroPedido });

      if (result.deletedCount === 0) {
        return { message: 'Pedido não encontrado.' };
      }

      return { message: 'Pedido deletado com sucesso.' };
    } catch (err) {
      console.error('Erro ao deletar o pedido:', err);
      throw err;
    }
  },

  async getAllPedidos(req, res) {
    try {
      const pedidos = await Pedido.find();

      return pedidos;
    } catch (err) {
      console.error('Erro ao buscar os pedidos:', err);
      throw err;
    }
  },

  async  getPedidoDetailsById(pedidoId) {
    try {
      // Select only the necessary fields, including numeroPedido
      const pedido = await Pedido.findOne({ _id: pedidoId }).select('numeroPedido');
  
      if (!pedido) {
        return null; // Or throw an error based on your application logic
      }
  
      return pedido;
    } catch (error) {
      throw new Error(`Erro ao buscar os detalhes do pedido por _id: ${error.message}`);
    }
  }
  
};
