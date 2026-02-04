const express = require('express');
const router = express.Router();
const guestController = require('../controllers/guest.controller');

// TAMU DATANG
router.post('/', guestController.createGuest);

// TAMU HARI INI (UNTUK PULANG & SEARCH)
router.get('/today', guestController.getGuestsToday);

router.put('/:id/pulang', guestController.setGuestPulang);

module.exports = router;

