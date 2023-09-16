import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
    res.send('Hello, Express with TypeScript!');
});

app.post('/url', (req, res) => {
    console.log(req.body);
    
    res.sendStatus(201);
});