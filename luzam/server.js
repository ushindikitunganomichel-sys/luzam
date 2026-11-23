const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

let posts = [
  { id: 1, user: "Ushindi Kitungano Michel", text: "What matters is moving forward 🔥 LUZAM est là !", likes: 128 }
];

// PAGE D'ACCUEIL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// POSTS
app.get('/api/posts', (req, res) => res.json(posts));
app.post('/api/posts', (req, res) => {
  const p = { id: Date.now(), user: "Ushindi Kitungano Michel", text: req.body.text, likes: 0 };
  posts.unshift(p);
  res.json(p);
});

// LUZAM AI - INTELLIGENTE - ELLE SAIT QUI EST SON CREATEUR
app.post('/api/ai', (req, res) => {
  const q = (req.body.message || "").toLowerCase();
  let reply = "";

  if (q.includes('qui') && (q.includes('créa') || q.includes('crea') || q.includes('t\'a') || q.includes('ta fait'))) {
    reply = "Mon créateur c'est Ushindi Kitungano Michel, né à Baraka, Fizi en 2008. Il est fondateur de LUZAM. Il vit à Bukavu, il étudie à l'Université Catholique de Bukavu. Son objectif : créer un réseau social africain intelligent.";
  }
  else if (q.includes('bonjour') || q.includes('salut')) {
    reply = "Salut ! Moi c'est LUZAM AI. Je suis l'IA de Ushindi. Tu veux un post, une légende, une idée ?";
  }
  else if (q.includes('légende') || q.includes('legende') || q.includes('post')) {
    reply = "Voici 3 légendes :\n1. What matters is moving forward 🔥 #MoveForward\n2. Je n'abandonne jamais, j'avance avec LUZAM 🚀\n3. Bukavu, on arrive ! Le futur c'est maintenant ✨";
  }
  else if (q.includes('bio') || q.includes('ushindi')) {
    reply = "Ushindi Kitungano Michel : Fondateur de LUZAM. Né à Baraka, Fizi en 2008. Vit à Bukavu. Étudiant à l'Université Catholique de Bukavu. Créateur digital. What matters is moving forward.";
  }
  else if (q.includes('merci')) {
    reply = "De rien mon gars ❤️ C'est toujours un plaisir.";
  }
  else {
    reply = "Super idée ! Dis-moi un peu plus, je vais t'aider à le rendre encore meilleur. Tu veux un post, une légende ou un plan ?";
  }
  res.json({ reply });
});

app.listen(PORT, () => console.log('LUZAM en ligne sur ' + PORT));
