const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const stripe = require('stripe')('sk_test_51NxEV7H38Iz5TPxOqw6rHCPEBm4P3Fstg8TBJULINFj54dVS8UOH4EQUlJIjDfOoaulYtxrQnefsK50xMLoIlK9800WUwYnLHi');
const axios = require('axios');
const path = require('path');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI);


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(cors());

const CarrinhoModel = mongoose.model('Carrinho', new mongoose.Schema({
  carrinhoItensString: String,
}));

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
      opcaoEntrega: String, 
    },
  ],
  precoTotal: Number,
  status: {
    type: String,
    enum: ['PAGO', 'PENDENTE', 'CANCELADO'],
    default: 'PENDENTE',
  },
  numeroPedido: {
    type: String,
    unique: true,
    default: () => Math.floor(1000 + Math.random() * 9000).toString(),
  },
});

const PedidoModel = mongoose.model('Pedido', PedidoSchema);

async function saveCarrinhoItens(carrinhoItens) {
  try {
    const carrinho = new CarrinhoModel({ carrinhoItensString: carrinhoItens });
    const savedCarrinho = await carrinho.save();
    return savedCarrinho._id;
  } catch (error) {
    console.error('Error saving carrinhoItens:', error.message);
    throw new Error('Erro ao salvar carrinhoItens.');
  }
}

async function getCarrinhoItens(carrinhoId) {
  try {
    const carrinho = await CarrinhoModel.findById(carrinhoId);
    return carrinho ? carrinho.carrinhoItensString : null;
  } catch (error) {
    console.error('Error retrieving carrinhoItens:', error.message);
    throw new Error('Erro ao recuperar carrinhoItens.');
  }
}

async function savePedido(carrinhoItensFormatted, precoTotal, opcaoEntrega) {
  try {
    const carrinhoWithOpcaoEntrega = carrinhoItensFormatted.map(item => ({
      ...item,
      opcaoEntrega,
    }));

    const pedido = new PedidoModel({
      carrinho: carrinhoWithOpcaoEntrega,
      precoTotal,
      opcaoEntrega,
      status: 'PAGO',
    });

    const savedPedido = await pedido.save();
    return savedPedido.numeroPedido;
  } catch (error) {
    console.error('Error saving pedido:', error.message);
    throw new Error('Erro ao salvar pedido.');
  }
}

app.get('/success', async (req, res) => {
  try {
    const carrinhoId = req.query.carrinhoId;

    if (!carrinhoId) {
      throw new Error('O parâmetro carrinhoId é obrigatório.');
    }

    const session = await stripe.checkout.sessions.retrieve(req.query.session_id);
    const opcaoEntrega = session.metadata.opcaoEntrega;

    const carrinhoItensString = await getCarrinhoItens(carrinhoId);
    const carrinhoItens = JSON.parse(carrinhoItensString);

    const precoTotal = carrinhoItens.reduce((total, item) => total + item.preco, 0);
    const pedidoId = await savePedido(carrinhoItens, precoTotal, opcaoEntrega);

    const paymentStatus = session.payment_status;

    if (paymentStatus === 'paid') {
      console.log('Pagamento confirmado! Renderizando success.ejs');
      
      res.render('success', { numeroPedido: pedidoId, carrinhoItens, precoTotal });

      
      const pedidoItems = carrinhoItens.map(item => ({
        quantity: item.quantity,
        tipo: item.tipo || 'combo',
        id: item.id || '',
        nome: item.nome || '',
        imagem: item.imagem || '',
        descricao: item.descricao || '',
        preco: parseFloat(item.preco),
        _id: item._id || '',
        opcaoEntrega: item.opcaoEntrega || opcaoEntrega,
      }));

      const savedPedido = {
        pedidoId,
        carrinhoItens: pedidoItems,
        precoTotal,
        opcaoEntrega,
        status: 'PAGO', 
      };

      console.log('Enviando solicitação para /pedidos:', savedPedido);

      try {
     
        const response = await axios.post('http://localhost:4000/pedidos', savedPedido);

        console.log('Resposta da Rota /pedidos:', response.data);
      } catch (error) {
        console.error('Erro ao enviar solicitação para /pedidos:', error.message);
        
      }
    } else {
      console.log(`Pagamento não confirmado. Estado do pagamento: ${paymentStatus}`);
   
      res.send(`Pagamento não confirmado. Estado do pagamento: ${paymentStatus}`);
    }
  } catch (error) {
    console.error('Error in /success:', error.message);
    res.status(500).json({ success: false, error: 'Erro ao processar o pedido' });
  }
});


app.post('/stripe-create-session', async (req, res) => {
  try {
    console.log('Request Body:', req.body);

    if (!req.body.items || !Array.isArray(req.body.items) || req.body.items.length === 0) {
      throw new Error('O campo items no corpo da solicitação deve ser um array não vazio.');
    }

    const opcaoEntrega = req.body.opcaoEntrega;

    const sessionItems = req.body.items.map((item) => ({
      quantity: parseInt(item.quantity),
      tipo: item.tipo || 'combo',
      id: item.id || '',
      nome: item.nome || '',
      imagem: item.imagem || '',
      descricao: item.descricao || '',
      preco: parseFloat(item.preco),
      _id: item._id || '',
    }));

    if (sessionItems.length === 0) {
      throw new Error('O campo items no corpo da solicitação está vazio.');
    }

    const carrinhoItensString = JSON.stringify(sessionItems);

    if (!carrinhoItensString) {
      console.error('carrinhoItensString is undefined or null.');
      throw new Error('Erro ao gerar carrinhoItensString.');
    }

    const carrinhoId = await saveCarrinhoItens(carrinhoItensString);

    const precoTotal = sessionItems.reduce((total, item) => total + item.preco, 0);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      success_url: `${process.env.DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}&carrinhoId=${carrinhoId}`,
      cancel_url: `${process.env.DOMAIN}/checkout?payment_fail=true`,
      line_items: sessionItems.map((item) => ({
        price_data: {
          currency: 'brl',
          product_data: {
            name: item.nome,
            description: item.descricao,
            images: [item.imagem],
          },
          unit_amount: item.preco,
        },
        quantity: item.quantity,
      })),
      metadata: {
        carrinhoId,
        opcaoEntrega: opcaoEntrega,  
      },
    });

    // Enviar solicitação POST para a rota http://localhost:4000/pedidos
    const savedPedido = await savePedido(sessionItems, precoTotal);

    res.json({ session_url: session.url, pedido: savedPedido });
  } catch (error) {
    console.error('Error in /stripe-create-session:', error.message);
    res.status(500).json({ success: false, error: 'Erro ao processar o pagamento' });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: 'Erro interno no servidor.' });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
