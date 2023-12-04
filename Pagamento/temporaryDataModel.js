
const mongoose = require('mongoose');

const temporaryDataSchema = new mongoose.Schema({
  carrinhoItens: { type: Array, required: true },
});

const TemporaryData = mongoose.model('TemporaryData', temporaryDataSchema);

module.exports = TemporaryData;
