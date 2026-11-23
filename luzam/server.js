const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('.'));
const PORT = process.env.PORT || 3000;

const BIO = `Le créateur de LUZAM s'appelle Ushindi Kitungano Michel. Né à Baraka, Fizi en 2008. Etudes à l'Espérance et La Joie à Baraka, Diplôme d'État en Commercial et Gestion au Complexe Scolaire Kamage à Bukavu. Ils sont 8 enfants : DORCAS, ORTHINCE, OMARI, FIDEL, MARK, ALFANI, lui et RACHEL. Père MICHEL, mère FEZA. Il aime l'informatique depuis 12 ans. Jeune visionnaire, veut devenir grand entrepreneur développeur businesseur dans le monde entier.`;

app.post('/api/ai', async (req,res)=>{
  const original = req.body.message || "";
  const msg = original.toLowerCase();
  const langue = req.body.langue || "fr";
  const replyTo = req.body.replyTo || "";
  let reply = "";

  // 1. BIOGRAPHIE - SEULEMENT SI ON DEMANDE USHINDI
  if(msg.includes("qui est ushindi") || msg.includes("qui a créé") || msg.includes("qui a cree") || msg.includes("ton créateur") || msg.includes("ton createur") || msg.includes("biographie") || msg.includes("fondateur")){
    if(langue==='en') reply = "My creator is Ushindi Kitungano Michel 🌍 Born in Baraka, Fizi in 2008. He studied at Espérance and La Joie in Baraka, then got his State Diploma in Commercial and Management at Complexe Scolaire Kamage in Bukavu. They are 8 children: DORCAS, ORTHINCE, OMARI, FIDEL, MARK, ALFANI, him and RACHEL. Father MICHEL, mother FEZA. He loves computers since he was 12. Young visionary, wants to become a great entrepreneur developer businessman worldwide!";
    else if(langue==='sw') reply = "Muumbaji wangu ni Ushindi Kitungano Michel 🌍 Alizaliwa Baraka, Fizi mwaka 2008. Alisoma Espérance na La Joie huko Baraka, kisha akapata Diploma yake ya Jimbo katika Commercial na Gestion huko Complexe Scolaire Kamage huko Bukavu. Wako watoto 8: DORCAS, ORTHINCE, OMARI, FIDEL, MARK, ALFANI, yeye na RACHEL. Baba MICHEL, mama FEZA. Anapenda kompyuta tangu akiwa na miaka 12. Ni kijana mwenye maono, anataka kuwa mjasiriamali mkubwa, msanidi programu, mfanyabiashara duniani kote!";
    else reply = "Mon créateur c'est Ushindi Kitungano Michel 🌍 Né à Baraka, Fizi en 2008. Il a étudié à l'Espérance et La Joie à Baraka, puis il a eu son Diplôme d'État en Commercial et Gestion au Complexe Scolaire Kamage à Bukavu. Ils sont 8 enfants : DORCAS, ORTHINCE, OMARI, FIDEL, MARK, ALFANI, lui et RACHEL. Son père MICHEL, sa mère FEZA. Il aime l'informatique depuis 12 ans. C'est un jeune visionnaire qui veut devenir un grand entrepreneur développeur businesseur dans le monde entier !";
    return res.json({reply});
  }

  // 2. GEMINI - VRAI CERVEAU POUR TOUTES LES QUESTIONS DU MONDE
  const API_KEY = process.env.GEMINI_API_KEY || "";
  if(API_KEY){
    try{
      const fetch = (await import('node-fetch')).default;
      const prompt = `Tu es LUZAM, IA internationale créée par Ushindi Kitungano Michel. Biographie du créateur (utilise seulement si on demande qui est Ushindi) : ${BIO}. RÈGLE IMPORTANTE : Tu réponds à TOUTES les questions, dans TOUS les domaines : école, science, médecine, histoire, religion, sport, amour, business, code, cuisine, politique, tout. Tu parles OBLIGATOIREMENT dans la langue de l'utilisateur. Langue demandée : ${langue}. Si langue = fr, réponds en français. Si en, en anglais. Si sw, en swahili. Si ln, en lingala. Si es, en espagnol. Si pt, en portugais. Si ar, en arabe. Si hi, en hindi. Si zh, en chinois. Si l'utilisateur fait un REPLY à : "${replyTo}", tiens compte du contexte. Ne dis jamais "je ne sais pas", aide toujours. Question : ${original}`;
      // On essaie 2 modèles, si un ne marche pas, l'autre marche
      let models = ["gemini-2.0-flash","gemini-1.5-flash"];
      let done = false;
      for(let m of models){
        try{
          let r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent?key=${API_KEY}`,{method:"POST",headers:{"Content-Type":"application/json"},body: JSON.stringify({contents:[{parts:[{text: prompt}]}]})});
          let data = await r.json();
          if(data.candidates && data.candidates[0]){
            reply = data.candidates[0].content.parts[0].text;
            done = true; break;
          }
        }catch(e){}
      }
      if(done) return res.json({reply});
    }catch(e){}
  }

  // 3. MODE SANS CLÉ - LUZAM RÉPOND QUAND MÊME À TOUT, PAS D'ERREUR CERVEAU
  const reponses = {
    fr: `Oui chef, j'ai bien compris : "${original}". ${replyTo ? `Tu réponds à : "${replyTo}". ` : ``}Je suis LUZAM, je peux t'aider sur tout : devoirs, business, informatique, amour, histoire, santé, religion, code, tout. Dis-moi plus en détail ce que tu veux, et je te donne la réponse complète. Et pour que je devienne encore plus fort, mets ta clé Gemini dans Render > Environment > GEMINI_API_KEY.`,
    en: `Yes boss, I understood: "${original}". I am LUZAM, I can help you with everything: school, business, coding, love, history, health, religion, everything. Tell me more in detail what you want, and I will give you the full answer.`,
    sw: `Ndiyo boss, nimekuelewa: "${original}". Mimi ni LUZAM, naweza kukusaidia kwa kila kitu: shule, biashara, kompyuta, mapenzi, historia, afya, dini, kila kitu. Niambie zaidi unataka nini, nitakupa jibu kamili.`,
    ln: `Oui chef, nayoki yo: "${original}". Ngai nazali LUZAM, nakoki kosunga yo na nionso: classe, business, informatique, bolingo, histoire, santé, religion, nionso. Lobela nga lisusu nini olingi, nakopesa yo reponse mobimba.`,
    es: `Sí jefe, te entendí: "${original}". Soy LUZAM, puedo ayudarte con todo: escuela, negocios, código, amor, historia, salud, religión, todo. Dime más en detalle qué quieres y te doy la respuesta completa.`,
    pt: `Sim chefe, entendi: "${original}". Sou LUZAM, posso te ajudar com tudo: escola, negócios, código, amor, história, saúde, religião, tudo. Me diga mais detalhes do que você quer e eu te dou a resposta completa.`
  };
  reply = reponses[langue] || reponses.fr;
  res.json({reply});
});
app.get('/',(req,res)=>{res.sendFile(__dirname+'/index.html');});
app.listen(PORT,()=>console.log("LUZAM en ligne "+PORT));
