'use strict'

require("dotenv").config();
const express =  require("express");
const { ApolloServer }= require("apollo-server-express");
const cors = require("cors");
const typeDefs = require("./graphql/schemas");
const resolvers = require("./graphql/resolvers");
const context = require("./graphql/context");
const app = express();

app.use(cors());
const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context,
    introspection: true,
    playground: {
        settings: {
            'schema.polling.enable': false,
        },
    },
});

apolloServer.applyMiddleware({ app, path: '/api' });

app.get('/', (req, res) => {
    res.send("Welcome to the club!!!");
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server start at ${Date()}`);
    console.log(`Listening at http://localhost:${port}`);
})