// app.js
const db = require('./config/db');
const express = require('express');
const session = require('express-session');
const methodOverride = require('method-override');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(session({ secret: 'secretKey', resave: false, saveUninitialized: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

// Middleware to make the user available in views
app.use((req, res, next) => {
    res.locals.user = req.session.user;
    next();
});

app.use(authRoutes);
app.use(productRoutes);
app.use(cartRoutes);

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/');
        }
        res.clearCookie('connect.sid');
        res.redirect('/login');
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
