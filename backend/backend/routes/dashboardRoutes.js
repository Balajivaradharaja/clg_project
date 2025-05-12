const express = require('express');
const router = express.Router();
const contoller = require('../contollers/dashboardController');

router.get('/', contoller.getDashboardStats);

module.exports = router;

