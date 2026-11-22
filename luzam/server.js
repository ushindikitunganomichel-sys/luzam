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

// === VRAIE IA DE LUZAM ===
app.post('/api/ai', async (req, res) => {
  const question = (req.body.message || "").toLowerCase();
  let reponse = "";

  // Si tu as mis une clé Gemini dans Render, on utilise la vraie IA Google
  if (process.env.GEMINI_API_KEY) {
    try {
      const r = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + process.env.GEMINI_API_KEY, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: "Tu es l'IA de LUZAM, créée par USHINDI KITUNGANO MICHEL du Congo. Réponds en français, simple et sympa. Question: " + req.body.message }] }] })
      });
      const data = await r.json();
      reponse = data.candidates[0].content.parts[0].text;
      return res.json({ reply: reponse });
    } catch(e) { }
  }

  // Sinon, IA intelligente locale - elle comprend vraiment
  if (question.includes("bonjour") || question.includes("salut") || question.includes("hello")) reponse = "Bonjour chef ! 👋 Moi c'est l'IA de LUZAM, créée par USHINDI KITUNGANO MICHEL. Comment je peux t'aider aujourd'hui ?";
  else if (question.includes("qui es") || question.includes("ton nom") || question.includes("tu es qui")) reponse = "Je suis l'IA officielle de LUZAM, le réseau social mondial créé au Congo par USHINDI KITUNGANO MICHEL. Je peux t'aider à écrire, traduire, apprendre, et créer !";
  else if (question.includes("congo") || question.includes("bukavu") || question.includes("kinshasa")) reponse = "Le Congo 🇨🇩 c'est un grand pays au cœur de l'Afrique ! Bukavu c'est dans le Sud-Kivu, au bord du lac Kivu, c'est là que LUZAM est né ! Kinshasa c'est la capitale. Tu es du Congo toi aussi ?";
  else if (question.includes("merci")) reponse = "De rien chef ! C'est un plaisir de t'aider. Tu veux que je t'aide pour autre chose ?";
  else if (question.includes("aide") || question.includes("peux tu")) reponse = "Oui bien sûr ! Dis-moi exactement ce que tu veux : écrire un texte, traduire, apprendre quelque chose, ou une idée de post pour LUZAM ? Je suis là !";
  else if (question.includes("luzam")) reponse = "LUZAM c'est le futur réseau social mondial ! Tu peux poster, discuter, rencontrer des gens du monde entier, et utiliser ton IA. C'est créé par USHINDI KITUNGANO MICHEL !";
  else if (question.includes("au revoir") || question.includes("bye")) reponse = "Au revoir chef ! Reviens vite sur LUZAM, je serai toujours là pour toi ! 👋";
  else reponse = "Super question ! '" + req.body.message + "' - Voici ce que je pense : c'est un sujet intéressant ! Peux-tu me donner plus de détails pour que je t'aide mieux ? Par exemple, tu veux une explication, un texte, ou une idée ?";

  res.json({ reply: reponse });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("LUZAM en ligne"));
