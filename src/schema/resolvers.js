import { noteResolvers, userResolvers } from "../modules/index.js";

export const resolvers = {
  Query: {
    ...userResolvers.Query,
    ...noteResolvers.Query
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...noteResolvers.Mutation
  }
}