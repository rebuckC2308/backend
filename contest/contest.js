const { query } = require('../queries/queries');

const genRandomNumber = (length) => {
  const numbers = '1234567890';
  // can add characters to this string as well to make more code combinations
  let result = '';
  // eslint-disable-next-line no-plusplus
  for (let i = length; i > 0; --i) {
    result += numbers[Math.round(Math.random() * (numbers.length - 1))];
  }
  return Number(result);
};

async function contest(req, res, client) {
  const { body } = req;
  const contestId = genRandomNumber(5);
  const errorMessage = 'Error creating new contest';
  try {
    await client.query(
      query('insertContest'),
      [body.username, contestId],
    );
  } catch (err) {
    if (err) {
      return res.status(409).send({ errorMessage });
    }
  }
  return res.status(201).send({ admin: body.username, contestId, errorMessage });
}

module.exports = { contest };
