async function askOpenAI() {
  const prompt = document.getElementById('userInput').value;
  const responseOutput = document.querySelector('.response-output');

  responseOutput.textContent = "Chargement de la réponse collective...";

  try {
    const response = await fetch("https://ciauspbackend.onrender.com/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: prompt })
    });

    const data = await response.json();

    if (data.choices && data.choices.length > 0) {
      responseOutput.textContent = data.choices[0].message.content;
    } else {
      responseOutput.textContent = "Pas de réponse générée.";
    }
  } catch (error) {
    responseOutput.textContent = "Erreur lors de l'appel à l'IC : " + error.message;
  }
}
