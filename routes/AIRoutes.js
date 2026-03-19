const express = require('express');
const router = express.Router();
const AIController = require('../controllers/AIController')

// Public routes
router.post('/user-ai-history', AIController.getUserAITradeHistory);
router.put('/new-trade', AIController.updateBalanceAiTrade);

module.exports = router;