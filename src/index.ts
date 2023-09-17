import express from 'express';
import { generateShortUrl, doesValueExistInArray, findObjectInArray } from './helperFunctions'
import { body, validationResult } from 'express-validator';
import "./DB/index";
import { URLSchema } from "./DB/Schemas/URLSchema";
import { validateURL, postURL } from './Controllers/url';

const app = express();
const port = process.env.PORT || 3000;
const LOCALURL = "http://localhost:3000/";
interface ShortUrl {
  originalURL: string
  generatedID: string
  shortURL: string
}

app.use(express.json());


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


app.post('/url', validateURL, postURL);

app.get('/:urlID', (req, res) => {
});