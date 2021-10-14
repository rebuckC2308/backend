const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.post("/users", (req, res) => {
  const body = req.body;

  const requestBodyIsInvalid =
    Object.keys(body).length !== 2 ||
    !Object.keys(body).includes("email") ||
    !Object.keys(body).includes("password");

  if (requestBodyIsInvalid) {
    res.status(400).send("Failure!");
  } else {
    res.status(200).send("Hello World!");
  }
});

module.exports = app;
