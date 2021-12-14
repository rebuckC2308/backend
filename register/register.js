const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const requestBodyIsInvalid = (body) =>
  Object.keys(body).length !== 2 ||
  !Object.keys(body).includes("username") ||
  !Object.keys(body).includes("password");

async function register(req, res) {
  const body = req.body;

  if (requestBodyIsInvalid(body)) {
    console.log("FAILURE");
    return res.status(400).send({ message: "Failure!" });
  }

  const hashedPassword = bcrypt.hashSync(body.password, bcrypt.genSaltSync());
  const token = jwt.sign({ userId: body._id }, process.env.JWTKEY);

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
  console.log(body);
  res.status(201).send({ message: `Created User: ${body.username}`, token });
}

module.exports = { register };
