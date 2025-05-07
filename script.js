async function askOpenAI() {
  const prompt = document.getElementById("userInput").value;
  const responseOutput = document.getElementById("responseOutput");

  responseOutput.textContent = "Chargement...";

  try {
    const response = await fetch("https://ciauspbackend.onrender.com/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: prompt })
    });

    const data = await response.json();

    if (data.choices && data.choices.length > 0) {
      responseOutput.textContent = data.choices[0].message.content;
    } else {
      responseOutput.textContent = "Réponse vide ou non reconnue.";
    }
  } catch (error) {
    responseOutput.textContent = "Erreur : " + error.message;
  }
}
