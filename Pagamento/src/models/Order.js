const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerEmail: String,
  orderDetails: Object,
  orderDate: Date,
});

module.exports = mongoose.model("Order", orderSchema);
