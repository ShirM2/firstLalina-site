const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

// Register Controller
exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("Validation errors:", errors.array());
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password, role } = req.body;
    try {
        let user = await User.findOne({ username });
        if (user) {
            console.log("User already exists");
            return res.status(400).json({ msg: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user = new User({
            username,
            password: hashedPassword,
            role
        });
        await user.save();

        const payload = { userId: user.id, role: user.role };
        const token = jwt.sign(payload, 'secretKey', { expiresIn: '1h' });

        // Redirect to login page after successful registration
        res.redirect('/login');
    } catch (err) {
        console.error("Error in register controller:", err.message);
        res.status(500).send('Server error');
    }
};

// Login Controller
exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log("Validation errors:", errors.array());
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            console.log("Invalid credentials: user not found");
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Invalid credentials: password mismatch");
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const payload = { userId: user.id, role: user.role };
        const token = jwt.sign(payload, 'secretKey', { expiresIn: '1h' });

        // Redirect to products page after successful login
        res.redirect('/products');
    } catch (err) {
        console.error("Error in login controller:", err.message);
        res.status(500).send('Server error');
    }
};
