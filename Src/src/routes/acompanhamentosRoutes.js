const express = require('express');
const router = express.Router();
const Acompanhamentos = require('../models/acompanhamento');

router.get('/', async (req, res) => {
  const acompanhamentos = await Acompanhamentos.find();
  res.json({ acompanhamentos });
});

router.post('/', async (req, res) => {
  const acompanhamentos = new Acompanhamentos(req.body);
  await acompanhamentos.save();
  res.json({ message: 'Acompanhamento adicionado com sucesso!' });
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  await Acompanhamentos.findByIdAndUpdate(id, req.body);
  res.json({ message: 'Acompanhamento atualizado com sucesso!' });
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await Acompanhamentos.findByIdAndDelete(id);
  res.json({ message: 'Acompanhamento excluído com sucesso!' });
});

module.exports = router;
