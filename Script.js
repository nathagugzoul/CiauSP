const questionInput = document.getElementById("question");
const soumettreBtn = document.getElementById("soumettre");
const reponseContainer = document.getElementById("reponse-collective");
const memoireContainer = document.getElementById("memoire-collective");

const API_KEY = "TA_CLE_API_OPENAI"; // ⚠️ remplace par ta clé OpenAI

soumettreBtn.addEventListener("click", async function () {
  const question = questionInput.value.trim();
  if (question !== "") {
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: question }]
        })
      });

      const data = await response.json();
      const reponseIA = data.choices[0].message.content;
      const reponse = `Réponse collective IC : ${reponseIA}`;
      
      afficherReponse(reponse);
      ajouterMemoire(question);

    } catch (error) {
      afficherReponse("Erreur de connexion à OpenAI.");
      console.error(error);
    }
  }
});

function afficherReponse(texte) {
  reponseContainer.textContent = texte;
}

function ajouterMemoire(question) {
  const li = document.createElement("li");
  li.textContent = question;
  memoireContainer.appendChild(li);
}
