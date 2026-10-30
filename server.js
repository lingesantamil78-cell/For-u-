const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'responses.json');
app.use(cors());
app.use(express.json({ limit: '20kb' }));
app.get('/api/health', (_req, res) => res.json({ ok: true }));
app.post('/api/replies', (req, res) => {
  const { name, note = '', answers = [], createdAt } = req.body || {};
  if (typeof name !== 'string' || !name.trim() || name.length > 40) return res.status(400).json({ error: 'A valid name is required.' });
  if (typeof note !== 'string' || note.length > 500 || !Array.isArray(answers) || answers.length > 8) return res.status(400).json({ error: 'Invalid reply.' });
  try {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    const rows = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    rows.push({ name: name.trim(), note: note.trim(), answers, createdAt: createdAt || new Date().toISOString() });
    fs.writeFileSync(DATA_FILE, JSON.stringify(rows, null, 2));
    res.status(201).json({ saved: true });
  } catch (error) { res.status(500).json({ error: 'Could not save reply.' }); }
});
app.listen(PORT, () => console.log(`Friendship gift backend listening on ${PORT}`));
