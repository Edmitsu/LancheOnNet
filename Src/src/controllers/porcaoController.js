const fs = require("fs");
const Porcao = require("../models/porcao");

exports.create = async (req, res) => {
  const { name, description, quantity, price } = req.body;
  const file = req.file;

  const porcao = new Porcao({
    quantity,
    name,
    description,
    img: file.path,
    price,
  });

  await porcao.save();
  res.json(porcao);
};

exports.remove = async (req, res) => {
  const porcaoId = req.params.id;

  const porcao = await Porcao.findById(porcaoId);
  if (!porcao) {
    return res.status(404).json({ message: "Porção não encontrada." });
  }

  fs.unlinkSync(porcao.img);

  await Porcao.findByIdAndRemove(porcaoId);

  res.json({ message: "Porção removida com sucesso." });
};

exports.findAll = async (req, res) => {
  const porcoes = await Porcao.find();
  res.json(porcoes);
};

exports.update = async (req, res) => {
  const { name, description, price } = req.body;
  const file = req.file;
  const porcaoId = req.params.id;

  const porcao = await Porcao.findById(porcaoId);

  if (!porcao) {
    return res.status(404).json({ message: "Porção não encontrada." });
  }

  if (name) porcao.name = name;
  if (description) porcao.description = description;
  if (price) porcao.price = price;
  if (file) {
    fs.unlinkSync(porcao.img);
    porcao.img = file.path;
  }

  await porcao.save();
  res.json(porcao);
};
