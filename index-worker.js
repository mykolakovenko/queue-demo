import { deleteMessage, getMessageFromQueue } from './src/queue-service.js';
import { generatePdf } from './src/pdf-service.js';

while (true) {
  console.log('Reading a new message...');
  const message = await getMessageFromQueue();

  if (message) {
    console.log('====== Message received: ==========');
    console.log(message);

    try {
      await generatePdf(message.body);
      await deleteMessage(message.receiptHandle);
    } catch (error) {
      console.error(`Processing error: ${error}, message will be returned to the queue`);
    }

    console.log('====== Message processed ==========');
  }
}



