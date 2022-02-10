const { query } = require('../queries/queries');

async function getContestEntries(req, res, client) {
  const { body } = req;

  const contestPIN = Number(body.contestPIN);
  // send the entire res object into the get all entries function?

  const result = await client.query(query('getIDofContest'), [contestPIN]);

  const [contestObj] = result.rows;
  if (!contestObj) {
    return res.status(422).send({ errorMessage: 'Invalid Contest PIN. Please try again.' });
  }
  //   console.log(contestObj);
  return res.status(200).send(contestObj);
}

module.exports = { getContestEntries };
