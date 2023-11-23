const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Servir archivos estáticos desde la carpeta raíz
app.use(express.static(path.join(__dirname)));

app.get('/highscores', (req, res) => {
  // Lee los highscores desde el archivo
  const highscores = JSON.parse(fs.readFileSync('db/highscores.json', 'utf-8'));
  res.json(highscores);
});

app.post('/highscores', (req, res) => {
  // Recibe nuevos highscores y guárdalos en el archivo
  const nuevoHighscore = req.body;
  let highscores = JSON.parse(fs.readFileSync('db/highscores.json', 'utf-8'));

  // Agrega el nuevo highscore
  highscores.push(nuevoHighscore);

  // Ordena los highscores de mayor a menor
  highscores.sort((a, b) => b.puntuacion - a.puntuacion);

  // Mantiene solo los 20 primeros registros
  highscores = highscores.slice(0, 20);

  fs.writeFileSync('db/highscores.json', JSON.stringify(highscores, null, 2), 'utf-8');
  res.json({ success: true });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});