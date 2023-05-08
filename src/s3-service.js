import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import fs from 'fs';

const awsRegion = 'eu-west-3';

export const uploadFileToS3 = async (filePath, s3Key, s3Bucket = 'queue-demo-pdf') => {
  const s3Client = new S3Client({
    region: awsRegion,
  });

  const params = {
    Bucket: s3Bucket,
    Key: s3Key,
    Body: fs.createReadStream(filePath),
  };

  await s3Client.send(new PutObjectCommand(params));

  return `https://${s3Bucket}.s3.eu-west-3.amazonaws.com/${s3Key}`;
};
