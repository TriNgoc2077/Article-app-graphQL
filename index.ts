import express, { Application } from 'express';
import dotenv from 'dotenv';
import * as database from './Config/database';

import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';

const startServer = async () => {
    dotenv.config();
    database.connect();

    const app: Application = express();
    const port: number | string = process.env.PORT || 3001;

    //graphQL
    const apolloServer = new ApolloServer({ typeDefs, resolvers });
    await apolloServer.start();

    apolloServer.applyMiddleware({
        app,
        path: '/graphql'
    });

    app.listen(port, () => {
        console.log('App listening on port ', port);
    });
}
startServer();