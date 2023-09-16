import express from 'express';
import {generateShortUrl, doesValueExistInArray, findObjectInArray, isURL} from './helperFunctions'

const app = express();
const port = process.env.PORT || 3000;

interface ShortUrl {
    originalURL: string
    generatedID: string
    shortURL: string
  }
  

const URLs: ShortUrl[] = []

app.use(express.json());
app.use(express.urlencoded());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
    res.send('Hello, Express with TypeScript!');
});

app.post('/url', (req, res, next) => {
    const { url } = req.body;
    if (!isURL(url)) {
        res.send("This is not a URL!");   
    }else
        next();
    }, (req, res, next) => {
        const { url } = req.body;
        if (doesValueExistInArray(URLs, url, "originalURL")) {
            const Shorturl = findObjectInArray(URLs, "originalURL", url)
            res.send(`URL already in the DB: ${Shorturl.shortURL}`)
        }else
            next();
        }, 
        (req, res) => {
        const { url } = req.body;
        const ID = generateShortUrl(5);
        const shortURL: string = "http://localhost:3000/" + ID;
        const newUrl: ShortUrl = {
            originalURL: url,
            generatedID: ID,
            shortURL: shortURL
        };

        if (!doesValueExistInArray(URLs, url, "originalURL")) {
            URLs.push(newUrl);
        }

        console.log(URLs);
        
        res.sendStatus(201);
});

app.get('/:urlID', (req, res) => {
    res.send('');
});