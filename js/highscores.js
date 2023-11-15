document.addEventListener("DOMContentLoaded", () => {
    // Función para cargar y mostrar los highscores
    const mostrarHighscores = () => {
        fetch("db/highscores.json") // Ajusta la ruta aquí
            .then((response) => response.json())
            .then((highscores) => {
                // Ordenar los highscores por puntuación de mayor a menor
                highscores.sort((a, b) => b.puntuacion - a.puntuacion);

                const highscoresList = document.getElementById("highscores-list");
                highscoresList.innerHTML = "<h2>Top 10 Highscores</h2>";
                
                highscores.slice(0, 10).forEach((score, index) => {
                    // Mostrar solo los primeros 10 highscores
                    const puestoHTML = document.createElement("p");
                    puestoHTML.innerHTML = `${index + 1}. ${score.nombre} - ${score.puntuacion} Pts.`;

                    if (index === 0) {
                        // Aplicar estilos adicionales al puesto 1
                        puestoHTML.style.fontWeight = "bold";
                        puestoHTML.style.animation = "titilar 0.5s infinite"; // Añadir un efecto de titilación
                        //puestoHTML.style.backgroundColor = "white"; // Color de fondo amarillo
                        puestoHTML.style.boxShadow = "5px 5px 5px #888888"; // Sombra ligera
                        puestoHTML.style.fontSize = "1.5em"; // Aumentar el tamaño de la fuente al 120%
                    }

                    highscoresList.appendChild(puestoHTML);
                });

                // Agregar botones
                const buttonsContainer = document.createElement("div");
                buttonsContainer.innerHTML = "<br><button onclick='volverAlMenu()'>Volver al Menú</button> <button onclick='reiniciarJuego()'>Reiniciar Juego</button>";
                highscoresList.appendChild(buttonsContainer);
            })
            .catch((error) => console.error("Error al cargar highscores:", error));
    };

    // Cargar y mostrar los highscores al cargar la página
    mostrarHighscores();
});

// Función para volver al menú
const volverAlMenu = () => {
    window.location.href = "index.html"; // Cambia la ruta según tu estructura de carpetas
};

// Función para reiniciar el juego
const reiniciarJuego = () => {
    window.location.href = "game.html"; // Cambia la ruta según tu estructura de carpetas
};