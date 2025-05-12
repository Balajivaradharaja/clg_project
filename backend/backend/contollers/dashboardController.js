const Medicine = require('../models/Medicine');
const Bill = require('../models/Bill');

exports.getDashboardStats = async (req, res) => {
  try {
    const stockCount = await Medicine.countDocuments();
    const totalSales = (await Bill.find()).reduce((sum, bill) => sum + bill.totalAmount, 0);
    const billCount = await Bill.countDocuments();
    res.json({ totalStock: stockCount, totalSales, totalBills: billCount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


