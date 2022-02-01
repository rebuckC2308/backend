const { query } = require('../queries/queries');

async function contest(req, res, client) {
  const { body } = req;
  const contestId = Math.floor((Math.random() * 99999) + 1);
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
