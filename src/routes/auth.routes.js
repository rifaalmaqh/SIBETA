const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

const protectRoute = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/login.html');
  }
  next();
};

// routes login
router.post('/', authController.login);

//get logout
router.get('/logout', authController.logout);

module.exports = router;
module.exports.protectRoute = protectRoute;
