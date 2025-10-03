import { userTypeDefs, notesTypeDefs } from "../modules/index.js";

export const typeDefs = `#graphql
  ${userTypeDefs}
  ${notesTypeDefs}
`;