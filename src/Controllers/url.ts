import { generateShortUrl } from '../helperFunctions'
import { body, validationResult } from 'express-validator';
import { URLSchema } from '../DB/Schemas/URLSchema';
import { Request, Response, NextFunction } from 'express';

const LOCALURL: string = "http://localhost:3000/";
interface ShortUrl {
    originalURL: string
    generatedID: string
    shortURL: string
}

const createURLRecord = async (originalURL, generatedID, shortURL) => {
    const newUrl = {
        originalURL,
        generatedID,
        shortURL,
    };

    return await URLSchema.create(newUrl);
};

const validateURL = () => {
    return [
        body('url')
            .isURL()
            .withMessage('Invalid URL')
            .exists()
            .withMessage('URL is required')
            .trim()
            .custom(async (url: string) => {
                try {
                    const urlExist: ShortUrl | null = await URLSchema.findOne({ originalURL: url });
                    if (urlExist) {
                        throw new Error(`URL already in the DB: ${urlExist.shortURL}`);
                    }
                } catch (error) {
                    // Handle any database or custom validation errors here
                    throw new Error(`Validation failed: ${error.message}`);
                }
            }),
        (req: Request, res: Response, next: NextFunction) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        }
    ];
}

const postURL = async (req: Request, res: Response) => {
    try {
        const { url } = req.body;
        const generatedID: string = generateShortUrl(5);
        const shortURL: string = LOCALURL + generatedID;

        const newURLRecord = await createURLRecord(url, generatedID, shortURL);
        res.status(201).json(newURLRecord);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

const getURL = async (req: Request, res: Response) => {
    try {
        const { urlID } = req.params;
        const fullURL: ShortUrl | null = await URLSchema.findOne({ generatedID: urlID });
        res.status(201).json(fullURL.originalURL);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

export { validateURL, postURL, getURL }