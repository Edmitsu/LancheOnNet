const mongoose = require('mongoose');

const StatusSchema = new mongoose.Schema({
  id: Number,
  tipo: String,
});

module.exports = mongoose.model('Status', StatusSchema);
