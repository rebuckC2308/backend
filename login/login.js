const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const requestBodyIsInvalidPostRL = (body) =>
  Object.keys(body).length !== 2 ||
  !Object.keys(body).includes("username") ||
  !Object.keys(body).includes("password") ||
  !Object.keys(token);

async function login(res, req) {
  const body = req.body;
  if (requestBodyIsInvalidPostRL(body)) {
    console.log("FAILURE");
    return res.status(422).send({ message: "Failure!" });
  }
  const result = await client.query(
    "SELECT * FROM USERS WHERE USERS.user = $1",
    [body.username]
  );
  const [userObj] = result.rows;
  //only one element in result.rows
  ({ id, user, password: passwordDB } = userObj);
  bcrypt.compare(body.password, passwordDB, (err, isMatch) => {
    if (err) {
      return console.log("ERROR LOGGING");
    }
    if (!isMatch) {
      return console.log("ERROR LOGGING");
    }
  });
  const token = jwt.sign({ userId: body._id }, process.env.JWTKEY);
  res.status(200).send({ message: "success!", token });
}

module.exports = { login };
