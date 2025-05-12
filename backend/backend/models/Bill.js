// const mongoose = require('mongoose');

// const BillSchema = new mongoose.Schema({
//   customerName: { type: String, required: true },
//   items: { type: Array, required: true },
//   totalAmount: { type: Number, required: true },
//   date: { type: Date, default: Date.now }
// });

// module.exports = mongoose.models.Bill || mongoose.model('Bill', BillSchema);
// const mongoose = require('mongoose');

// const billSchema = new mongoose.Schema({
//   customerName: {
//     type: String,
//     required: true
//   },
//   items: [
//     {
//       name: { type: String, required: true },
//       qty: { type: Number, required: true },
//       price: { type: Number, required: true }
//     }
//   ],
//   total: {
//     type: Number,
//     required: true
//   }
// }, { timestamps: true });

// module.exports = mongoose.model('Bill', billSchema);


const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  medicine: String,
  quantity: Number,
  price: Number,
});

const billSchema = new mongoose.Schema({
  customerName: String,
  customerPhone: String,
  items: [itemSchema],
  totalAmount: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Bill', billSchema);

