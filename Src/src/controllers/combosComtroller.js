const fs = require("fs");
const Combo = require("../models/combos");

exports.create = async (req, res) => {
  try {
    const { name, description, id } = req.body;
    const file = req.file;

    const combo = new Combo({
      id,
      name,
      description,
      img: file.path,
    });

    await combo.save();
    res.json(combo);
  } catch (err) {
    res.status(500).json({ message: "Erro ao salvar o combo." });
  }
};

exports.remove = async (req, res) => {
  try {
    const combo = await Combo.findById(req.params.id);
    if (!combo) {
      return res.status(404).json({ message: "Combo não encontrado." });
    }
    fs.unlinkSync(`uploads/${combo.img}`);
    await combo.remove();
    res.json({ message: "Combo removido com sucesso." });
  } catch (err) {
    res.status(500).json({ message: "Erro ao remover o combo." });
  }
};

exports.findAll = async (req, res) => {
  try {
    const combos = await Combo.find();
    res.json(combos);
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar os combos." });
  }
};
