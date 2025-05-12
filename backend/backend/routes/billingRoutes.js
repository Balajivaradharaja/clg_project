// const express = require('express');
// const router = express.Router();
// const billingController = require('../contollers/billingController'); 

// router.get('/bills', billingController.getBills);
// router.post('/bills', billingController.addBill);
// router.delete('/bills/:id', billingController.deleteBill);

// module.exports = router;

// const express = require('express');
// const router = express.Router();
// const Bill = require('../models/Bill');
// const billController = require('../contollers/billController');

// router.get('/', async (req, res) => {
//   const bills = await Bill.find();
//   res.json(bills);
// });

// router.post('/', async (req, res) => {
//   try {
//     const { customerName, customerPhone, items } = req.body;
//     const totalAmount = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
//     const bill = new Bill({ customerName, customerPhone, items, totalAmount });
//     await bill.save();
//     res.status(201).json(bill);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// router.delete('/:id', async (req, res) => {
//   try {
//     await Bill.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Bill deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const billController = require('../contollers/billingController');

router.get('/', billController.getBills);
router.post('/', billController.createBill);
router.delete('/:id', billController.deleteBill);
router.put('/:id', billController.updateBill);

module.exports = router;
