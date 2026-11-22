const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('.'));
let users = [];
let messages = [];
app.post('/api/register', (req, res) => {
  users.push(req.body);
  res.json({ ok: true });
});
app.post('/api/message', (req, res) => {
  messages.push(req.body);
  res.json({ ok: true });
});
app.get('/api/messages', (req, res) => { res.json(messages); });
app.listen(3000, () => console.log("LUZAM en ligne"));