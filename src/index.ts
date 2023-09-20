import express from 'express';
import "./DB/index";
import cors from 'cors';
import { validateURL, postURL, getURL } from './Controllers/url';

const app = express();
const port: number = 8000;

app.use(express.json());
app.use(cors())

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.post('/url', validateURL(), postURL);

app.get('/url/:urlID', getURL);