import express from 'express';
import { generateShortUrl, doesValueExistInArray, findObjectInArray } from './helperFunctions'
import { body, validationResult } from 'express-validator';
import "./DB/index";
import { URLSchema } from "./DB/Schemas/URLSchema";

const app = express();
const port = process.env.PORT || 3000;
const LOCALURL = "http://localhost:3000/";

app.use(express.json());

interface ShortUrl {
  originalURL: string
  generatedID: string
  shortURL: string
}

const URLs: Array<ShortUrl> = []

const validateURL = () => {
  return [
    body('url')
      .isURL()
      .withMessage('Invalid URL')
      .exists()
      .withMessage('URL is required')
      .trim()
      .custom(async url => {
        const existingUrl = await doesValueExistInArray(URLs, "originalURL", url);
        if (existingUrl) {
          const shortUrl = findObjectInArray(URLs, "originalURL", url)
          throw new Error(`URL already in the DB: ${shortUrl.shortURL}`);
        }
      }),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ];
}


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
  res.send('Hello, Express with TypeScript!');
});

app.post('/url', validateURL(),
  async (req, res) => {
    const { url } = req.body;
    const ID = generateShortUrl(5);
    const shortURL: string = LOCALURL + ID;
    const newUrl: ShortUrl = {
      originalURL: url,
      generatedID: ID,
      shortURL: shortURL
    };

    URLs.push(newUrl);

    const newURLRecord = await URLSchema.create(newUrl);

    res.send(newUrl.generatedID);
  });

app.get('/:urlID', (req, res) => {
  const { urlID } = req.params;
  const shortURL: ShortUrl = findObjectInArray(URLs, "generatedID", urlID);
  res.send(shortURL.originalURL);
});