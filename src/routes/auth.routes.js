const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// ===== MIDDLEWARE PROTECT =====
const protectRoute = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/login.html');
  }
  next();
};

// ===== ROUTES =====
// POST /auth (login)
router.post('/', authController.login);

// GET /logout
router.get('/logout', authController.logout);

// EXPORT MIDDLEWARE AGAR BISA DIPAKAI DI APP.JS
module.exports = router;
module.exports.protectRoute = protectRoute;
