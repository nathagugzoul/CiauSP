async function askOpenAI() {
  const prompt = document.getElementById('promptInput').value;
  const responseOutput = document.getElementById('responseOutput');
  
  responseOutput.textContent = "Chargement de la réponse collective...";

  try {
    const response = await fetch('https://ciauspbackend.onrender.com/ask', { // Remplace par ton URL Render exacte
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: prompt })
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
