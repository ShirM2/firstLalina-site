// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { registerValidation, loginValidation } = require('../middleware/validation');

router.get('/register', (req, res) => {
    res.render('layout', { 
        user: req.session.user, 
        content: `
            <h1>Register</h1>
            <form action="/register" method="POST">
                <input type="text" name="username" placeholder="Username" required>
                <input type="password" name="password" placeholder="Password" required>
                <select name="role" required>
                    <option value="customer">Customer</option>
                    <option value="supplier">Supplier</option>
                </select>
                <button type="submit">Register</button>
            </form>
        `
    });
});

router.post('/register', registerValidation, authController.register);

router.get('/login', (req, res) => {
    res.render('layout', { 
        user: req.session.user, 
        content: `
            <h1>Login</h1>
            <form action="/login" method="POST">
                <input type="text" name="username" placeholder="Username" required>
                <input type="password" name="password" placeholder="Password" required>
                <button type="submit">Login</button>
            </form>
        `
    });
});

router.post('/login', loginValidation, authController.login);

module.exports = router;
