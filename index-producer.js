import express from 'express';
import { getUserData } from './src/user-service.js';
import { enqueuePdfGeneration } from './src/queue-service.js';

const app = express();
const port = 8080;

app.post('/user', async (req, res) => {
  const user = getUserData();
  const { MessageId } = await enqueuePdfGeneration(user);

  res.send({
    user,
    message: {
      id: MessageId,
    }
  });
});


app.listen(port, () => {
  console.log(`Queue app listening on port ${port}`)
});
