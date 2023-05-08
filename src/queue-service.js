import {
  SQSClient,
  SendMessageCommand,
  ReceiveMessageCommand,
  DeleteMessageCommand
} from '@aws-sdk/client-sqs';

const QueueUrl =  process.env.PDF_GENERATION_QUEUE_URL;
const sqsClient = new SQSClient({ region: process.env.AWS_DEFAULT_REGION });

export const enqueuePdfGeneration = async (user) => {
  const command = new SendMessageCommand({
    QueueUrl,
    MessageBody: JSON.stringify(user),
  });

  return await sqsClient.send(command);
}

export const getMessageFromQueue = async () => {
  const command = new ReceiveMessageCommand({
    QueueUrl,
    MaxNumberOfMessages: 1,
  });
  const response = await sqsClient.send(command);

  if (!response.Messages) {
    return null;
  }

  const message = response.Messages[0];

  return {
    receiptHandle: message.ReceiptHandle,
    body: JSON.parse(message.Body),
  };
}

export const deleteMessage = async (receiptHandle) => {
  const command = new DeleteMessageCommand({
    QueueUrl,
    ReceiptHandle: receiptHandle,
  });
  return await sqsClient.send(command);
}

