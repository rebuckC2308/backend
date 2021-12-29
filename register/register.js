const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const queries = require('../queries/queries');

const requestBodyIsInvalid = (body) => Object.keys(body).length !== 2
  || !Object.keys(body).includes('username')
  || !Object.keys(body).includes('password');

async function register(req, res, client) {
  const { body } = req;

  if (requestBodyIsInvalid(body)) {
    return res.status(400).send({ message: 'Failure!' });
  }

  const hashedPassword = bcrypt.hashSync(body.password, bcrypt.genSaltSync());
  // eslint-disable-next-line no-underscore-dangle
  const token = jwt.sign({ userId: body._id }, process.env.JWTKEY);

  try {
    await client.query(
      queries.query('insertUser'),
      [body.username, hashedPassword],
    );
  } catch (err) {
    if (err.code === '23505') {
      const errorMessage = 'This username is already taken. Please enter a new Username';
      return res.send(errorMessage);
    }
  }

  return res.status(201).send({ message: `Created User: ${body.username}`, token });
}

module.exports = { register };
