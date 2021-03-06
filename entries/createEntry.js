const lodash = require('lodash');
const { query } = require('../queries/queries');
const { imageUpload } = require('../s3/imageUpload');

async function createEntry(req, res, client) {
  const body = lodash.get(req, 'body', {});
  const errorMessage = 'Error creating new entry';
  let succesfulResponse = {};

  const imagePath = imageUpload(body.imageURLTest);
  //   console.log(body.imageURLTest);
  //   console.log(body);

  try {
    await client.query(query('insertEntry'), [
      body.currentContestID,
      body.name,
      imagePath,
      body.description,
    ]);

    const response = await client.query(query('getAllEntries'), [
      body.currentContestID,
    ]);

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
