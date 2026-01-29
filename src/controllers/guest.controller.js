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
