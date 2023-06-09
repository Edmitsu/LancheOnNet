//const Ingredientes = require('../models/ingrediente');

//exports.getIngredientes = async (req, res) => {
//  const ingredientes = await Ingredientes.find();
//  res.json({ ingredientes });
//};

//exports.addIngrediente = async (req, res) => {
  //const ingredientes = new Ingredientes(req.body);
  //await ingredientes.save();
 // res.json({ message: 'Ingrediente adicionado com sucesso!' });
//};

//exports.updateIngrediente = async (req, res) => {
  //const { id } = req.params;
  //await Ingredientes.findByIdAndUpdate(id, req.body);
  //res.json({ message: 'Ingrediente atualizado com sucesso!' });
//};

//exports.deleteIngrediente = async (req, res) => {
  //const { id } = req.params;
  //await Ingredientes.findByIdAndDelete(id);
  //res.json({ message: 'Ingrediente excluído com sucesso!' });
//};

const Ingredientes = require('../models/ingrediente');

// função para recuperar todos os ingredientes
exports.getIngredientes = async (req, res) => {
  try {
    const ingredientes = await Ingredientes.find();
    res.json({ ingredientes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// função para adicionar um novo ingrediente
exports.addIngrediente = async (req, res) => {
  try {
    const ingredientes = new Ingredientes(req.body);
    await ingredientes.save();
    res.json({ message: 'Ingrediente adicionado com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// função para atualizar um ingrediente existente
exports.updateIngrediente = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedIngrediente = await Ingredientes.findByIdAndUpdate(id, req.body, { new: true });
    res.json({ message: 'Ingrediente atualizado com sucesso!', ingredientes: updatedIngrediente });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// função para excluir um ingrediente
exports.deleteIngrediente = async (req, res) => {
  try {
    const { id } = req.params;
    await Ingredientes.findByIdAndDelete(id);
    res.json({ message: 'Ingrediente excluído com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
