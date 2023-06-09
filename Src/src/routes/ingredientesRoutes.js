const express = require('express');
const router = express.Router();
const Ingredientes = require('../models/ingrediente');

router.get('/', async (req, res) => {
  const ingredientes = await Ingredientes.find();
  res.json({ ingredientes });
});

router.post('/', async (req, res) => {
  const ingredientes = new Ingredientes(req.body);
  await ingredientes.save();
  res.json({ message: 'Ingrediente adicionado com sucesso!' });
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  await Ingredientes.findByIdAndUpdate(id, req.body);
  res.json({ message: 'Ingrediente atualizado com sucesso!' });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await Ingredientes.findByIdAndDelete(id);
  res.json({ message: 'Ingrediente excluído com sucesso!' });
});

module.exports = router;
