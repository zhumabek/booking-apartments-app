//eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

import {ApolloServer} from "apollo-server-express";
import {connectDatabase} from "./database";
import express, { Application } from "express";
import {resolvers, typeDefs} from "./graphql";

const mount = async (app: Application) => {
    await connectDatabase();
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({req, res}) => ({ req, res })
    });

    server.applyMiddleware({ app, path: "/api" });
    app.listen(process.env.PORT);

    console.log(`[app] : http://localhost:${process.env.PORT}`);
};

mount(express());