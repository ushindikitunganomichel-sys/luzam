const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('.'));
const PORT = process.env.PORT || 3000;

app.post('/api/ai', async (req, res) => {
  const msg = (req.body.message || "").toLowerCase();
  let reply = "";

  if (msg.includes("qui") && (msg.includes("crée") || msg.includes("cree") || msg.includes("créé") || msg.includes("fondateur") || msg.includes("invent"))) {
    reply = "C'est Ushindi Kitungano Michel qui a créé LUZAM ! 🇨🇩 C'est un jeune congolais de Bukavu, Sud-Kivu. Il a créé LUZAM à Bukavu, parce qu'il voulait une application pour l'Afrique, pour les jeunes, pour parler, partager des vidéos, des photos, et chatter. C'est son rêve ! Tu veux savoir quoi d'autre sur lui ?";
  } else if (msg.includes("salut") || msg.includes("bonjour") || msg.includes("hello") || msg.includes("yo")) {
    reply = "Salut chef ! 😊 Bienvenue sur LUZAM ! Moi c'est l'IA LUZAM, ton ami. Je suis là pour t'aider. Tu veux que je t'aide pour quoi ? 1. Parler de LUZAM 2. Apprendre 3. Raconter une histoire 4. Conseils ? Dis-moi tout !";
  } else if (msg.includes("luzam") || msg.includes("c'est quoi")) {
    reply = "LUZAM c'est la nouvelle application créée par Ushindi Kitungano Michel ! 🌟 C'est comme un mélange de Vidéos, Photos, Chat et IA. Tu peux regarder des vidéos, voir des photos, chatter avec tes amis, et parler avec moi, ton IA. C'est fait pour le Congo, pour l'Afrique, pour tout le monde ! Tu veux que je t'explique comment publier ?";
  } else if (msg.includes("aide") || msg.includes("que peux") || msg.includes("tu fais quoi") || msg.includes("peux-tu")) {
    reply = "Bien sûr chef, je peux t'aider pour beaucoup de choses ! 💪 Je peux : 1. T'expliquer LUZAM 2. T'aider pour tes devoirs, français, maths, histoire 3. Te donner des conseils pour la vie, pour le business 4. Te raconter des histoires, des blagues 5. Traduire. Dis-moi, tu as besoin de quoi maintenant ?";
  } else if (msg.includes("bukavu") || msg.includes("congo") || msg.includes("rdc") || msg.includes("afrique")) {
    reply = "Ah Bukavu ! 🇨🇩 Ma ville préférée ! C'est au Sud-Kivu, en RDC, à côté du lac Kivu. C'est là que Michel a créé LUZAM. Bukavu c'est une belle ville, avec des gens courageux. Tu es à Bukavu aussi ?";
  } else if (msg.includes("merci")) {
    reply = "De rien chef ! ❤️ C'est avec plaisir ! Tu es mon ami. Tu as une autre question ? Je suis là pour toi, je ne m'arrête pas !";
  } else if (msg.includes("blague") || msg.includes("histoire")) {
    reply = "Ok écoute ça chef 😂 : Pourquoi le téléphone de Michel ne tombe jamais en panne ? Parce qu'il a LUZAM ! 😂😂 Tu en veux une autre ? Ou tu veux une vraie histoire de Bukavu ?";
  } else {
    reply = "Je t'ai compris chef ! Tu m'as dit : '" + req.body.message + "'. C'est intéressant ! Dis-moi un peu plus, tu veux que je t'explique, que je t'aide, ou que je te raconte quelque chose ? Je suis l'IA LUZAM, créée par Ushindi Kitungano Michel, et je suis là pour toi, on continue à parler !";
  }
  res.json({ reply });
});

app.get('/', (req,res)=> res.sendFile(__dirname + '/index.html'));
app.listen(PORT, ()=> console.log("LUZAM en ligne sur " + PORT));
