const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/users');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected');

    await User.deleteMany({ role: 'admin' });

    const admins = [
      { name: 'Admin 1', username: 'admin', password: 'admin123' },
      { name: 'Admin 2', username: 'admin2', password: 'admin123' },
      { name: 'Admin 3', username: 'admin3', password: 'admin123' },
      { name: 'Admin 4', username: 'admin4', password: 'admin123' },
      { name: 'Admin 5', username: 'admin5', password: 'admin123' }
    ];

    for (let admin of admins) {
      const hashed = await bcrypt.hash(admin.password, 10);

      await User.create({
        name: admin.name,
        username: admin.username,
        password: hashed,
        role: 'admin'
      });
    }

    console.log('✅ Admin seed selesai');
    process.exit();
  })
  .catch(err => console.error(err));
