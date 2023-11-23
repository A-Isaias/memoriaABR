document.addEventListener("DOMContentLoaded", () => {
    // Declarar highscoresList fuera de la función para que sea accesible por otras funciones
    const highscoresList = document.getElementById("highscores-list");

    // Función para cargar y mostrar los highscores
    const mostrarHighscores = () => {
        fetch("db/highscores.json") // Ajusta la ruta aquí
            .then((response) => response.json())
            .then((highscores) => {
                // Ordenar los highscores por puntuación de mayor a menor
                highscores.sort((a, b) => b.puntuacion - a.puntuacion);

                // Limpiar highscoresList antes de mostrar nuevos resultados
                highscoresList.innerHTML = "<h2>Top Yeeecords</h2>";

                // Mostrar los primeros 10 highscores
                mostrarPartialHighscores(highscores, 0, 10);

                // Pausa de 5 segundos antes de mostrar los siguientes 20
                setTimeout(() => {
                    // Limpiar highscoresList antes de mostrar nuevos resultados
                    highscoresList.innerHTML = "<h2>Top Yeeecords</h2>";

                    // Mostrar los siguientes 20 highscores
                    mostrarPartialHighscores(highscores, 10, 30);

                    // Pausa de 5 segundos antes de reiniciar el bucle
                    setTimeout(mostrarHighscores, 5000);
                }, 5000);
            })
            .catch((error) => console.error("Error al cargar highscores:", error));
    };

    // Función para mostrar una porción de highscores
    const mostrarPartialHighscores = (highscores, start, end) => {
        for (let i = start; i < end && i < highscores.length; i++) {
            const score = highscores[i];
            const puestoHTML = document.createElement("p");
            puestoHTML.innerHTML = `<strong>${i + 1}.</strong> ${score.nombre} - ${score.puntuacion} Pts.`;


            if (i === 0) {
                // Aplicar estilos adicionales al puesto 1
                puestoHTML.style.fontWeight = "bold";
                puestoHTML.style.animation = "titilar 0.5s infinite"; // Añadir un efecto de titilación
                puestoHTML.style.boxShadow = "5px 5px 5px #888888"; // Sombra ligera
                puestoHTML.style.fontSize = "1.5em"; // Aumentar el tamaño de la fuente al 120%
            }

            highscoresList.appendChild(puestoHTML);
        }

        // Agregar botones
        const buttonsContainer = document.createElement("div");
        buttonsContainer.innerHTML = "<br><button onclick='volverAlMenu()'>Volver al Menú</button> <button onclick='reiniciarJuego()'>Reiniciar Juego</button>";
        highscoresList.appendChild(buttonsContainer);
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
