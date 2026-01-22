const Guest = require('../../models/guests');

/**
 * =========================
 * TAMU DATANG
 * =========================
 */
exports.createGuest = async (req, res) => {
  try {
    const { nama, instansi, keperluan, noHp, catatan } = req.body;

    if (!nama || !instansi || !keperluan) {
      return res.status(400).json({ message: 'Data wajib belum lengkap' });
    }

    const guest = new Guest({
      nama,
      instansi,
      keperluan,
      noHp,
      catatan,
      tanggal: new Date(),
      jamDatang: new Date(),
      status: 'Belum Pulang'
    });

    await guest.save();

    res.status(201).json({
      message: 'Tamu berhasil dicatat',
      data: guest
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * =========================
 * TAMU HARI INI
 * =========================
 */
exports.getTodayGuests = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const guests = await Guest.find({
      tanggal: { $gte: today }
    }).sort({ jamDatang: -1 });

    res.json(guests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * =========================
 * TAMU PULANG
 * =========================
 */
exports.setGuestPulang = async (req, res) => {
  try {
    const { id } = req.params;

    const guest = await Guest.findByIdAndUpdate(
      id,
      {
        status: 'Sudah Pulang',
        jamPulang: new Date()
      },
      { new: true }
    );

    if (!guest) {
      return res.status(404).json({ message: 'Tamu tidak ditemukan' });
    }

    res.json({
      message: 'Status tamu berhasil diupdate',
      data: guest
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * =========================
 * REKAP (FLEKSIBEL)
 * =========================
 */
exports.getRekap = async (req, res) => {
  try {
    const { start, end } = req.query;

    if (!start || !end) {
      return res.status(400).json({ message: 'Parameter tanggal tidak lengkap' });
    }

    const guests = await Guest.find({
      tanggal: {
        $gte: new Date(start),
        $lte: new Date(end)
      }
    }).sort({ jamDatang: -1 });

    res.json(guests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
