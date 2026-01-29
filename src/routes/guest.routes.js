const express = require('express');
const router = express.Router();
const guestController = require('../controllers/guest.controller');

// TAMU DATANG
router.post('/', guestController.createGuest);

module.exports = router;
