document.addEventListener("DOMContentLoaded", () => {
    const highscoreForm = document.getElementById("highscore-form");

    highscoreForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Obtener el nombre y la puntuación del formulario
        const nombre = document.getElementById("nombre").value;
        const puntuacion = document.getElementById("puntuacion").value;

        // Validar que se haya ingresado un nombre
        if (!nombre) {
            alert("Por favor, ingresa tu nombre.");
            return;
        }

        // Guardar el highscore
        guardarHighscore({ nombre, puntuacion })
            .then(() => {
                // Redirigir a la página de highscores
                window.location.href = "highscores.html";
            })
            .catch((error) => console.error("Error al guardar highscore:", error));
    });

    // Obtener la puntuación del localStorage o un valor predeterminado si no está presente
    const puntuacion = localStorage.getItem("puntuacion") || 0;
    
    // Actualizar el campo de puntuación en el formulario
    document.getElementById("puntuacion").value = puntuacion;
});

// Función para guardar los highscores en el JSON
const guardarHighscore = (nuevoHighscore) => {
    return fetch("db/highscores.json", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoHighscore),
    })
    .then((response) => response.json())
    .catch((error) => console.error("Error al guardar highscores:", error));
};