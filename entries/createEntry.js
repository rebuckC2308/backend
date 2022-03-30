const lodash = require('lodash');
const { query } = require('../queries/queries');
const { imageUpload } = require('../s3/imageUpload');

async function createEntry(req, res, client) {
  const body = lodash.get(req, 'body', {});
  const errorMessage = 'Error creating new entry';
  let succesfulResponse = {};

  const imagePath = await imageUpload(body.imageBytes);
  //   console.log(body.imageURLTest);
  //   console.log(body);

  console.log('Im here');

  try {
    console.log('Im here');
    await client.query(query('insertEntry'), [
      body.currentContestID,
      body.entryName,
      imagePath,
      body.entryDescription,
    ]);

    console.log({
      a: body.currentContestID,
      b: body.entryName,
      c: imagePath,
      d: body.entryDescription,
    });
    const response = await client.query(query('getAllEntries'), [
      body.currentContestID,
    ]);

    succesfulResponse = {
      entries: response.rows,
    };
    return res.status(200).send(succesfulResponse);
  } catch (err) {
    console.log(err);
    if (err) {
      return res.status(409).send({ errorMessage });
    }
  }
  console.log('HERE I AM');
  return res.status(200).send(succesfulResponse);
}

module.exports = { createEntry };
