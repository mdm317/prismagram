import "./env.js";
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema.js";
import { authenticateJwt } from "./passport.js";
import { isAuthenticate } from "./middlewares.js";
const PORT = process.env.PORT || 4000;

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();
export default prisma;


const server = new GraphQLServer({
  schema,
  context: ({ request }) => ({ request,isAuthenticate })
});
server.express.use(logger("dev"));
server.express.use(authenticateJwt);
server.start({ port: PORT }, () =>
  console.log(`Server running on  http://localhost:${PORT}`)
);