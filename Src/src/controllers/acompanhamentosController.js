const Acompanhamentos = require('../models/acompanhamento');

const acompanhamentosController = {};

acompanhamentosController.getAcompanhamentos = async (req, res) => {
  try {
    const acompanhamentos = await Acompanhamentos.find();
    res.json({ acompanhamentos });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

acompanhamentosController.createAcompanhamento = async (req, res) => {
  const acompanhamento = new Acompanhamentos(req.body);
  try {
    await acompanhamento.save();
    res.json({ message: 'Acompanhamento adicionado com sucesso!' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

acompanhamentosController.updateAcompanhamento = async (req, res) => {
  const { id } = req.params;
  try {
    await Acompanhamentos.findByIdAndUpdate(id, req.body);
    res.json({ message: 'Acompanhamento atualizado com sucesso!' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

acompanhamentosController.deleteAcompanhamento = async (req, res) => {
  const { id } = req.params;
  try {
    await Acompanhamentos.findByIdAndDelete(id);
    res.json({ message: 'Acompanhamento excluído com sucesso!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = acompanhamentosController;
