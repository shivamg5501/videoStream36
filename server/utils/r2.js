// server/utils/r2.js
const {
  S3Client,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const dotenv = require("dotenv");

dotenv.config();

const r2 = new S3Client({
  region: process.env.R2_REGION,
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  }
});

const getSignedVideoUrl = async (videoKey) => {
  const command = new GetObjectCommand({
    Bucket: process.env.R2_BUCKET,
    Key: videoKey,
  });

  const url = await getSignedUrl(r2, command, {
    expiresIn: parseInt(process.env.SIGNED_URL_EXPIRE || "120"),
  });

  return url;
};

const getSignedImageUrl = async (imageKey) => {
  const command = new GetObjectCommand({
    Bucket: process.env.R2_BUCKET,
    Key: imageKey,
  });

  const url = await getSignedUrl(r2, command, {
    expiresIn: parseInt(process.env.SIGNED_URL_EXPIRE || "120"),
  });

  return url;
};

module.exports = {
  getSignedVideoUrl,
  getSignedImageUrl,
};
