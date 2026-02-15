const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Private routes
router.post('/dashboard', userController.dashboard);
router.put('/update-user-data', userController.updateUserData);
router.post('/trade/history', userController.tradeHistory);
module.exports = router;