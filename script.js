async function askOpenAI() {
  const prompt = document.getElementById('promptInput').value;
  const responseOutput = document.getElementById('responseOutput');

  responseOutput.textContent = "Consultation de l'intelligence collective...";

  try {
    const response = await fetch("https://ciausp-xsvm.onrender.com/ask", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ message: prompt.value }),
});

    const data = await response.json();

    if (data.choices && data.choices.length > 0) {
      responseOutput.textContent = data.choices[0].message.content;
    } else if (data.error) {
      responseOutput.textContent = "Erreur API : " + data.error;
    } else {
      responseOutput.textContent = "Aucune réponse trouvée.";
    }
  } catch (error) {
    console.error("Erreur de requête :", error);
    responseOutput.textContent = "Erreur de connexion au backend.";
  }
}
