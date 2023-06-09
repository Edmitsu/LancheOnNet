const fs = require("fs");
const Porcao = require("../models/porcao");

exports.create = async (req, res) => {
  try {
    const { name, description, id } = req.body;
    const file = req.file;

    const porcao = new Porcao({
      id,
      name,
      description,
      src: file.path,
    });

    await porcao.save();
    res.json(porcao);
  } catch (err) {
    res.status(500).json({ message: "Erro ao salvar o porcao." });
  }
};

exports.remove = async (req, res) => {
  try {
    const porcao = await Porcao.findById(req.params.id);
    if (!porcao) {
      return res.status(404).json({ message: "porcao não encontrado." });
    }
    fs.unlinkSync(`uploads/${porcao.src}`);
    await porcao.remove();
    res.json({ message: "porcao removido com sucesso." });
  } catch (err) {
    res.status(500).json({ message: "Erro ao remover o Porcao." });
  }
};

exports.findAll = async (req, res) => {
    try {
      const porcoes = await Porcao.find();
      res.json(porcoes);
    } catch (err) {
      res.status(500).json({ message: "Erro ao buscar as porções." });
    }
  };
  
