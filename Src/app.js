const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 4000;

dotenv.config();

const db = require('./bancoDados/bd');
app.use(cors());
app.use(express.json());

// Conectar ao banco de dados MongoDB
mongoose.connect(db.mongoURI, { useNewUrlParser: true });

// Carregar as rotas

const bebidasRoutes = require('./src/routes/bebidasRoutes');
const statusRoutes = require('./src/routes/statusRoutes');
const pedidosRoutes = require('./src/routes/pedidosRoutes');
const combosRoutes = require("./src/routes/combosRoutes");
const porcaoRoutes = require("./src/routes/porcaoRoutes");
const carrinhoRoutes = require("./src/routes/carrinhoRoutes");

// Registrar as rotas 

app.use('/bebidas', bebidasRoutes);
app.use('/status', statusRoutes);
app.use('/pedidos', pedidosRoutes);
app.use('/combos', combosRoutes);
app.use('/porcao', porcaoRoutes);
app.use('/carrinho', carrinhoRoutes);
app.use('/uploads', express.static('uploads'));

app.listen(port, () => console.log(`Rodando na porta  ${port}!`));
