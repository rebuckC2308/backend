require('dotenv').config();
const AWS = require('aws-sdk');
const uuid = require('uuid');

AWS.config.update({ region: process.env.REGION });

const s3 = new AWS.S3({
  accessKeyId: AWS.config.credentials.accessKeyId,
  secretAccessKey: AWS.config.credentials.secretAccessKey,
});

async function imageUpload(image) {
  try {
    const uniqueImgKey = `${uuid.v4()}.jpg`;
    const buffer = Buffer.from(image, "base64");

    const params = {
      Bucket: process.env.BUCKET,
      Key: uniqueImgKey,
      Body: buffer,
    };

    s3.upload(params, (err) => {
      if (err) {
        throw err;
      }
    });

    return uniqueImgKey;
  } catch (err) {
    const errorMessage = 'Something went wrong uploading your image. Please try again';
    return errorMessage;
  }
}

module.exports = { imageUpload };
