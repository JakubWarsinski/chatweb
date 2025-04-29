const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', { title: 'Witaj w mojej apce!', message: 'Hello, EJS!' });
});

app.listen(port, () => {
  console.log(`Serwer działa na http://localhost:${port}`);
});