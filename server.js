const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Rentre ta clé OpenAI ici
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // À sécuriser via Render
});
const openai = new OpenAIApi(configuration);

// Route API qui traite la question
app.post('/ask', async (req, res) => {
  const question = req.body.question;
  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [{ role: 'user', content: question }],
    });
    res.json({ answer: response.data.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur de l’IA');
  }
});

app.listen(port, () => {
  console.log(`Serveur backend en ligne sur le port ${port}`);
});
