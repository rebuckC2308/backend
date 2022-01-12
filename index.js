require('dotenv').config();
const { Client } = require('pg');
const express = require('express');

const app = express();
const port = 3000;
const register = require('./register/register');

const client = new Client();
client.connect();
const login = require('./login/login');

app.use(express.json());

app.use('/', (req, res, next) => {
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/register', async (req, res) => {
  register.register(req, res, client);
});

app.post('/login', async (req, res) => {
  login.login(req, res, client);
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening at http://localhost:${port}`);
});

module.exports = app;
