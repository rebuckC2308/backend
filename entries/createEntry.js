const { query } = require('../queries/queries');

async function createEntry(req, res, client) {
  const { body } = req;
  const contestIdNum = Number(body.currentContestID);
  const errorMessage = 'Error creating new entry';
  //   console.log(body);
  //   console.log(typeof contestIdNum);
  //   console.log(contestIdNum);

  try {
    await client.query(
      query('insertEntry'),
      [contestIdNum, body.name, body.imageURL, body.description],
    );
  } catch (err) {
    if (err) {
      return res.status(409).send({ errorMessage });
    }
  }

  const succesfulResponse = {
    errorMessage,
    entryName: body.name,
    entryImageURL: body.imageURL,
    entryDescription: body.description,
  };
  return res.status(200).send(succesfulResponse);
}

module.exports = { createEntry };
