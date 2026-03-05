const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const loanController = require('../controllers/loanController');

const multer = require('multer');
const { apiRateLimiter } = require('../middleware/apiRateLimiter');
const upload = multer({ storage: multer.memoryStorage() });
const withdrawController = require('../controllers/withdrawController');

// Private routes
router.post('/dashboard', userController.dashboard);
router.put('/update-user-data', userController.updateUserData);
router.post('/trade/history', userController.tradeHistory);
router.post('/add/loan', upload.single('file'), apiRateLimiter(), loanController.addLoan);
router.post('/withdraw/funds', apiRateLimiter(), withdrawController.WithDrawFunds);
module.exports = router;