const { query } = require('../queries/queries');

async function getAllEntries(req, res, client) {
  const { body } = req;

  const contestID = Number(body.id);

  const result = await client.query(query('getAllEntries'), [contestID]);

  const entriesArray = result.rows;

  if (!entriesArray) {
    return res.status(422).send({ errorMessage: 'This contest does not have entries yet!' });
  }

  //   console.log(entriesArray);
  return res.status(200).send(entriesArray);
}

module.exports = { getAllEntries };
