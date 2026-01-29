const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true
  },
  instansi: {
    type: String,
    required: true
  },
  keperluan: {
    type: String,
    required: true
  },
  noHp: {
    type: String
  },
  catatan: {
    type: String
  },
  tanggal: {
    type: Date,
    default: () => {
      const d = new Date();
      d.setHours(0, 0, 0, 0);
      return d;
    }
  },
  jamDatang: {
    type: Date,
    default: Date.now
  },
  jamPulang: {
    type: Date,
    default: null
  },
  status: {
    type: String,
    enum: ['Belum Pulang', 'Sudah Pulang'],
    default: 'Belum Pulang'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Guest', guestSchema);
