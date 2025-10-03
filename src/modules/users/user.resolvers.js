import { generateJWTToken } from "../../utils/tokenGenerator.js";
import { getUserService, loginService, signupService } from "./user.service.js";


export const resolvers = {
  Query: {
    getUserDetails: async (_, args, context) => {
      try {
        const { data } = await getUserService({ userId: context.user.userId });
        return {
          statusCode: 200,
          message: "User Details",
          data: data
        };
      } catch (err) {
        return {
          statusCode: 500,
          message: err.message,
          data: null
        };
      }
    }
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      try {
        const { userId } = await loginService({ email, password });
        const jwtToken = generateJWTToken({ userId });
        return {
          statusCode: 200,
          message: "Login Successfull",
          data: {
            jwtToken
          }
        }
      } catch (err) {
        return {
          statusCode: 500,
          message: err.message,
          data: null
        };
      }
    },
    signup: async (parent, { email, password, name }) => {
      try {
        await signupService({ email, password, name });
        return {
          statusCode: 200,
          message: "SignUp Successfull",
        }
      } catch (err) {
        return {
          statusCode: 500,
          message: err.message,
          data: null
        };
      }
    }
  }
};