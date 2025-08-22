const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let lastAction = { type: null, timestamp: 0 };

app.get('/last-action', (req, res) => {
  res.json(lastAction);
});

app.post('/spin', (req, res) => {
  lastAction = { type: 'spin', timestamp: Date.now() };
  res.json({ success: true, timestamp: lastAction.timestamp });
});

app.get('/', (req, res) => {
  res.send('Сервер синхронизации запущен ✅');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
