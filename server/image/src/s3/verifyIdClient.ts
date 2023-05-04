import { S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  endpoint: process.env.VERIFY_ID_BUCKET_ENDPOINT,
  region: process.env.OBJECT_STORAGE_REGION,
  credentials: {
    accessKeyId: process.env.OSTORE_KEY,
    secretAccessKey: process.env.OSTORE_SEC,
  },
});

export default s3Client;