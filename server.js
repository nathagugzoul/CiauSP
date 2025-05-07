const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { OpenAI } = require('openai'); // CORRECTION : utiliser la nouvelle classe OpenAI

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // ta clé API est lue depuis les variables Render
});

app.post('/ask', async (req, res) => {
  const question = req.body.question;

  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: "user", content: question }],
      model: "gpt-3.5-turbo",
    });

    const reponse = chatCompletion.choices[0].message.content;
    res.json({ reponse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ reponse: "Erreur lors de la génération de la réponse collective." });
  }
});

app.listen(port, () => {
  console.log(`Serveur backend en ligne sur le port ${port}`);
});
