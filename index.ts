import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import * as database from './Config/database';
import Article from './Model/article.Model';

dotenv.config();
database.connect();

const app: Express = express();
const port: number | string = process.env.PORT || 3001;
//Rest api

app.get('/articles', async (req: Request, res: Response) => {
    const articles = await Article.find({ deleted: false });
    res.json({
        articles: articles
    });
});
app.listen(port, () => {
    console.log('App listening on port ', port);
});