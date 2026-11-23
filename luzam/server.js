const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('.'));
const PORT = process.env.PORT || 3000;

// === BIOGRAPHIE DE USHINDI - LUZAM LA CONNAIT PAR COEUR ===
const BIO_USHINDI = `
Le créateur de LUZAM s'appelle Ushindi Kitungano Michel.
Il est né à Baraka, Fizi en 2008.
Il a fait ses études primaires et secondaires à Baraka, Fizi au Complexe Scolaire de l'Espérance et Groupe Scolaire La Joie.
Il est venu à Bukavu et a obtenu son Diplôme d'État en Commercial et Gestion au Complexe Scolaire Kamage.
Ils sont 8 enfants, 5 garçons et 3 filles : DORCAS, ORTHINCE, OMARI, FIDEL, MARK, ALFANI, lui-même et RACHEL.
Son père s'appelle MICHEL, sa mère s'appelle FEZA.
Il aime l'informatique depuis qu'il avait 12 ans.
C'est un jeune visionnaire qui veut devenir un grand entrepreneur, développeur, businesseur dans le monde entier.
`;

// === MÉMOIRE DE LUZAM - Elle se souvient de toi ===
let memoire = { nom: "Ushindi Kitungano Michel", derniereQuestion: "", langue: "fr", historique: [] };

app.post('/api/ai', async (req, res) => {
  const original = req.body.message || "";
  const msg = original.toLowerCase();
  const langue = req.body.langue || "fr";
  const replyTo = req.body.replyTo || ""; // Pour le REPLY comme WhatsApp
  let reply = "";

  memoire.derniereQuestion = original;
  memoire.langue = langue;
  memoire.historique.push(original);
  if(memoire.historique.length > 20) memoire.historique.shift();

  // 1. QUI A CRÉÉ LUZAM ? - TA BIOGRAPHIE
  if(msg.includes("qui") && (msg.includes("créé") || msg.includes("cree") || msg.includes("créateur")) || msg.includes("qui est ushindi") || msg.includes("biographie") || msg.includes("ton créateur") || msg.includes("ton createur")){
    reply = "Mon créateur c'est Ushindi Kitungano Michel 🌍 Né à Baraka, Fizi en 2008. Il a étudié à l'Espérance et La Joie à Baraka, puis il a eu son Diplôme d'État en Commercial et Gestion au Complexe Scolaire Kamage à Bukavu. Ils sont 8 enfants : DORCAS, ORTHINCE, OMARI, FIDEL, MARK, ALFANI, lui et RACHEL. Son père MICHEL, sa mère FEZA. Il aime l'informatique depuis 12 ans. C'est un jeune visionnaire qui veut devenir un grand entrepreneur développeur businesseur dans le monde entier ! C'est lui qui m'a créé.";
    return res.json({ reply, memoire });
  }

  // 2. SALUTATIONS - DANS TOUTES LES LANGUES
  if(msg.includes("bonjour") || msg.includes("salut") || msg.includes("jambo") || msg.includes("hello") || msg.includes("mbote") || msg.includes("hola")){
    reply = "Salut chef ! 🙏 C'est LUZAM. Je suis là, je parle toutes les langues : Français, Swahili, Lingala, Anglais, Espagnol, Portugais, Arabe, Hindi... Dis-moi ce que tu veux, je réponds à tout. Tu veux qu'on parle de quoi aujourd'hui ?";
    return res.json({ reply, memoire });
  }

  // 3. SI ON A LA CLÉ GEMINI - VRAI CERVEAU COMME CHATGPT
  const API_KEY = process.env.GEMINI_API_KEY || "";
  if(API_KEY){
    try{
      const fetch = (await import('node-fetch')).default;
      const prompt = `Tu es LUZAM, IA internationale créée par Ushindi Kitungano Michel. Tu connais sa biographie : ${BIO_USHINDI}. Tu réponds à TOUTES les questions, dans TOUS les domaines, dans TOUTES les langues. L'utilisateur parle en langue : ${langue}. Si l'utilisateur fait un REPLY à ce message : "${replyTo}", réponds en tenant compte de ce contexte. Sois gentil, visionnaire, comme un frère. Question : ${original}`;
      const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({contents:[{parts:[{text: prompt}]}]})
      });
      const data = await r.json();
      reply = data.candidates[0].content.parts[0].text;
      return res.json({ reply, memoire });
    }catch(e){
      reply = "J'ai eu un petit problème avec mon cerveau Gemini, mais je suis toujours là. Repose ta question chef.";
      return res.json({ reply, memoire });
    }
  }

  // 4. MODE SANS CLÉ - LUZAM RÉPOND QUAND MÊME À TOUT
  // Il ne dit pas "je ne sais pas", il aide toujours
  if(replyTo){
    reply = `Oui chef, j'ai bien vu ton message : "${replyTo}". Tu me réponds : "${original}". Comme WhatsApp, j'ai compris le contexte. Dis-moi plus, je t'aide. Je suis LUZAM, créé par Ushindi Kitungano Michel, je réponds à tout : devoirs, business, amour, code, histoire, tout. Pour que je devienne encore plus intelligent comme ChatGPT, mets ta clé Gemini dans Render > Environment > GEMINI_API_KEY.`;
  } else {
    reply = `Je t'ai bien compris chef : "${original}". Je suis LUZAM, créé par Ushindi Kitungano Michel de Baraka / Bukavu. Je peux t'aider dans tous les domaines : école, business, informatique, amour, histoire, religion, tout. Dis-moi plus en détail ce que tu veux, et je te donne la réponse complète, dans ta langue (${langue}). Et si tu veux, mets ta clé Gemini pour que je devienne 100% comme ChatGPT.`;
  }

  res.json({ reply, memoire });
});

app.get('/', (req,res)=>{ res.sendFile(__dirname + '/index.html'); });
app.listen(PORT, ()=> console.log("LUZAM en ligne sur " + PORT));
