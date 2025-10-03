export const typeDefs = `
  type User {
    id: ID!
    email: String!
    name: String!
  }

  type LoginData {
    jwtToken: String
  }

  type LoginResponse {
    statusCode: Int!
    message: String
    data: LoginData
  }

  type UserDetailsResponse {
    statusCode: Int!
    message: String
    data: User
  }

  type GeneralResponse {
    statusCode: Int!
    message: String
  }

  type Query {
    getUserDetails: UserDetailsResponse
  }

  type Mutation {
    login(email: String!, password: String!): LoginResponse!
    signup(email: String!, password: String!, name: String!): GeneralResponse!
  }
`