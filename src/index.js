const { GraphQLServer } = require("graphql-yoga");
const { PrismaClient } = require("@prisma/client");
// implement subscriptions to the following events
const { PubSub } = require("apollo-server");
const fs = require("fs");
const path = require("path");

const { getUserId } = require("./utils");
const Subscription = require("./resolvers/Subscription");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const User = require("./resolvers/User");
const Link = require("./resolvers/Link");
const Vote = require('./resolvers/Vote')

const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Link,
  Vote
};

const prisma = new PrismaClient();
const pubsub = new PubSub();
const server = new GraphQLServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
  resolvers,
  context: ({ request }) => {
    return {
      ...request,
      prisma,
      pubsub,
      userId:
        request && request.headers.authorization ? getUserId(request) : null,
    };
  },
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
