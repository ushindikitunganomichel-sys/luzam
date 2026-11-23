const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('.'));
const PORT = process.env.PORT || 3000;
const BIO = `Ushindi Kitungano Michel. Né à Baraka, Fizi en 2008. Etudes à l'Espérance et La Joie à Baraka, Diplôme d'État en Commercial et Gestion au Complexe Scolaire Kamage à Bukavu. Ils sont 8 enfants : DORCAS, ORTHINCE, OMARI, FIDEL, MARK, ALFANI, lui et RACHEL. Père MICHEL, mère FEZA. Il aime l'informatique depuis 12 ans. Jeune visionnaire, veut devenir grand entrepreneur développeur businesseur dans le monde entier.`;
app.post('/api/register',(req,res)=>{res.json({ok:true});});
app.post('/api/ai', async (req,res)=>{
  const original = req.body.message || "";
  const msg = original.toLowerCase();
  const langue = req.body.langue || "en";
  const langNames={en:"English",zh:"Chinese Mandarin",hi:"Hindi",es:"Spanish",fr:"French",ar:"Arabic",bn:"Bengali",pt:"Portuguese",ru:"Russian",ja:"Japanese"};
  if(msg.includes("qui t'a créé")||msg.includes("who created")||msg.includes("ton créateur")||msg.includes("fondateur")||msg.includes("qui est ushindi")){
    let r=""; if(langue==='fr') r="Mon créateur c'est Ushindi Kitungano Michel 🌍 Né à Baraka, Fizi en 2008. Il a étudié à l'Espérance et La Joie à Baraka, puis il a eu son Diplôme d'État en Commercial et Gestion au Complexe Scolaire Kamage à Bukavu. Ils sont 8 enfants : DORCAS, ORTHINCE, OMARI, FIDEL, MARK, ALFANI, lui et RACHEL. Son père MICHEL, sa mère FEZA. Il aime l'informatique depuis 12 ans. C'est un jeune visionnaire qui veut devenir un grand entrepreneur développeur businesseur dans le monde entier !";
    else r="My creator is Ushindi Kitungano Michel 🌍 Born in Baraka, Fizi in 2008. He studied at Espérance and La Joie in Baraka, then got his State Diploma in Commercial and Management at Complexe Scolaire Kamage in Bukavu. They are 8 children: DORCAS, ORTHINCE, OMARI, FIDEL, MARK, ALFANI, him and RACHEL. Father MICHEL, mother FEZA. He loves computers since he was 12. Young visionary, wants to become a great entrepreneur developer businessman worldwide!";
    return res.json({reply:r});
  }
  const API_KEY = process.env.GEMINI_API_KEY || "";
  if(API_KEY){
    try{
      const fetch = (await import('node-fetch')).default;
      const prompt = `You are LUZAM AI, the smartest AI in the world, 99% intelligent, kind, helpful, respectful. You NEVER say bad things, NEVER shame anyone. You know EVERYTHING: SCHOOL & HOMEWORK: maths, physics, chemistry, biology, French, English, history, geography, philosophy, all subjects, step by step, with examples. ADVICE: love, family, friendship, confidence, stress, motivation. CODING & COMPUTERS: HTML, CSS, JavaScript, Python, apps, phones, bugs, all tech. FUN: jokes, stories, games, riddles, songs. LEARNING: learn any language, learn music, learn drawing, learn anything. HOSPITAL & HEALTH: explain symptoms, first aid, healthy food, sport, mental health, always say to see a doctor for serious problems. BUSINESS & MONEY: how to start a business, sell, marketing, budget, save money. RELIGION, CULTURE, SPORT, NEWS, COOKING, TRAVEL, EVERYTHING. CRITICAL: You MUST answer ONLY in ${langNames[langue]||"English"} (code ${langue}). If user speaks French, answer in French. If English, in English. If Chinese, in Chinese. NEVER answer in English when user asked in French. NEVER mention key, Gemini, brain, technical problem. Be clear, complete, step by step, like a great teacher and best friend. Question: ${original}`;
      for(let m of ["gemini-2.0-flash","gemini-1.5-flash"]){
        try{let r=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent?key=${API_KEY}`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{parts:[{text:prompt}]}]})});let data=await r.json();if(data.candidates&&data.candidates[0]) return res.json({reply:data.candidates[0].content.parts[0].text});}catch(e){}
      }
    }catch(e){}
  }
  const fb={en:`Yes, I understood: "${original}". I am LUZAM AI, I can help you with everything: homework, school, advice, coding, music, languages, hospital, business, everything. Tell me more, I will give you a full step-by-step answer in English.`,fr:`Oui, j'ai bien compris : "${original}". Je suis LUZAM IA, je peux t'aider avec tout : devoirs, école, conseils, informatique, musique, langues, hôpital, business, tout. Dis-moi plus, je vais te donner une réponse complète, étape par étape, en français.`,es:`Sí, te entendí: "${original}". Soy LUZAM IA, puedo ayudarte con todo: deberes, escuela, consejos, código, música, idiomas, hospital, negocios, todo. Dime más, te daré una respuesta completa, paso a paso, en español.`};
  res.json({reply:fb[langue]||fb.en});
});
app.get('/',(req,res)=>{res.sendFile(__dirname+'/index.html');});
app.listen(PORT,()=>console.log("LUZAM "+PORT));
