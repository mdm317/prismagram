import { GraphQLServer } from "graphql-yoga";
import resolvers from "../resolvers.js";
import { importSchema } from 'graphql-import'
import { makeExecutableSchema } from 'graphql-tools'

const typeDefs = importSchema('schema.graphql');

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => console.log("✅Graphql Server Running"));
