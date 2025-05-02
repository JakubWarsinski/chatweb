const express = require('express');
const app = express();
const path = require('path');
const userRoutes = require('../routes/userRoutes');
const homeRoutes = require('../routes/homeRoutes');
const session = require('express-session');

app.use(session({
  secret: 'tajny_klucz', // zmień na coś mocnego
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // jeśli masz HTTPS to daj true
}));

require('dotenv').config(); 

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../domains'));

app.use('/partials', express.static(path.join(__dirname, '../domains/partials/static')));
app.use('/home', express.static(path.join(__dirname, '../domains/home/static')));
app.use('/user', express.static(path.join(__dirname, '../domains/user/static')));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use('/user', userRoutes);
app.use('/home', homeRoutes);

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.clear();
  console.log(`Strona: [ http://localhost:${PORT}/home ]`);
});