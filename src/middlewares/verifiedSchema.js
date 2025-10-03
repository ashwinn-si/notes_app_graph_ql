import { shield, rule } from 'graphql-shield';

const isAuthenticated = rule({ cache: 'contextual' })(
  async (parent, args, context) => {
    if (!context.user) {
      return new Error('Authentication required. Please login first.');
    }
    return true;
  }
);

export const permissions = shield({
  Mutation: {
    addNote: isAuthenticated,
    deleteNote: isAuthenticated,
    editNote: isAuthenticated,
  },
  Query: {
    getUserDetails: isAuthenticated,
  }
}, {
  allowExternalErrors: true,
  fallbackError: 'Not authorized!'
});