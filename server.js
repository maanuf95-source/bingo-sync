const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors()); // ← КРИТИЧНО!
app.use(express.json());

// Храним последнее действие
let lastAction = { type: null, timestamp: 0 };

// ✅ Этот маршрут нужен
app.get('/last-action', (req, res) => {
  res.json(lastAction);
});

// ✅ Этот маршрут нужен
app.post('/spin', (req, res) => {
  lastAction = { type: 'spin', timestamp: Date.now() };
  res.json({ success: true, timestamp: lastAction.timestamp });
});

// ✅ Главная страница — чтобы видеть, что сервер жив
app.get('/', (req, res) => {
  res.send('Сервер синхронизации запущен ✅');
});

// Порт от Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
