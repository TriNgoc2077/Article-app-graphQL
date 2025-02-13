import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port: number | string = process.env.PORT || 3001;

app.get('/articles', (req: Request, res: Response) => {
    res.json({
        articles: []
    });
});
app.listen(port, () => {
    console.log('App listening on port ', port);
});