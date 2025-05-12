const express = require('express');
const router = express.Router();
const customerController = require('../contollers/customerController');

router.get('/', customerController.getCustomers);
router.post('/', customerController.addCustomer);
router.put('/:id', customerController.updateCustomer);
router.delete('/:id', customerController.deleteCustomer);

module.exports = router;
