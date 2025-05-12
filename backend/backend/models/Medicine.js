const mongoose = require('mongoose');

const MedicineSchema = new mongoose.Schema({
  name: String,
  stock: Number,
  mfg_date: String,
  shelf_life_months: Number
});

module.exports = mongoose.model('Medicine', MedicineSchema);
