const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Храним последнее действие
let lastAction = { type: null, timestamp: 0 };

// Получить последнее действие
app.get('/last-action', (req, res) => {
  res.json(lastAction);
});

// Принять команду "крутить"
app.post('/spin', (req, res) => {
  lastAction = { type: 'spin', timestamp: Date.now() };
  console.log('SPIN получен и сохранён');
  res.json({ success: true, timestamp: lastAction.timestamp });
});

// Главная страница — для проверки
app.get('/', (req, res) => {
  res.send('Сервер синхронизации запущен ✅');
});

// Порт от Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
