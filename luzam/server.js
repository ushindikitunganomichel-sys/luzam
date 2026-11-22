const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('.'));
let users = [];
let messages = [];
app.post('/api/register', (req, res) => { users.push(req.body); res.json({ ok: true }); });
app.post('/api/message', (req, res) => { messages.push(req.body); res.json({ ok: true }); });
app.get('/api/messages', (req, res) => { res.json(messages); });
app.post('/api/ai', async (req, res) => {
  const question = (req.body.message || "").toLowerCase();
  let reponse = "";
  if (process.env.GEMINI_API_KEY) {
    try {
      const r = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + process.env.GEMINI_API_KEY, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: "Tu es l'IA de LUZAM, créée par USHINDI KITUNGANO MICHEL du Congo. Réponds en français, simple et sympa. Question: " + req.body.message }] }] })
      });
      const data = await r.json();
      reponse = data.candidates[0].content.parts[0].text;
      return res.json({ reply: reponse });
    } catch(e) {}
  }
  if (question.includes("bonjour") || question.includes("salut")) reponse = "Bonjour chef ! 👋 Moi c'est l'IA de LUZAM, créée par USHINDI KITUNGANO MICHEL. Comment je peux t'aider aujourd'hui ?";
  else if (question.includes("qui es") || question.includes("tu es qui")) reponse = "Je suis l'IA officielle de LUZAM, le réseau social mondial créé au Congo par USHINDI KITUNGANO MICHEL. Je peux t'aider à écrire, traduire, apprendre, et créer !";
  else if (question.includes("congo") || question.includes("bukavu") || question.includes("kinshasa")) reponse = "Le Congo 🇨🇩 c'est un grand pays au cœur de l'Afrique ! Bukavu c'est dans le Sud-Kivu, au bord du lac Kivu, c'est là que LUZAM est né !";
  else if (question.includes("merci")) reponse = "De rien chef ! C'est un plaisir de t'aider. Tu veux autre chose ?";
  else if (question.includes("luzam")) reponse = "LUZAM c'est le futur réseau social mondial ! Tu peux poster, discuter, rencontrer des gens du monde entier, et utiliser ton IA !";
  else reponse = "Super question ! '" + req.body.message + "' - Dis-moi plus de détails : tu veux une explication, un texte pour un post, ou une traduction ? Je suis là pour t'aider !";
  res.json({ reply: reponse });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("LUZAM en ligne"));
