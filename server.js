const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origin: "https://bingomoscow.online",
    methods: ["GET", "POST"],
    credentials: true
  }
});

let isSpinning = false;

io.on('connection', (socket) => {
  console.log('Пользователь подключился:', socket.id);
  socket.emit('wheel:state', { spinning: isSpinning });

  socket.on('wheel:spin', () => {
    console.log('Крутим колесо!');
    if (!isSpinning) {
      isSpinning = true;
      io.emit('wheel:spin');
      setTimeout(() => {
        isSpinning = false;
        io.emit('wheel:stop');
      }, 3000);
    }
  });

  socket.on('disconnect', () => {
    console.log('Пользователь отключился');
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
