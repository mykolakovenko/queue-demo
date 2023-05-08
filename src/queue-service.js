import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';

const sqsClient = new SQSClient({ region: process.env.AWS_DEFAULT_REGION });

export const enqueuePdfGeneration = async (user) => {
  const command = new SendMessageCommand({
    QueueUrl: process.env.PDF_GENERATION_QUEUE_URL,
    MessageBody: JSON.stringify(user),
  });

  return await sqsClient.send(command);
}


