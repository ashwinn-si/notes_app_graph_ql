import { addNotesService, deleteNotesService, getAllNotesService, getNoteService, updateNoteService } from "./notes.service.js";

export const resolvers = {
  Query: {
    getAllNotes: async (parent, _, { user }) => {
      try {
        const { data } = await getAllNotesService({ userId: user.userId });
        return {
          statusCode: 200,
          message: "All Notes",
          data: data
        };
      } catch (err) {
        return {
          statusCode: 500,
          message: err.message,
          data: null
        };
      }
    },
    getNote: async (_, { noteId }, { user }) => {
      try {
        const { data } = await getNoteService({ userId: user.userId, noteId: noteId });
        return {
          statusCode: 200,
          message: "Notes Id",
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
    addNote: async (_, { title, content }, { user }) => {
      try {
        await addNotesService({ userId: user.userId, title, content });
        return {
          statusCode: 200,
          message: "Notes Added Successfully",
        };
      } catch (err) {
        return {
          statusCode: 500,
          message: err.message,
          data: null
        };
      }
    },
    deleteNote: async (_, { noteId }, { user }) => {
      try {
        await deleteNotesService({ userId: user.userId, noteId });
        return {
          statusCode: 200,
          message: "Deleted Noted Successfully",
        };
      } catch (err) {
        return {
          statusCode: 500,
          message: err.message,
          data: null
        };
      }
    },
    editNote: async (_, { title, content, noteId }, { user }) => {
      try {
        await updateNoteService({ userId: user.userId, title, content, noteId: noteId });
        return {
          statusCode: 200,
          message: "Notes Updated Successfully",
        };
      } catch (err) {
        return {
          statusCode: 500,
          message: err.message,
          data: null
        };
      }
    },
  }
}