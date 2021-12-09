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
  !Object.keys(body).includes("username") ||
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
      [body.username, hashedPassword]
    );
  } catch (err) {
    if (err.code === "23505") {
      const errorMessage =
        "This username is already taken. Please enter a new Username";
      return res.send(errorMessage);
    }
  }

  res.status(201).send({ message: `Created User: ${body.username}` });
});

app.post("/login", async (req, res) => {
  const body = req.body;

  if (requestBodyIsInvalid(body)) {
    console.log("FAILURE");
    return res.status(422).send({ message: "Failure!" });
  }

  console.log(body.username, body.password);

  const result = await client.query(
    "SELECT * FROM USERS WHERE USERS.user = $1",
    [body.username]
  );

  const [userObj] = result.rows;
  //only one element in result.rows
  console.log(userObj);
  ({ id, user, password: passwordDB } = userObj);
  console.log(id, user, passwordDB);

  bcrypt.compare(body.password, passwordDB, (err, isMatch) => {
    if (err) {
      return console.log("ERROR LOGGING");
    }
    if (!isMatch) {
      return console.log("ERROR LOGGING");
    }
    console.log("Logged in");
  });

  console.log("got here!!!!");
  res.status(200).send({ message: "success!" });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
