const Pedido = require('../models/pedidos');
const Combo = require('../models/combos');

module.exports = {
  async create(req, res) {
    const { nome, carne, pao, opcionais, bebida, porcao, status, comboId, descricaoCombo, descricaoPorcao, numeroPedido, qtdCombo } = req.body;

    try {
      const combo = await Combo.findById(comboId);

      if (!combo) {
        return res.status(400).json({ error: 'Combo não encontrado.' });
      }

      const pedido = await Pedido.create({ 
        nome,
        carne,
        pao,
        opcionais,
        bebida,
        porcao,
        status,
        combo: {
          nome: combo.nome,
          id: combo._id,
          descricao: descricaoCombo,
          qtdCombo
        },
        descricaoPorcao,
        numeroPedido
      });

      return res.json({ pedido, message: 'Pedido criado com sucesso.' });
    } catch (err) {
      return res.status(400).json({ error: 'Erro ao criar o pedido.' });
    }
  },

  async update(req, res) {
    const { id } = req.params;

    try {
      const pedido = await Pedido.findById(id);

      if (!pedido) {
        return res.status(404).json({ error: 'Pedido não encontrado.' });
      }

      const { qtdCombo, ...pedidoData } = req.body;

      if (qtdCombo) {
        pedido.combo.qtdCombo = qtdCombo;
      }

      const updatedPedido = await pedido.save();

      return res.json({ pedido: updatedPedido, message: 'Pedido atualizado com sucesso.' });
    } catch (err) {
      return res.status(400).json({ error: 'Erro ao atualizar o pedido.' });
    }
  },

  async delete(req, res) {
    const { id } = req.params;

    try {
      const pedido = await Pedido.findById(id);

      if (!pedido) {
        return res.status(404).json({ error: 'Pedido não encontrado.' });
      }

      await Pedido.findByIdAndDelete(id);

      return res.json({ message: 'Pedido excluído com sucesso.' });
    } catch (err) {
      return res.status(400).json({ error: 'Erro ao excluir o pedido.' });
    }
  },

  async getAll(req, res) {
    try {
      const pedidos = await Pedido.find();
      return res.json({ pedidos });
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao buscar os pedidos.' });
    }
  },

  async getById(req, res) {
    const { id } = req.params;

    try {
      const pedido = await Pedido.findById(id);

      if (!pedido) {
        return res.status(404).json({ error: 'Pedido não encontrado.' });
      }

      return res.json({ pedido });
    } catch (err) {
      return res.status(500).json({ error: 'Erro ao buscar o pedido.' });
    }
  }
};
