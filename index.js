require('dotenv').config();
const { Client } = require('pg');
const express = require('express');

const app = express();
const port = 3000;
const client = new Client();
client.connect();

const register = require('./register/register');
const login = require('./login/login');
const { contest } = require('./contest/contest');
const { createEntry } = require('./entries/createEntry');
const { getContestEntries } = require('./contest/getContestEntries');
const { getAllEntries } = require('./entries/getAllEntries');

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

app.post('/createContest', async (req, res) => {
  contest(req, res, client);
});

app.post('/getContestEntries', async (req, res) => {
  getContestEntries(req, res, client);
});

app.post('/getAllEntries', async (req, res) => {
  getAllEntries(req, res, client);
});

app.post('/createEntry', async (req, res) => {
  createEntry(req, res, client);
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening at http://localhost:${port}`);
});

module.exports = app;
