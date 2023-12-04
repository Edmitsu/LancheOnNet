const fs = require("fs");
const Bebida = require("../models/bebidas");

exports.create = async (req, res) => {
  try {
    const { name, quantity, description, price } = req.body;
    const file = req.file;

    const bebidaItem = new Bebida({
      quantity,
      name,
      img: file.path,
      description,
      price,
    });

    await bebidaItem.save();
    res.json(bebidaItem);
  } catch (err) {
    res.status(500).json({ message: "Erro ao salvar a bebida." });
  }
};

exports.remove = async (req, res) => {
  try {
    const bebidaId = req.params.id;

    const bebidaItem = await Bebida.findById(bebidaId);
    if (!bebidaItem) {
      return res.status(404).json({ message: "Bebida não encontrada." });
    }

    fs.unlinkSync(bebidaItem.img);

    // Remova a bebida com base no _id
    await Bebida.findByIdAndRemove(bebidaId);

    res.json({ message: "Bebida removida com sucesso." });
  } catch (err) {
    res.status(500).json({ message: "Erro ao remover a bebida." });
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

exports.update = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const file = req.file;
    const bebidaId = req.params.id;

    const bebidaItem = await Bebida.findById(bebidaId);

    if (!bebidaItem) {
      return res.status(404).json({ message: "Bebida não encontrada." });
    }

    if (name) bebidaItem.name = name;
    if (description) bebidaItem.description = description;
    if (price) bebidaItem.price = price;
    if (file) {
      fs.unlinkSync(bebidaItem.img);
      bebidaItem.img = file.path;
    }

    await bebidaItem.save();
    res.json(bebidaItem);
  } catch (err) {
    res.status(500).json({ message: "Erro ao atualizar a bebida." });
  }
};
