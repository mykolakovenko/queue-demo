import express from 'express';
import { getUserData } from './src/user-service.js';
import { generatePdf } from './src/pdf-service.js';

const app = express();
const port = 8080;

app.post('/user', async (req, res) => {
  const user = getUserData();
  const pdf = await generatePdf(user);

  res.send({
    user,
    pdf,
  });
});


app.listen(port, () => {
  console.log(`Single instance app listening on port ${port}`)
});
