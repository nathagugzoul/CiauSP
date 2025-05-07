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
