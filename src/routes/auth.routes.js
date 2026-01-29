const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// POST /login
router.post('/', authController.login);

module.exports = router;
