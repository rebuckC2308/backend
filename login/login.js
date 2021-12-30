const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { query } = require('../queries/queries');

const requestBodyIsInvalidPostRL = (body) => Object.keys(body).length !== 2
  || !Object.keys(body).includes('username')
  || !Object.keys(body).includes('password');

// eslint-disable-next-line consistent-return
async function login(req, res, client) {
  const { body } = req;

  if (requestBodyIsInvalidPostRL(body)) {
    return res.status(422).send({ errorMessage: 'Failed login. Please try again.' });
  }
  const result = await client.query(
    query('getUser'),
    [body.username],
  );

  const [userObj] = result.rows;
  if (!userObj) {
    return res.status(422).send({ errorMessage: 'Invalid username or password. Please try again.' });
  }

  const { password: passwordDB } = userObj;
  bcrypt.compare(body.password, passwordDB, (err, isMatch) => {
    if (err) {
      const errorMessage = 'Invalid username or password. Please try again.';
      return res.status(401).send({ errorMessage });
    }
    if (!isMatch) {
      const errorMessage = 'Invalid username or password. Please try again.';
      return res.status(401).send({ errorMessage });
    }
    // eslint-disable-next-line no-underscore-dangle
    const token = jwt.sign({ userId: body._id }, process.env.JWTKEY);
    return res.status(200).send({ message: 'success!', token });
  });
}

module.exports = { login };
