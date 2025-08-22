const express = require('express');
const { createServer } = require('http');
const { WebSocketServer } = require('ws');

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

// Все подключённые клиенты
const clients = new Set();

// Раздаем статические файлы (если нужно)
app.use(express.static('public'));

// WebSocket: обработка подключений
wss.on('connection', (socket) => {
  console.log('Клиент подключился');
  clients.add(socket);

  socket.on('message', (data) => {
    const message = data.toString();
    if (message === 'spin') {
      console.log('Получен сигнал SPIN! Рассылаем всем...');
      // Рассылаем всем, кроме отправителя (или всем — как удобно)
      clients.forEach(client => {
        if (client.readyState === client.OPEN) {
          client.send('SPIN_NOW');
        }
      });
    }
  });

  socket.on('close', () => {
    clients.delete(socket);
    console.log('Клиент отключился');
  });
});

// Порт от Render
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
