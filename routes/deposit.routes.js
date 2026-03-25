const express = require('express');
const depositController = require('../controllers/deposit.controller');
const { authenticate } = require('../middleware/auth');
const router = express.Router();

// routes
router.post('/create', depositController.createDeposit);
router.post('/list', depositController.getDepositsByUser);

module.exports = router;