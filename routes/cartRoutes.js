// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { isAuthenticated, isCustomer } = require('../middleware/auth');

router.get('/cart', isAuthenticated, isCustomer, cartController.getCart);
router.post('/cart', isAuthenticated, isCustomer, cartController.addToCart);
router.delete('/cart', isAuthenticated, isCustomer, cartController.removeFromCart);

module.exports = router;
