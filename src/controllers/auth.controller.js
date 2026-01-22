const User = require('../../models/users');
const bcrypt = require('bcryptjs');

/**
 * =========================
 * LOGIN ADMIN
 * =========================
 */
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Username dan password wajib diisi' });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Akun tidak ditemukan' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Password salah' });
    }

    // Simpan session
    req.session.user = {
      id: user._id,
      username: user.username
    };

    res.json({ message: 'Login berhasil' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * =========================
 * LOGOUT
 * =========================
 */
exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.json({ message: 'Logout berhasil' });
  });
};
