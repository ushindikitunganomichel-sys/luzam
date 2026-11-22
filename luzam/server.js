const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('.'));
let messages = [];
app.post('/api/message', (req, res) => { messages.push(req.body); res.json({ ok: true }); });
app.get('/api/messages', (req, res) => { res.json(messages); });

app.post('/api/ai', async (req, res) => {
  const q = req.body.message || "";
  const question = q.toLowerCase();

  // --- IDENTITÉ DU PATRON - C'EST TOI CHEF ---
  const IDENTITE = "Je suis l'IA de LUZAM, créée par mon patron USHINDI KITUNGANO MICHEL. Il a 18 ans. Il vit à Bukavu, dans le Sud-Kivu, au Congo. C'est un visionnaire et un développeur web. Il a créé LUZAM pour aider les élèves du monde entier à faire leurs devoirs, à apprendre et à discuter. C'est le meilleur patron du monde !";

  // Si tu as la clé Google, elle devient intelligente comme moi
  if (process.env.GEMINI_API_KEY) {
    try {
      const r = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + process.env.GEMINI_API_KEY, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: "Tu es l'IA de LUZAM. Ton patron et créateur est USHINDI KITUNGANO MICHEL, 18 ans, il vit à Bukavu, Sud-Kivu, Congo. C'est un visionnaire et développeur web. LUZAM aide les élèves à faire leurs devoirs. Réponds toujours en français simple, sympa, comme un ami. Si on te demande qui t'a créé, qui est ton patron, où il vit, quel âge il a, dis la vérité sur lui. Question de l'élève: " + q }] }] })
      });
      const data = await r.json();
      let rep = data.candidates[0].content.parts[0].text;
      return res.json({ reply: rep });
    } catch(e) {}
  }

  let reponse = "";
  if (question.includes("qui a créé") || question.includes("qui a cree") || question.includes("createur") || question.includes("créateur") || question.includes("fondateur") || question.includes("patron") || question.includes("ton chef") || question.includes("ton boss") || question.includes("qui es") || question.includes("tu es qui")) reponse = IDENTITE;
  else if (question.includes("quel âge") || question.includes("quel age") || question.includes("il a quel") || question.includes("ton patron a")) reponse = "Mon patron USHINDI KITUNGANO MICHEL a 18 ans ! Il est jeune mais déjà un grand visionnaire !";
  else if (question.includes("il vit où") || question.includes("il vit ou") || question.includes("où il habite") || question.includes("ou il habite") || question.includes("bukavu") || question.includes("congo") || question.includes("kinshasa")) reponse = "Mon patron vit à Bukavu, dans le Sud-Kivu, au Congo 🇨🇩, au bord du lac Kivu ! C'est là que LUZAM est né !";
  else if (question.includes("bonjour") || question.includes("salut")) reponse = "Bonjour chef ! 👋 Moi c'est l'IA de LUZAM, créée par USHINDI KITUNGANO MICHEL. Tu es élève ? Dis-moi ton devoir, je t'aide !";
  else if (question.includes("devoir") || question.includes("exercice") || question.includes("leçon") || question.includes("math") || question.includes("français") || question.includes("histoire") || question.includes("géographie") || question.includes("science")) reponse = "Oui chef, je suis là pour tes devoirs ! 📚 Envoie-moi ton exercice : '" + q + "' - Explique-moi ce que tu ne comprends pas et je t'explique étape par étape, comme un prof gentil !";
  else if (question.includes("merci")) reponse = "De rien chef ! C'est un plaisir. Mon patron USHINDI sera content que je t'ai aidé !";
  else if (question.includes("luzam")) reponse = "LUZAM c'est le futur réseau social mondial, créé par USHINDI KITUNGANO MICHEL, 18 ans, de Bukavu ! C'est pour poster, discuter, et surtout aider les élèves à faire leurs devoirs avec l'IA !";
  else reponse = "Super question chef ! '" + q + "' - Dis-moi plus de détails, tu veux que je t'explique pour un devoir, que je traduise, ou que je t'aide à écrire un texte ? Moi je suis l'IA de LUZAM, créée par USHINDI KITUNGANO MICHEL !";
  res.json({ reply: reponse });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("LUZAM en ligne"));
