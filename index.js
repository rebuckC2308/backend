require("dotenv").config();

const express = require("express");
const app = express();
const port = 3000;

const { Client } = require("pg");
const client = new Client();

const requestBodyIsInvalid = (body) =>
  Object.keys(body).length !== 2 ||
  !Object.keys(body).includes("email") ||
  !Object.keys(body).includes("password");

app.use(express.json());

app.use("/", (req, res, next) => {
  console.log("Request Recieved!");
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/users", async (req, res) => {
  await client.connect();
  const body = req.body;

  if (requestBodyIsInvalid(body)) {
    console.log("FAILURE");
    return res.status(400).send({ message: "Failure!" });
  }
  console.log("SUCCESS");

  await client.query('INSERT INTO users ("user", "password") VALUES ($1, $2)', [
    body.email,
    body.password,
  ]);

  await client.end();

  res.status(201).send({ message: `Created User: ${body.email}` });
});

app.post("/login", async (req, res) => {
  const body = req.body;

  if (requestBodyIsInvalid(body)) {
    console.log("FAILURE");
    return res.status(400).send({ message: "Failure!" });
  }
  console.log("SUCCESS");

  const result = await client.query(
    "SELECT (user, password) FROM users WHERE user = $1 AND password = $2 ",
    [body.email, body.password]
  );

  console.log(result);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
