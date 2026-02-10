const express = require('express');
const path = require('path');
const session = require('express-session');
const authRoutes = require('./routes/auth.routes');
const { protectRoute } = require('./routes/auth.routes');
const authController = require('./controllers/auth.controller');
const guestRoutes = require('./routes/guest.routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../public')));

app.use(session({
  secret: 'sibetaSecretKey',
  resave: false,
  saveUninitialized: true,
}));

app.use('/auth', authRoutes);
app.get('/logout', authController.logout);
app.use('/api/guests', guestRoutes);

app.get('/dashboard.html', protectRoute, (req, res) => {
  res.sendFile(path.join(__dirname, '../public/dashboard.html'));
});

app.get('/welcome.html', protectRoute, (req, res) => {
  res.sendFile(path.join(__dirname, '../public/welcome.html'));
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/terimakasih.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/terimakasih.html'));
});

app.get('/rekap.html', protectRoute, (req, res) => {
  res.sendFile(path.join(__dirname, '../public/rekap.html'));
});

module.exports = app;
