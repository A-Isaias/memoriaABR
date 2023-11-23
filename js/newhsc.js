import { serverURI } from './env.js';

document.addEventListener("DOMContentLoaded", () => {
	const highscoreForm = document.getElementById("highscore-form");

	// Obtener la puntuación del localStorage o un valor predeterminado si no está presente
	const puntuacion = localStorage.getItem("puntuacion") || 0;

	// Actualizar el campo de puntuación en el formulario
	document.getElementById("puntuacion").value = puntuacion;

	// Mostrar la puntuación en algún elemento HTML
	const puntuacionElement = document.getElementById("mostrar-puntuacion");
	puntuacionElement.textContent = `Tu puntuación: ${puntuacion} puntos`;

	highscoreForm.addEventListener("submit", async (e) => {
		e.preventDefault();

		// Obtener el nombre del formulario
		const nombre = document.getElementById("nombre").value;

		// Validar que se haya ingresado un nombre
		if (!nombre) {
			alert("Por favor, ingresa tu nombre.");
			return;
		}

		// Crear un objeto con el nombre y la puntuación
		const nuevoHighscore = { nombre: nombre, puntuacion: puntuacion };

		try {
			// Guardar el highscore
			await guardarHighscore(nuevoHighscore);

			// Redirigir a la página de highscores
			window.location.href = "highscores.html";
		} catch (error) {
			console.error("Error al guardar highscore:", error);
		}
	});
});

// Define la función guardarHighscore
const guardarHighscore = (nuevoHighscore) => {
	console.log("Guardando highscore:", nuevoHighscore);

	var myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

	var urlencoded = new URLSearchParams();
	urlencoded.append("nombre", nuevoHighscore.nombre);
	urlencoded.append("puntuacion", nuevoHighscore.puntuacion);

	var requestOptions = {
		method: 'POST',
		headers: myHeaders,
		body: urlencoded,
		redirect: 'follow'
	};

	return fetch(serverURI + "memoria_abr", requestOptions)
		.then(response => response.text())
		.then(result => console.log(result))
		.catch((error) => console.error("Error al guardar highscores:", error));
};
