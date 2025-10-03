import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { ApolloServer } from "apollo-server-express"
import { applyMiddleware } from "graphql-middleware"
import { makeExecutableSchema } from "@graphql-tools/schema"
import { connectDB } from "./src/config/dbConnect.js"
import { createTableByDefault } from "./src/config/dbHelper.js"
import { typeDefs, resolvers } from "./src/schema/index.js"
import { jwtVerification } from "./src/middlewares/jwtVerification.js"
import { permissions } from "./src/middlewares/verifiedSchema.js"

dotenv.config()

const app = express();

app.use(cors())
app.use(express.json());


async function startServer() {
  const PORT = parseInt(process.env.PORT) || 5000;

  await connectDB();
  await createTableByDefault();

  // Create executable schema
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  // Apply middleware to schema
  const schemaWithMiddleware = applyMiddleware(schema, permissions);

  const server = new ApolloServer({
    schema: schemaWithMiddleware,
    context: ({ req }) => jwtVerification({ req })
  })

  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  app.listen(PORT, () => { // Changed from httpServer.listen to app.listen
    console.log(`server running in PORT ${PORT}`)
  })
}

startServer();