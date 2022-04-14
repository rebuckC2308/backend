const { query } = require('../queries/queries');
const AWS = require('aws-sdk');


async function getAllEntries(req, res, client) {
  const { body } = req;

  const contestID = Number(body.id);

  const result = await client.query(query('getAllEntries'), [contestID]);

  const entriesArray = result.rows;
  console.log({ entriesArray })
  AWS.config.update({ region: process.env.REGION });

  const s3 = new AWS.S3({
    accessKeyId: AWS.config.credentials.accessKeyId,
    secretAccessKey: AWS.config.credentials.secretAccessKey,
  });

  console.log(AWS.config.credentials.accessKeyId)
  console.log(AWS.config.credentials.secretAccessKey)

  console.log({entriesArray})

const presignedUrl = entriesArray.length ? s3.getSignedUrl('getObject', {
  Bucket: process.env.BUCKET,
  Key:  `${entriesArray[0].imageurl}.jpg`,
}) : null

console.log({presignedUrl})

const final = entriesArray.map(( item ) => ({ ...item, imageurl: presignedUrl}))

  if (!entriesArray) {
    return res.status(422).send({ errorMessage: 'This contest does not have entries yet!' });
  }

  return res.status(200).send(final);
}

module.exports = { getAllEntries };
