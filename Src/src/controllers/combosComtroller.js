const fs = require("fs");
const Combo = require("../models/combos");

exports.create = async (req, res) => {
  const { name, description, quantity, price } = req.body;
  const file = req.file;

  const combo = new Combo({
    quantity,
    name,
    description,
    img: file.path,
    price,
  });

  await combo.save();
  res.json(combo);
};

exports.remove = async (req, res) => {
  const comboId = req.params.id;

  const combo = await Combo.findById(comboId);
  if (!combo) {
    return res.status(404).json({ message: "Combo não encontrado." });
  }

  fs.unlinkSync(combo.img);

  await Combo.findByIdAndRemove(comboId);

  res.json({ message: "Combo removido com sucesso." });
};

exports.findAll = async (req, res) => {
  const combos = await Combo.find();
  res.json(combos);
};

exports.update = async (req, res) => {
  const { name, description, price } = req.body;
  const file = req.file;
  const comboId = req.params.id;

  const combo = await Combo.findById(comboId);

  if (!combo) {
    return res.status(404).json({ message: "Combo não encontrado." });
  }

  if (name) combo.name = name;
  if (description) combo.description = description;
  if (price) combo.price = price;
  if (file) {
    fs.unlinkSync(combo.img);
    combo.img = file.path;
  }

  await combo.save();
  res.json(combo);
};












