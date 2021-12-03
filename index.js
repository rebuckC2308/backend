require("dotenv").config();

const express = require("express");
const app = express();
const port = 3000;

const { Client } = require("pg");
const client = new Client();
client.connect();
const bcrypt = require("bcryptjs");

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
  const body = req.body;

  if (requestBodyIsInvalid(body)) {
    console.log("FAILURE");
    return res.status(400).send({ message: "Failure!" });
  }

  const hashedPassword = bcrypt.hashSync(body.password, bcrypt.genSaltSync());

  try {
    await client.query(
      'INSERT INTO users ("user", "password") VALUES ($1, $2)',
      [body.email, hashedPassword]
    );
  } catch (err) {
    if (err.code === "23505") {
      const errorMessage =
        "This username is already taken. Please enter a new Username";
      return res.send(errorMessage);
    }
  }

  res.status(201).send({ message: `Created User: ${body.email}` });
});

app.post("/login", async (req, res) => {
  const body = req.body;

  if (requestBodyIsInvalid(body)) {
    console.log("FAILURE");
    return res.status(400).send({ message: "Failure!" });
  }

  //   const query = {
  //     name: "fetch-user",
  //     text: "SELECT * FROM users WHERE user = $1",
  //     values: [body.email],
  //   };

  //   client
  //     .query(query)
  //     .then((res) => console.log(res.rows[0]))
  //     .catch((e) => console.error(e.stack));

  console.log(body.email);

  const result = await client.query(
    "SELECT * FROM USERS WHERE USERS.user = $1",
    [body.email]
  );

  console.log("got here!!!!");
  res.json(result.rows);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
