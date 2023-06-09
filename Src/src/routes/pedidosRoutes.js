// const express = require('express');
// const router = express.Router();
// const pedidoController = require('../controllers/pedidosController');
// const Pedido = require('../models/pedidos');

// router.get('/', async (req, res) => {
//   try {
//     const pedidos = await Pedido.find();
//     return res.json({ pedidos });
//   } catch (err) {
//     return res.status(500).json({ error: 'Erro ao buscar os pedidos.' });
//   }
// });

// router.get('/:id', async (req, res) => {
//   const pedidoId = req.params.id;

//   try {
//     const pedido = await Pedido.findById(pedidoId);

//     if (!pedido) {
//       return res.status(404).json({ message: 'Pedido não encontrado.' });
//     }

//     pedido.numeroPedido = await pedidoController.getNumeroPedido(pedidoId);

//     return res.json({ pedido });
//   } catch (err) {
//     return res.status(500).json({ error: 'Erro ao buscar o pedido.' });
//   }
// });

// router.get('/:id/numero', async (req, res) => {
//   const pedidoId = req.params.id;

//   try {
//     const pedido = await Pedido.findById(pedidoId);

//     if (!pedido) {
//       return res.status(404).json({ error: 'Pedido não encontrado.' });
//     }

//     const numeroPedido = pedido.numeroPedido;

//     return res.json({ numeroPedido });
//   } catch (err) {
//     return res.status(500).json({ error: 'Erro ao buscar o número do pedido.' });
//   }
// });

// router.post('/', async (req, res) => {
//   const { nome, carne, pao, opcionais, bebida, status, comboId, descricaoCombo, descricaoPorcao, numeroPedido } = req.body;

//   try {
//     const pedido = await Pedido.create({ nome, carne, pao, opcionais, bebida, status, combo: { nome: comboId, descricao: descricaoCombo }, descricaoCombo, descricaoPorcao, numeroPedido });
//     return res.json({ pedido, message: 'Pedido criado com sucesso.' });
//   } catch (err) {
//     return res.status(400).json({ error: 'Erro ao criar o pedido.' });
//   }
// });

// router.put('/:id', async (req, res) => {
//   const { id } = req.params;
//   const { nome, carne, pao, opcionais, bebida, status, comboId, descricaoCombo, descricaoPorcao, numeroPedido } = req.body;

//   try {
//     const pedido = await Pedido.findByIdAndUpdate(id, { nome, carne, pao, opcionais, bebida, status, combo: { nome: comboId, descricao: descricaoCombo }, descricaoCombo, descricaoPorcao, numeroPedido }, { new: true });
//     return res.json({ pedido, message: 'Pedido atualizado com sucesso.' });
//   } catch (err) {
//     return res.status(400).json({ error: 'Erro ao atualizar o pedido.' });
//   }
// });

// router.delete('/:id', async (req, res) => {
//   const { id } = req.params;

//   try {
//     await Pedido.findByIdAndDelete(id);
//     return res.json({ message: 'Pedido excluído com sucesso.' });
//   } catch (err) {
//     return res.status(400).json({ error: 'Erro ao excluir o pedido.' });
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidosController');
const Pedido = require('../models/pedidos');

router.get('/', async (req, res) => {
  try {
    const pedidos = await Pedido.find();
    return res.json({ pedidos });
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao buscar os pedidos.' });
  }
});

router.get('/:id', async (req, res) => {
  const pedidoId = req.params.id;

  try {
    const pedido = await Pedido.findById(pedidoId);

    if (!pedido) {
      return res.status(404).json({ message: 'Pedido não encontrado.' });
    }

    pedido.numeroPedido = await pedidoController.getNumeroPedido(pedidoId);

    return res.json({ pedido });
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao buscar o pedido.' });
  }
});

router.get('/:id/numero', async (req, res) => {
  const pedidoId = req.params.id;

  try {
    const pedido = await Pedido.findById(pedidoId);

    if (!pedido) {
      return res.status(404).json({ error: 'Pedido não encontrado.' });
    }

    const numeroPedido = pedido.numeroPedido;

    return res.json({ numeroPedido });
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao buscar o número do pedido.' });
  }
});

router.post('/', async (req, res) => {
  const { nome, carne, pao, opcionais, bebida, status, comboId, descricaoCombo, descricaoPorcao, numeroPedido, quantidade } = req.body;

  try {
    const pedido = await Pedido.create({ nome, carne, pao, opcionais, bebida, status, combo: { nome: comboId, descricao: descricaoCombo, quantidade }, descricaoCombo, descricaoPorcao, numeroPedido });
    return res.json({ pedido, message: 'Pedido criado com sucesso.' });
  } catch (err) {
    return res.status(400).json({ error: 'Erro ao criar o pedido.' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, carne, pao, opcionais, bebida, status, comboId, descricaoCombo, descricaoPorcao, numeroPedido, qtdCombo } = req.body;

  try {
    const pedido = await Pedido.findByIdAndUpdate(id, { nome, carne, pao, opcionais, bebida, status, combo: { nome: comboId, descricao: descricaoCombo }, descricaoCombo, descricaoPorcao, numeroPedido, qtdCombo }, { new: true });
    return res.json({ pedido, message: 'Pedido atualizado com sucesso.' });
  } catch (err) {
    return res.status(400).json({ error: 'Erro ao atualizar o pedido.' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await Pedido.findByIdAndDelete(id);
    return res.json({ message: 'Pedido excluído com sucesso.' });
  } catch (err) {
    return res.status(400).json({ error: 'Erro ao excluir o pedido.' });
  }
});

module.exports = router;
