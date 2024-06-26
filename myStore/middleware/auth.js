// middleware/auth.js
const jwt = require('jsonwebtoken');

exports.isAuthenticated = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, 'secretKey');
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

exports.isSupplier = (req, res, next) => {
    if (req.user.role !== 'supplier') {
        return res.status(403).json({ msg: 'Access denied' });
    }
    next();
};

exports.isCustomer = (req, res, next) => {
    if (req.user.role !== 'customer') {
        return res.status(403).json({ msg: 'Access denied' });
    }
    next();
};
