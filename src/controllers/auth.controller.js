const User = require('../../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

console.log('LOGIN CONTROLLER KEHIT');
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // 1️⃣ Cek input
    if (!username || !password) {
      return res.status(400).json({
        message: 'Username dan password wajib diisi'
      });
    }

    // 2️⃣ Cari user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({
        message: 'Username atau password salah'
      });
    }

    // 3️⃣ Cek password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: 'Username atau password salah'
      });
    }

    // 4️⃣ Simpan session (INI YANG DIPAKAI DASHBOARD)
    req.session.user = {
      id: user._id,
      username: user.username,
      role: user.role
    };

    // 5️⃣ (OPSIONAL) Generate JWT
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        role: user.role
      },
      process.env.JWT_SECRET || 'sibeta-secret',
      { expiresIn: '1d' }
    );

    // 6️⃣ Response sukses
    res.status(200).json({
      message: 'Login berhasil',
      token, // boleh dipakai / diabaikan
      user: {
        username: user.username,
        role: user.role
      }
    });

  } catch (error) {
    console.error('LOGIN ERROR:', error);
    res.status(500).json({
      message: 'Server error'
    });
  }
};
