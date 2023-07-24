import { S3Client, S3ClientConfig } from "@aws-sdk/client-s3";

const googleCloudConfig: S3ClientConfig =
{
    region: process.env.OBJECT_STORAGE_REGION,
    endpoint: process.env.OBJECT_STORAGE_ENDPOINT,
    credentials: {
        accessKeyId: process.env.STORAGE_ACCESS_KEY,
        secretAccessKey: process.env.STORAGE_SECRET_KEY
    }
}

const s3Client = new S3Client(googleCloudConfig);

export default s3Client;