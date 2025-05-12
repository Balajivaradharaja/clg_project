const express = require('express');
const router = express.Router();
const inventoryController = require('../contollers/inventoryController');

router.get('/', inventoryController.getInventory);
router.post('/', inventoryController.addMedicine);
router.put('/:id', inventoryController.updateMedicine);
router.delete('/:id', inventoryController.deleteMedicine);
router.post('/predict-expiry', inventoryController.predictExpiry);

module.exports = router;

        