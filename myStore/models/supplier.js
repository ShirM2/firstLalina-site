const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
    name: String,
    email: String,
    address: String,
    phone: String,
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
});

module.exports = mongoose.model('Supplier', supplierSchema);