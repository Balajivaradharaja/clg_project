const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  medicine: String,
  quantity: Number,
  price: Number
});

const invoiceSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  items: [itemSchema],
  total: Number
});

const customerSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  address: String,
  purchaseHistory: [invoiceSchema]
});

module.exports = mongoose.model('Customer', customerSchema);

