const express = require('express');
const router = express.Router();
const guestController = require('../controllers/guest.controller');

// tamu dtng
router.post('/', guestController.createGuest);

// tamu hr ini
router.get('/today', guestController.getGuestsToday);

router.put('/:id/pulang', guestController.setGuestPulang);

// rekap dr tnggl     
router.get('/rekap', guestController.getRekapByDate);

module.exports = router;

