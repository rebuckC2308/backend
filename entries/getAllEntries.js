/* eslint-disable max-len */
const AWS = require('aws-sdk');
const { query } = require('../queries/queries');

const s3 = new AWS.S3({
  accessKeyId: AWS.config.credentials.accessKeyId,
  secretAccessKey: AWS.config.credentials.secretAccessKey,
});

async function getAllEntries(req, res, client) {
  const { body } = req;

  const contestID = Number(body.id);

  const result = await client.query(query('getAllEntries'), [contestID]);

  const entriesArray = result.rows;

  const imageurl = s3.getSignedUrl('getObject', {
    Bucket: process.env.BUCKET,
    Key: entriesArray[0].imageurl,
  });

  console.log(imageurl);
  //   const entriesAndImagesArray = entriesArray.map((entry) => {
  //     console.log(entry.imageurl);
  //     const newImageURL = s3.getSignedUrl('getObject', {
  //       Bucket: process.env.BUCKET,
  //       Key: entry.imageurl,
  //     });

  //     return {
  //       // eslint-disable-next-line max-len
  //       id: entry.id, contestid: entry.contestid, name: entry.name, imageurl: newImageURL, description: entry.description,
  //     };
  //   });
  //   console.log(entriesAndImagesArray[0]);

  const data = { ...entriesArray[0], imageurl };
  if (!entriesArray) {
    return res.status(422).send({ errorMessage: 'This contest does not have entries yet!' });
  }

  return res.status(200).send([data]);
}

module.exports = { getAllEntries };
