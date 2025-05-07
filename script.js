const questionInput = document.getElementById("question");
const soumettreBtn = document.getElementById("soumettre");
const reponseContainer = document.getElementById("reponse-collective");
const memoireContainer = document.getElementById("memoire-collective");

soumettreBtn.addEventListener("click", async function () {
  const question = questionInput.value.trim();
  if (question !== "") {
    try {
      const response = await fetch('https://ciausp-xsvm.onrender.com/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: question })
      });
      const data = await response.json();
      const reponse = `Réponse collective IC : ${data.reponse}`;
      afficherReponse(reponse);
      ajouterMemoire(question);
    } catch (error) {
      afficherReponse("Erreur de connexion au backend.");
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
