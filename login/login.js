const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const requestBodyIsInvalidPostRL = (body) => Object.keys(body).length !== 2
  || !Object.keys(body).includes('username')
  || !Object.keys(body).includes('password');

async function login(req, res, client) {
  const { body } = req;
  if (requestBodyIsInvalidPostRL(body)) {
    return res.status(422).send({ message: 'Failure!' });
  }
  const result = await client.query(
    'SELECT * FROM USERS WHERE USERS.user = $1',
    [body.username],
  );
  const [userObj] = result.rows;
  // eslint-disable-next-line no-undef
  const { password: passwordDB } = userObj;
  bcrypt.compare(body.password, passwordDB, (err, isMatch) => {
    if (err) {
      return console.error('ERROR LOGGING');
    }
    if (!isMatch) {
      return console.error('ERROR LOGGING');
    }

    return null;
  });

  // eslint-disable-next-line no-underscore-dangle
  const token = jwt.sign({ userId: body._id }, process.env.JWTKEY);
  return res.status(200).send({ message: 'success!', token });
}

module.exports = { login };
