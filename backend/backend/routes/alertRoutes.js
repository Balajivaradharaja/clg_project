const express = require('express');
const router = express.Router();
const {sendAlertSMS} = require('../contollers/alertContoller');

// POST /api/alerts/sms
router.post('/sms', sendAlertSMS);

module.exports = router;

