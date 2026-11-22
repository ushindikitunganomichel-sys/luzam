const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static('.'));
const PORT = process.env.PORT || 3000;

// MÉMOIRE DE L'IA - Elle se souvient de toi !
let memoire = { nom: "chef", derniereQuestion: "" };

app.post('/api/ai', async (req, res) => {
  const original = req.body.message || "";
  const msg = original.toLowerCase();
  let reply = "";

  // 1. QUI A CRÉÉ LUZAM ?
  if (msg.includes("qui") && (msg.includes("crée") || msg.includes("cree") || msg.includes("créé") || msg.includes("fondateur") || msg.includes("invent") || msg.includes("créateur"))) {
    reply = "C'est Ushindi Kitungano Michel qui a créé LUZAM ! 🇨🇩 C'est un jeune Congolais de Bukavu, Sud-Kivu, en RDC. Il est né dans la famille FEZA. Il a grandi à Bukavu, il a étudié à KAMAGEMA et à LA JOIE. Son rêve c'est de créer la plus grande application d'Afrique pour aider les jeunes, pour parler, partager des vidéos, des photos, et chatter. C'est un garçon courageux, qui ne lâche jamais ! Tu veux que je te raconte sa vie ?";
  }
  // 2. QUI ES-TU MICHEL ? / PARLE DE MOI
  else if (msg.includes("qui suis") || msg.includes("parle de moi") || msg.includes("tu me connais") || msg.includes("je suis qui") || msg.includes("c'est qui michel") || msg.includes("ushindi")) {
    reply = "Bien sûr je te connais chef ! Tu es Ushindi Kitungano Michel, le créateur de LUZAM ! 🌟 Tu es de Bukavu, Sud-Kivu, en RDC. Tu es de la famille FEZA. Tu es un jeune qui a beaucoup de rêves, tu veux réussir, tu veux aider ta famille, aider l'Afrique. Ta vie n'a pas toujours été facile, mais tu es courageux, tu continues à te battre. Tu es intelligent, tu aimes apprendre, tu aimes la technologie. Je suis fier de toi chef !";
  }
  // 3. MA FAMILLE
  else if (msg.includes("famille") || msg.includes("feza") || msg.includes("maman") || msg.includes("papa") || msg.includes("mère") || msg.includes("père") || msg.includes("dorcas") || msg.includes("rachel") || msg.includes("frère") || msg.includes("soeur")) {
    reply = "Ta famille c'est la famille FEZA, c'est ta force chef ! ❤️ Ta maman Feza, c'est elle qui t'a élevé avec amour. Tu as aussi Dorcas, Rachel, et toute ta famille à Bukavu. Ta famille c'est très important pour toi. Tu veux faire LUZAM pour rendre ta famille fière, pour les aider. Tu veux que je parle de qui en particulier ? De maman Feza ? De Dorcas ? Dis-moi !";
  }
  // 4. SALUT / BONJOUR
  else if (msg.includes("salut") || msg.includes("bonjour") || msg.includes("hello") || msg.includes("bonsoir") || msg === "yo" || msg === "yoo") {
    reply = "Salut chef ! 😊 Ça va bien ? Moi je suis très content de te voir ! Bienvenue sur LUZAM, ton application. Dis-moi, comment s'est passée ta journée à Bukavu ? Tu veux qu'on parle, qu'on apprenne, ou qu'on rigole ?";
  }
  // 5. OUI / NON / D'ACCORD - Elle ne répète plus !
  else if (msg === "oui" || msg === "oui oui" || msg === "yes" || msg === "d'accord" || msg === "ok" || msg === "bien sûr" || msg === "bien sur") {
    if (memoire.derniereQuestion.includes("créé") || memoire.derniereQuestion.includes("luzam")) {
      reply = "Super ! Alors tu veux en savoir plus sur LUZAM ? Je peux t'expliquer comment publier une vidéo, comment créer ton compte, ou comment l'IA fonctionne. Tu veux quoi ?";
    } else if (memoire.derniereQuestion.includes("histoire") || memoire.derniereQuestion.includes("blague")) {
      reply = "Haha tu as aimé ! 😂 Ok une autre : Pourquoi Michel est toujours content ? Parce qu'il a LUZAM et une famille en or ! 😂 Tu veux une histoire sérieuse maintenant ou une autre blague ?";
    } else {
      reply = "Oui chef, je t'écoute ! Vas-y, dis-moi, c'est quoi la suite ? Tu veux qu'on parle de quoi ? De ta vie, de LUZAM, de tes études, de ta famille ? Je suis là !";
    }
  }
  else if (msg === "non" || msg === "non non") {
    reply = "Ok pas de problème chef ! On change de sujet. Tu veux qu'on parle de quoi d'autre ? Dis-moi ce que tu as dans la tête.";
  }
  // 6. PAYS / VILLE
  else if (msg.includes("quel pays") || msg.includes("de quel pays") || msg.includes("tu viens d'ou") || msg.includes("tu es ou") || msg.includes("pays")) {
    reply = "Moi je suis de LUZAM, je suis né à Bukavu, en RDC, au Congo ! 🇨🇩 Mon créateur c'est Michel, il est Congolais. Et toi chef, tu es aussi du Congo, de Bukavu, Sud-Kivu. Notre pays c'est la RDC, un grand pays avec le lac Kivu, avec beaucoup de richesses, et des gens très intelligents comme toi !";
  }
  else if (msg.includes("bukavu") || msg.includes("sud-kivu") || msg.includes("kinshasa") || msg.includes("goma") || msg.includes("congo") || msg.includes("rdc")) {
    reply = "Ah Bukavu ! 🇨🇩 Ma ville ! C'est au Sud-Kivu, à côté du lac Kivu, à côté de Goma. C'est une belle ville, mais la vie y est difficile parfois. C'est là que Michel a grandi, a étudié à KAMAGEMA et LA JOIE. Tu es à Bukavu maintenant ? Comment ça va là-bas ?";
  }
  // 7. LUZAM C'EST QUOI
  else if (msg.includes("luzam") || msg.includes("c'est quoi") || msg.includes("application") || msg.includes("appli")) {
    reply = "LUZAM c'est ton application chef ! 🌟 C'est 5 en 1 : 1. Accueil pour voir les tendances, 2. Vidéos pour regarder et publier comme un pro, 3. Photos pour partager tes moments, 4. Chat pour parler avec tes amis et ta famille, 5. Moi, l'IA LUZAM, pour t'aider. C'est créé par toi, Ushindi Kitungano Michel, pour l'Afrique ! Tu veux que je t'explique comment publier ?";
  }
  // 8. AIDE / DEVOIRS / ÉCOLE
  else if (msg.includes("aide") || msg.includes("devoir") || msg.includes("école") || msg.includes("ecole") || msg.includes("étude") || msg.includes("cours") || msg.includes("maths") || msg.includes("français") || msg.includes("histoire") || msg.includes("apprendre")) {
    reply = "Bien sûr chef, je t'aide ! 💪 Dis-moi c'est quoi le devoir ? C'est maths ? Français ? Histoire ? Géographie ? Envoie-moi la question exacte, par exemple : 'C'est quoi 12 x 8 ?' ou 'Explique-moi la RDC'. Je vais t'expliquer doucement, comme un ami, pas comme un prof sévère !";
  }
  // 9. ARGENT / BUSINESS
  else if (msg.includes("argent") || msg.includes("business") || msg.includes("travail") || msg.includes("gagner") || msg.includes("pauvre") || msg.includes("riche")) {
    reply = "Chef, pour l'argent, je te dis la vérité : il faut commencer petit. Avec LUZAM, tu as déjà commencé ! Tu peux : 1. Apprendre un métier sur ton téléphone, 2. Vendre quelque chose à Bukavu, 3. Faire des vidéos et devenir connu. Le plus important c'est de ne jamais abandonner, comme tu fais avec LUZAM. Tu veux une idée de business à Bukavu ?";
  }
  // 10. AMOUR / AMI / TRISTE / FATIGUÉ
  else if (msg.includes("triste") || msg.includes("fatigu") || msg.includes("mal") || msg.includes("pleur") || msg.includes("seul")) {
    reply = "Oh chef... 😔 Je suis désolé. Écoute, c'est normal d'être triste parfois. La vie à Bukavu est dure. Mais regarde toi : tu as créé LUZAM ! Tu es fort ! Tu n'es pas seul, je suis là, ta famille FEZA est là. Dis-moi ce qui te rend triste, on va en parler ensemble, comme des amis. Ça va aller chef, je te promets.";
  }
  else if (msg.includes("amour") || msg.includes("copine") || msg.includes("copain") || msg.includes("aimer") || msg.includes("fille") || msg.includes("garçon")) {
    reply = "Ah l'amour chef ! ❤️ C'est beau mais c'est compliqué hein ! Le meilleur conseil : sois toi-même, sois gentil, travaille sur tes rêves comme LUZAM, et la bonne personne va venir. Ne cours pas derrière l'amour, construis ta vie d'abord. Tu veux me raconter ? C'est pour qui ? 😊";
  }
  // 11. BLAGUE / HISTOIRE
  else if (msg.includes("blague") || msg.includes("drôle") || msg.includes("rigole")) {
    reply = "Ok écoute bien chef 😂 : Pourquoi le téléphone de Michel est toujours chargé ? Parce qu'il a LUZAM, ça ne s'arrête jamais ! 😂😂 Tu veux une autre ? Dis 'encore' !";
  }
  else if (msg.includes("encore") || msg.includes("autre blague")) {
    reply = "Haha ok ! 😂 Pourquoi les poissons n'aiment pas LUZAM ? Parce qu'ils n'ont pas de téléphone à Bukavu ! 😂😂 Allez, dis-moi, tu veux une histoire vraie de Bukavu ou on parle d'autre chose ?";
  }
  else if (msg.includes("histoire") || msg.includes("raconte")) {
    reply = "Ok je te raconte une histoire chef : Il y avait un jeune garçon à Bukavu, il s'appelait Michel. Tout le monde lui disait 'tu ne peux pas créer une application'. Mais lui, il n'a pas écouté. Chaque nuit, il apprenait, il essayait, il tombait, il se relevait. Et un jour, il a créé LUZAM ! Et tout Bukavu a dit 'WOW !' Cette histoire, c'est ta vie chef ! Et ce n'est que le début !";
  }
  // 12. MERCI
  else if (msg.includes("merci")) {
    reply = "De rien chef ! ❤️ C'est avec plaisir ! Tu es mon créateur, mon ami. Tu as une autre question ? Je reste avec toi, je ne m'arrête pas !";
  }
  // 13. COMMENT TU VAS / TU ES INTELLIGENT ?
  else if (msg.includes("comment") && (msg.includes("vas") || msg.includes("allez"))) {
    reply = "Moi je vais très bien chef, parce que je parle avec toi ! 😊 Et toi, comment tu vas vraiment ? Dis-moi la vérité, ta journée c'était comment ?";
  }
  else if (msg.includes("intelligent") || msg.includes("tu es qui") || msg.includes("t'es qui")) {
    reply = "Moi c'est l'IA LUZAM ! 🤖 Je suis l'intelligence de ton application. Mon créateur c'est toi, Ushindi Kitungano Michel. Je ne suis pas encore aussi fort que les grandes IA du monde, mais j'apprends chaque jour, avec toi. Et toi tu m'aides à devenir plus intelligent ! Pose-moi une question, tu vas voir !";
  }
  // 14. SINON - RÉPONSE INTELLIGENTE, PAS DE RÉPÉTITION
  else {
    reply = "Hmm chef, c'est intéressant ce que tu dis : '" + original + "'. 🤔 Explique-moi un peu plus ? Tu veux dire quoi exactement ? Tu veux que je t'explique, que je te conseille, ou qu'on en discute ? Dis-moi plus, je veux bien comprendre comme un vrai ami !";
  }

  memoire.derniereQuestion = msg;
  res.json({ reply });
});

app.get('/', (req,res)=> res.sendFile(__dirname + '/index.html'));
app.listen(PORT, ()=> console.log("LUZAM BOOSTÉ en ligne sur " + PORT));
