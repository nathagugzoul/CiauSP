const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 10000; // Port choisi ou par défaut

app.use(cors());
app.use(bodyParser.json());

app.post('/ask', (req, res) => {
  const question = req.body.question;
  console.log('Question reçue :', question);

  // Ici tu peux connecter à OpenAI ou renvoyer une réponse simulée
  const reponse = `Réponse collective IC : Cette question "${question}" implique une exploration collective.`;
  
  res.json({ reponse });
});

app.listen(port, () => {
  console.log(`Serveur backend en ligne sur le port ${port}`);
});
