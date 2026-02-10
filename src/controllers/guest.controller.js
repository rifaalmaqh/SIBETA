const Guest = require('../../models/guests');

exports.createGuest = async (req, res) => {
  try {
    const { nama, instansi, keperluan, noHp, catatan } = req.body;

    if (!nama || !instansi || !keperluan) {
      return res.status(400).json({
        message: 'Nama, instansi, dan keperluan wajib diisi'
      });
    }

    const guest = await Guest.create({
      nama,
      instansi,
      keperluan,
      noHp,
      catatan
    });

    const io = req.app.get('io');
    if (io) io.emit('guest:created', guest);

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
    const updated = await Guest.findByIdAndUpdate(req.params.id, {
      status: 'Sudah Pulang',
      jamPulang: new Date()
    }, { new: true });

    const io = req.app.get('io');
    if (io) io.emit('guest:updated', updated);

    res.json({ message: 'Status diperbarui' });
  } catch (err) {
    res.status(500).json({ message: 'Gagal update' });
  }
};

//REKAP
exports.getRekapByDate = async (req, res) => {
  try {
    const { start, end } = req.query;

    if (!start || !end) {
      return res.status(400).json({ message: 'Tanggal tidak lengkap' });
    }

    const startDate = new Date(start);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(end);
    endDate.setHours(23, 59, 59, 999);

    const guests = await Guest.find({
      tanggal: {
        $gte: startDate,
        $lte: endDate
      }
    }).sort({ jamDatang: 1 });

    res.json({ data: guests });

  } catch (err) {
    console.error('GET REKAP ERROR:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
