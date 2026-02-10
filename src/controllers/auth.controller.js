const User = require('../../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

console.log('LOGIN CONTROLLER KEHIT');
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: 'Username dan password wajib diisi'
      });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({
        message: 'Username atau password salah'
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: 'Username atau password salah'
      });
    }

    req.session.user = {
      id: user._id,
      username: user.username,
      role: user.role
    };

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        role: user.role
      },
      process.env.JWT_SECRET || 'sibeta-secret',
      { expiresIn: '1d' }
    );

    res.status(200).json({
      message: 'Login berhasil',
      token,
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

// logout
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('LOGOUT ERROR:', err);
      return res.status(500).json({ message: 'Logout gagal' });
    }
    res.redirect('/login.html');
  });
};
