/* eslint-disable max-len */
const AWS = require('aws-sdk');
const { query } = require('../queries/queries');

async function getAllEntries(req, res, client) {
  const { body } = req;
  const contestID = Number(body.id);
  const result = await client.query(query('getAllEntries'), [contestID]);
  const entriesArray = result.rows;
  AWS.config.update({ region: process.env.REGION });

  const s3 = new AWS.S3({
    accessKeyId: AWS.config.credentials.accessKeyId,
    secretAccessKey: AWS.config.credentials.secretAccessKey,
  });

  const entriesAndImagesArray = entriesArray.map((entry) => {
    const imageurl = s3.getSignedUrl('getObject', {
      Bucket: process.env.BUCKET,
      Key: entry.imageurl,
    });

    return {
      id: entry.id, contestid: entry.contestid, name: entry.name, imageurl: imageurl, description: entry.description,
    };
  });

  if (!entriesArray || !entriesAndImagesArray) {
    return res.status(422).send({ errorMessage: 'This contest does not have entries yet!' });
  }

  return res.status(200).send(entriesAndImagesArray);
}

module.exports = { getAllEntries };
