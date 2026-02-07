const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Private routes
router.get('/dashboard', userController.dashboard);

module.exports = router;