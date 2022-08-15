"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = void 0;
const http_1 = require("http");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
// 1
const startServer = async () => {
    // 2
    const app = (0, express_1.default)();
    const httpServer = (0, http_1.createServer)(app);
    // 3
    const typeDefs = (0, apollo_server_express_1.gql) `
    type Query {
      hello: String
    }
  `;
    // 4
    const resolvers = {
        Query: {
            hello: () => "Hello world!",
        },
    };
    // 5
    const apolloServer = new apollo_server_express_1.ApolloServer({
        typeDefs,
        resolvers,
    });
    // 6
    await apolloServer.start();
    // 7
    apolloServer.applyMiddleware({
        app,
        path: "/api",
    });
    // 8
    httpServer.listen({ port: process.env.PORT || 4000 }, () => console.log(`Server listening on localhost:${process.env.PORT || 4000}${apolloServer.graphqlPath}`));
};
exports.startServer = startServer;
(0, exports.startServer)();
