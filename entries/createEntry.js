const lodash = require('lodash');
const { query } = require('../queries/queries');

async function createEntry(req, res, client) {
  const body = lodash.get(req, 'body', {});
  const errorMessage = 'Error creating new entry';
  let succesfulResponse = {};
  try {
    await client.query(
      query('insertEntry'),
      [body.currentContestID, body.name, body.imageURL, body.description],
    );

    const response = await client.query(
      query('getAllEntries'),
      [body.currentContestID],
    );

    succesfulResponse = {
      entries: response.rows,
    };
    return res.status(200).send(succesfulResponse);
  } catch (err) {
    if (err) {
      return res.status(409).send({ errorMessage });
    }
  }
  return res.status(200).send(succesfulResponse);
}

module.exports = { createEntry };
