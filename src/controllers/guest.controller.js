const Guest = require('../../models/guests');

exports.createGuest = async (req, res) => {
  try {
    const { nama, instansi, keperluan, noHp, catatan } = req.body;

    // Validasi
    if (!nama || !instansi || !keperluan) {
      return res.status(400).json({
        message: 'Nama, instansi, dan keperluan wajib diisi'
      });
    }

    // Simpan ke MongoDB
    const guest = await Guest.create({
      nama,
      instansi,
      keperluan,
      noHp,
      catatan
    });

    res.status(201).json({
      message: 'Tamu berhasil dicatat',
      data: guest
    });

  } catch (error) {
    console.error('CREATE GUEST ERROR:', error);
    res.status(500).json({
      message: 'Server error'
    });
  }
};

exports.getGuestsToday = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const guests = await Guest.find({
      tanggal: {
        $gte: today,
        $lt: tomorrow
      }
    }).sort({ jamDatang: -1 });

    res.json({
      data: guests
    });

  } catch (error) {
    console.error('GET GUEST TODAY ERROR:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.setGuestPulang = async (req, res) => {
  try {
    await Guest.findByIdAndUpdate(req.params.id, {
      status: 'Sudah Pulang',
      jamPulang: new Date()
    });

    res.json({ message: 'Status diperbarui' });
  } catch (err) {
    res.status(500).json({ message: 'Gagal update' });
  }
};
