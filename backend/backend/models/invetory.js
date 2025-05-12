const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  name: String,
  stock: Number,
  expiry_date: Date,
  mfg_date: Date,
  shelf_life_months: Number,
  price: Number,
});

module.exports = mongoose.model('Inventory', inventorySchema);
