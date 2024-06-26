// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { isAuthenticated, isSupplier } = require('../middleware/auth');

router.get('/products', productController.listProducts);
router.get('/sapir', productController.sapir);

router.post('/products', isAuthenticated, isSupplier, productController.createProduct);
router.put('/products/:id', isAuthenticated, isSupplier, productController.updateProduct);
router.delete('/products/:id', isAuthenticated, isSupplier, productController.deleteProduct);
router.get('/products/search', productController.searchProducts);
router.get('/products/new', isAuthenticated, isSupplier, (req, res) => {
    res.render('addProduct');
});

module.exports = router;
