// app.js
const express = require('express');
const path = require('path');
const session = require('express-session');
const authRoutes = require('./routes/auth.routes');
const guestRoutes = require('./routes/guest.routes');

const app = express();

// ===== Middleware =====
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use(express.static(path.join(__dirname, '../public')));

// Session
app.use(session({
  secret: 'sibetaSecretKey',
  resave: false,
  saveUninitialized: true,
}));

// ===== Routes =====
app.use('/login', authRoutes);
app.use('/logout', authRoutes);
app.use('/api/guest', guestRoutes);

// ===== View Engine =====
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

module.exports = app;
