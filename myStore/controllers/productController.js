// controllers/productController.js
const Product = require('../models/product');

exports.createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.redirect('/products');
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.updateProduct = async (req, res) => {
    try {
        await Product.findByIdAndUpdate(req.params.id, req.body);
        res.redirect('/products');
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.redirect('/products');
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.listProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.render('products', { products });
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.searchProducts = async (req, res) => {
    try {
        const { name, category, minPrice, maxPrice } = req.query;
        const query = {};

        if (name) {
            query.name = new RegExp(name, 'i'); // Case-insensitive regex search
        }
        if (category) {
            query.category = new RegExp(category, 'i'); // Case-insensitive regex search
        }
        if (minPrice) {
            query.price = { ...query.price, $gte: minPrice };
        }
        if (maxPrice) {
            query.price = { ...query.price, $lte: maxPrice };
        }

        const products = await Product.find(query);
        res.json(products); // Return JSON response
    } catch (err) {
        console.error('Search Error:', err);
        res.status(500).send(err);
    }
};

