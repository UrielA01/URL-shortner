import express from 'express';
import {generateShortUrl, doesValueExistInArray, findObjectInArray} from './helperFunctions'
import { body, validationResult } from 'express-validator';

const app = express();
const port = process.env.PORT || 3000;

interface ShortUrl {
    originalURL: string
    generatedID: string
    shortURL: string
  }

const URLs:Array<ShortUrl> = []

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
  

app.use(express.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
    res.send('Hello, Express with TypeScript!');
});

app.post('/url', validateURL(),
        (req, res) => {
        const { url } = req.body;
        const ID = generateShortUrl(5);
        const shortURL: string = "http://localhost:3000/" + ID;
        const newUrl: ShortUrl = {
            originalURL: url,
            generatedID: ID,
            shortURL: shortURL
        };

        URLs.push(newUrl);

        console.log(URLs);
        
        
        res.sendStatus(201);
});

app.get('/:urlID', (req, res) => {
    const { urlID } = req.params;
    const shortURL:ShortUrl = findObjectInArray(URLs, "generatedID", urlID);
    res.send(shortURL.originalURL);
});