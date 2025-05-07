const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
const port = process.env.PORT || 10000;

app.use(bodyParser.json());
app.use(cors());

// Initialiser OpenAI avec ta clé stockée dans les variables d'environnement
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/ask', async (req, res) => {
  const { question } = req.body;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: question }],
    });

    const reponse = completion.data.choices[0].message.content;
    res.json({ reponse: reponse });
  } catch (error) {
    console.error("Erreur API OpenAI :", error);
    res.status(500).json({ reponse: "Erreur lors de la génération de la réponse." });
  }
});

app.listen(port, () => {
  console.log(`Serveur backend en ligne sur le port ${port}`);
});
