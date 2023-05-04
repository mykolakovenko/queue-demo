import express from 'express';
import { getUserData } from './user-service.js';
import { generatePdf } from './pdf-service.js';

const app = express();
const port = 3001;

app.get('/healthcheck', (req, res) => {
  res.send({
    status: 'operational',
  });
});

app.post('/user', async (req, res) => {
  const user = getUserData();
  const pdf = await generatePdf(user);

  res.send({
    user,
    pdf,
  });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
