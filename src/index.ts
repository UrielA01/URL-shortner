import express from 'express';
import "./DB/index";
import { validateURL, postURL } from './Controllers/url';

const app = express();
const port: number = 3000;

app.use(express.json());


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


app.post('/url', validateURL(), postURL);

app.get('/:urlID', (req, res) => {
});