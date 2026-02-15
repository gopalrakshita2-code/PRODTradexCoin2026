const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Private routes
router.post('/dashboard', userController.dashboard);
// router.post('/dashboard/trade', userController.trade);
// router.post('/dashboard/trade/history', userController.tradeHistory);
module.exports = router;