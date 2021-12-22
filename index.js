require("dotenv").config();
const register = require("./register/register");
const login = require("./login/login");

const express = require("express");
const app = express();
const port = 3000;

const { Client } = require("pg");
const client = new Client();
client.connect();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

app.use(express.json());

app.use("/", (req, res, next) => {
  console.log("Request Recieved!");
  const body = req.body;

  //   try {
  //     jwt.verify(req.body.token, process.env.JWTKEY);
  //     console.log("SUCCESSFULLY ");
  //   } catch (err) {
  //     console.log(err);
  //   }

  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/register", async (req, res) => {
  register.register(req, res);
});

app.post("/login", async (req, res) => {
  login.login(req, res, client);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

module.exports = app;
