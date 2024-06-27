// middleware/validation.js
const { check } = require('express-validator');

exports.registerValidation = [
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password is required').isLength({ min: 6 }),
    check('role', 'Role is required').isIn(['customer', 'supplier'])
];

exports.loginValidation = [
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password is required').exists()
];
