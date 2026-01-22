// server.js
require('dotenv').config();           // Load .env
const app = require('./app');         // Import app.js
const connectDB = require('./config/db');

const PORT = process.env.PORT || 3000;

// 1. Connect ke MongoDB
connectDB()
  .then(() => {
    console.log('✅ MongoDB connected');

    // 2. Jalankan server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });
