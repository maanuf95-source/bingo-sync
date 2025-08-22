const express = require('express');
const { createServer } = require('http');
const { WebSocketServer } = require('ws');

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });

// Хранит всех клиентов
const clients = new Set();

// Простая HTTP-страница (необязательно)
app.get('/', (req, res) => {
  res.send('Сервер синхронизации запущен ✅');
});

// WebSocket
wss.on('connection', (socket) => {
  console.log('📱 Клиент подключился');
  clients.add(socket);

  socket.on('message', (data) => {
    const message = data.toString().trim();
    if (message === 'spin') {
      console.log('🎉 Получен SPIN! Рассылаем всем...');
      clients.forEach(client => {
        if (client.readyState === client.OPEN) {
          client.send('SPIN_NOW');
        }
      });
    }
  });

  socket.on('close', () => {
    clients.delete(socket);
    console.log('🔌 Клиент отключился');
  });
});

// Порт от Render
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Сервер синхронизации запущен на порту ${PORT}`);
});
