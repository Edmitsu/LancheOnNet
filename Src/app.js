const express = require('express');
const mongoose = require('mongoose');
const dotenv   = require('dotenv')
dotenv.config()
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Conectar ao banco de dados MongoDB
mongoose.connect(process.env.MONGO_URI);

// Carregar as rotas
const ingredientesRoutes = require('./src/routes/ingredientesRoutes');
const acompanhamentosRoutes = require('./src/routes/acompanhamentosRoutes');
const statusRoutes = require('./src/routes/statusRoutes');
const pedidosRoutes = require('./src/routes/pedidosRoutes');
const combosRoutes = require("./src/routes/combosRoutes");
const porcaoRoutes = require("./src/routes/porcaoRoutes");

// Registrar as rotas na aplicação
app.use('/ingredientes', ingredientesRoutes);
app.use('/acompanhamentos', acompanhamentosRoutes);
app.use('/status', statusRoutes);
app.use('/pedidos', pedidosRoutes);
app.use('/combos', combosRoutes);
app.use('/porcao', porcaoRoutes)
app.use('/uploads', express.static('uploads'));

app.listen(port, () => console.log(`Rodando na porta  ${port}!`));
