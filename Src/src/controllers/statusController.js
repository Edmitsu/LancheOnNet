const Pedido = require('../models/pedidos');

exports.getStatus = async (req, res) => {
  try {
    const status = await Pedido.find({ status: req.params.status });
    res.status(200).json(status);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
