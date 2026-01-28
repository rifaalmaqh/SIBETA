const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema({
  nama: String,
  instansi: String,
  keperluan: String,
  noHp: String,
  catatan: String,

  tanggal: Date,
  jamDatang: Date,
  jamPulang: Date,

  status: {
    type: String,
    default: 'Belum Pulang'
  }
});

module.exports = mongoose.model('Guest', guestSchema);
