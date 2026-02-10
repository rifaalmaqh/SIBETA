// server.js
require('dotenv').config();           
const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');         
const connectDB = require('./config/db');

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "*" }
});

app.set('io', io);

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Connect ke MongoDB
connectDB()
  .then(() => {
    console.log('MongoDB connected');

    server.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
