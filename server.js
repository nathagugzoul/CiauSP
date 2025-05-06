const express = require('express');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config(); // Assure la lecture du fichier .env si tu travailles en local

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Clé lue depuis les variables Render
});
const openai = new OpenAIApi(configuration);

app.post('/', async (req, res) => {
  const prompt = req.body.message;

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    res.json({
      choices: completion.data.choices.map(choice => choice.message.content),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur dans la génération OpenAI' });
  }
});

app.listen(port, () => {
  console.log(`Serveur lancé sur le port ${port}`);
});
