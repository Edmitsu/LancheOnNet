const fs = require("fs");
const Bebida = require("../models/bebidas");

exports.create = async (req, res) => {
  try {
    const { bebida, id, tipo, tamanho, sabor, price } = req.body;
    const file = req.file;

    const bebidaItem = new Bebida({
      id,
      bebida,
      img: file.path,
      tipo, 
      tamanho, 
      sabor, 
      price 
    });

    await bebidaItem.save();
    res.json(bebidaItem);
  } catch (err) {
    res.status(500).json({ message: "Erro ao salvar a bebida." });
  }
};

exports.remove = async (req, res) => {
  try {
    const bebidaItem = await Bebida.findById(req.params.id);
    if (!bebidaItem) {
      return res.status(404).json({ message: "Bebida não encontrada." });
    }
    fs.unlinkSync(`uploads/${bebidaItem.img}`);
    await bebidaItem.remove();
    res.json({ message: "Bebida removida com sucesso." });
  } catch (err) {
    res.status(500).json({ message: "Erro ao remover a Bebida." });
  }
};

exports.findAll = async (req, res) => {
  try {
    const bebidas = await Bebida.find();
    res.json(bebidas);
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar as bebidas." });
  }
};
