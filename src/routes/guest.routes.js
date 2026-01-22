const express = require('express');
const router = express.Router();

const {
  createGuest,
  getTodayGuests,
  setGuestPulang,
  getRekap
} = require('../controllers/guest.controller');

// TAMU DATANG
router.post('/', createGuest);

// DATA TAMU HARI INI
router.get('/today', getTodayGuests);

// TAMU PULANG
router.put('/:id/pulang', setGuestPulang);

// REKAP
router.get('/rekap', getRekap);

module.exports = router;
