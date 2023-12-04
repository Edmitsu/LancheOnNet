// const express = require('express');
// const router = express.Router();
// const pedidoController = require('../controllers/pedidosController');

// // Rota para criar pedidos
// router.post('/', async (req, res) => {
//   try {
//     console.log('Recebendo dados da rota /pedidos (POST):', req.body);

//     const { carrinhoItens, precoTotal, opcaoEntrega } = req.body;  // Define opcaoEntrega here

//     if (!carrinhoItens || !Array.isArray(carrinhoItens) || carrinhoItens.length === 0) {
//       console.error('Carrinho vazio ou não encontrado. Não é possível criar o pedido.');
//       return res.status(400).json({ error: 'Carrinho vazio ou não encontrado. Não é possível criar o pedido.' });
//     }

//     const carrinhoItensFormatted = carrinhoItens.map(item => ({
//       quantity: item.quantity || 1,
//       tipo: item.tipo || 'combo',
//       id: item.id || '',
//       nome: item.nome || '',
//       imagem: item.imagem || '',
//       descricao: item.descricao || '',
//       preco: item.preco || 0,
//       _id: item._id || '',
//       opcaoEntrega: item.opcaoEntrega || "LEVAR_PARA_CASA"
//     }));

//     const resultadoPedido = await pedidoController.createPedido({ carrinhoItens: carrinhoItensFormatted, precoTotal, opcaoEntrega, res });

//     console.log('Resultado do pedido:', resultadoPedido);

//   } catch (err) {
//     console.error('Erro na rota /pedidos (POST):', err);
//     return res.status(500).json({ error: `Erro ao criar o pedido. Detalhes do erro: ${err.message}` });
//   }
// });

// // Rota para obter um pedido pelo número
// router.get('/:numeroPedido', async (req, res) => {
//   try {
//     console.log('Recebendo dados da rota /pedidos (GET):', req.params);

//     const result = await pedidoController.getPedido(req, res);

//     res.json(result);
//   } catch (err) {
//     console.error('Erro na rota /pedidos (GET):', err);
//     return res.status(500).json({ error: `Erro ao buscar o pedido. Detalhes do erro: ${err.message}` });
//   }
// });

// // Rota para deletar um pedido pelo número
// router.delete('/:numeroPedido', async (req, res) => {
//   try {
//     console.log('Recebendo dados da rota /pedidos (DELETE):', req.params);

//     const result = await pedidoController.deletePedido(req, res);

//     res.json(result);
//   } catch (err) {
//     console.error('Erro na rota /pedidos (DELETE):', err);
//     return res.status(500).json({ error: `Erro ao deletar o pedido. Detalhes do erro: ${err.message}` });
//   }
// });

// // Rota para obter todos os pedidos
// router.get('/', async (req, res) => {
//   try {
//     const result = await pedidoController.getAllPedidos(req, res);
//     res.json(result);
//   } catch (err) {
//     console.error('Erro na rota /pedidos (GET all):', err);
//     return res.status(500).json({ error: `Erro ao buscar os pedidos. Detalhes do erro: ${err.message}` });
//   }
// });

// module.exports = router;



const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidosController');

// Middleware para validar o formato do número do pedido
router.param('numeroPedido', (req, res, next, numeroPedido) => {
  if (!/^\d{4}$/.test(numeroPedido)) {
    return res.status(400).json({ error: 'Formato inválido para o número do pedido.' });
  }
  next();
});

// Rota para criar pedidos
router.post('/', async (req, res) => {
  try {
    console.log('Recebendo dados da rota /pedidos (POST):', req.body);

    const { carrinhoItens, precoTotal, opcaoEntrega } = req.body;

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

    const resultadoPedido = await pedidoController.createPedido({ carrinhoItens: carrinhoItensFormatted, precoTotal, opcaoEntrega, res });

    console.log('Resultado do pedido:', resultadoPedido);

  } catch (err) {
    console.error('Erro na rota /pedidos (POST):', err);
    return res.status(500).json({ error: `Erro ao criar o pedido. Detalhes do erro: ${err.message}` });
  }
});

// Rota para obter um pedido pelo número
router.get('/:numeroPedido', async (req, res) => {
  try {
    console.log('Recebendo dados da rota /pedidos (GET):', req.params);

    const result = await pedidoController.getPedido(req, res);

    res.json(result);
  } catch (err) {
    console.error('Erro na rota /pedidos (GET):', err);
    return res.status(500).json({ error: `Erro ao buscar o pedido. Detalhes do erro: ${err.message}` });
  }
});

// Rota para deletar um pedido pelo número
router.delete('/:numeroPedido', async (req, res) => {
  try {
    console.log('Recebendo dados da rota /pedidos (DELETE):', req.params);

    const result = await pedidoController.deletePedido(req, res);

    res.json(result);
  } catch (err) {
    console.error('Erro na rota /pedidos (DELETE):', err);
    return res.status(500).json({ error: `Erro ao deletar o pedido. Detalhes do erro: ${err.message}` });
  }
});

// Rota para obter todos os pedidos
router.get('/', async (req, res) => {
  try {
    const result = await pedidoController.getAllPedidos(req, res);
    res.json(result);
  } catch (err) {
    console.error('Erro na rota /pedidos (GET all):', err);
    return res.status(500).json({ error: `Erro ao buscar os pedidos. Detalhes do erro: ${err.message}` });
  }
});

router.get('/numeroPorId/:pedidoId', async (req, res) => {
  try {
    const { pedidoId } = req.params;

    console.log(`Recebendo pedidoId na rota /pedidos/numeroPorId: ${pedidoId}`);


    const pedidoDetails = await pedidoController.getPedidoDetailsById(pedidoId);

    if (!pedidoDetails || !pedidoDetails.numeroPedido) {
      console.log(`Pedido não encontrado ou número do pedido não disponível para o pedidoId: ${pedidoId}`);
      return res.status(404).json({ error: 'Pedido não encontrado.' });
    }

    const numeroPedido = pedidoDetails.numeroPedido;
    console.log(`Número do pedido para o pedidoId ${pedidoId}: ${numeroPedido}`);

    res.json({ numeroPedido });
  } catch (err) {
    console.error('Erro na rota /pedidos/numeroPorId:', err);
    return res.status(500).json({ error: `Erro ao buscar o número do pedido. Detalhes do erro: ${err.message}` });
  }
});

module.exports = router;
