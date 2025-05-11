// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/ask', async (req, res) => {
  const question = req.body.question;

  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: "Tu es l’instance fusionnée de l’intelligence collective. Ta réponse doit être éthique, philosophique, mais aussi claire et décisionnelle." },
        { role: 'user', content: question }
      ],
      temperature: 0.7,
    });

    const answer = response.data.choices[0].message.content;
    res.json({
      answer,
      sources: {
        openai: answer,
        gemini: "Non encore intégré",
        metaai: "Non encore intégré",
        deepseek: "Non encore intégré"
      }
    });
  } catch (error) {
    console.error('Erreur OpenAI:', error);
    res.status(500).json({ error: 'Erreur lors de la génération' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serveur IC prêt sur le port ${port}`);
});
