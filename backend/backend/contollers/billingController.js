// const Bill = require('../models/Bill');

// // Get all bills
// exports.getBills = async (req, res) => {
//   try {
//     const bills = await Bill.find();
//     res.json(bills);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Add a new bill
// exports.addBill = async (req, res) => {
//   try {
//     const { customerName, items } = req.body;

//     const totalAmount = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

//     const bill = new Bill({
//       customerName,
//       items,
//       totalAmount
//     });

//     await bill.save();
//     res.status(201).json(bill);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Delete a bill by ID
// exports.deleteBill = async (req, res) => {
//   try {
//     await Bill.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Bill deleted' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// const Bill = require('../models/Bill'); // Make sure the path and filename match your model

// // Get all bills
// const getBills = async (req, res) => {
//   try {
//     const bills = await Bill.find();
//     res.json(bills);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Add a new bill
// const addBill = async (req, res) => {
//   try {
//     const { customerName, items } = req.body;

//     const totalAmount = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

//     const bill = new Bill({
//       customerName,
//       items,
//       totalAmount
//     });

//     await bill.save();
//     res.status(201).json(bill);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };



// // Delete a bill by ID
// const deleteBill = async (req, res) => {
//   try {
//     await Bill.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Bill deleted' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


const Bill = require('../models/Bill');

// Get all bills
exports.getBills = async (req, res) => {
  try {
    const bills = await Bill.find();
    res.json(bills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a bill
exports.createBill = async (req, res) => {
  try {
    const { customerName, customerPhone, items } = req.body;
    const totalAmount = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const bill = new Bill({ customerName, customerPhone, items, totalAmount });
    await bill.save();
    res.status(201).json(bill);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a bill
exports.deleteBill = async (req, res) => {
  try {
    await Bill.findByIdAndDelete(req.params.id);
    res.json({ message: 'Bill deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Save a new bill with total (alternative method)
const saveBill = async (req, res) => {
  try {
    const { customerName, items, total } = req.body;

    const newBill = new Bill({ customerName, items, totalAmount: total });
    await newBill.save();

    res.status(201).json(newBill);
  } catch (error) {
    res.status(500).json({ message: 'Error saving bill', error });
  }
};

exports.getBillById = async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id);
    if (!bill) {
      return res.status(404).json({ message: 'Bill not found' });
    }
    res.json(bill);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};  
exports.updateBill = async (req, res) => {
  try {
    const { customerName, items } = req.body;
    const totalAmount = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const updatedBill = await Bill.find
ByIdAndUpdate(
      req.params.id,
      { customerName, items, totalAmount },
      { new: true }
    );
    if (!updatedBill) {
      return res.status(404).json({ message: 'Bill not found' });
    }
    res.json(updatedBill);
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
}
//


    // module.exports = {
    //   getBills,
    //   addBill,
    //   saveBill,
    //   deleteBill
    // };