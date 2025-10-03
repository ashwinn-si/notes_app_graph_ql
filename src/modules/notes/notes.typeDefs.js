export const typeDefs = `
  type Note {
    id: ID!
    user_id: ID!
    title: String!
    content: String!
    is_deleted: Boolean!
  }

  type NotesResponse {
    statusCode: Int!
    message: String!
    data: [Note]
  }

  type NoteResponse {
    statusCode: Int!
    message: String!
    data: Note
  }

  type GeneralResponse {
    statusCode: Int!
    message: String!
  }

  type Query {
    getAllNotes: NotesResponse  # Changed from [Note] to NotesResponse
    getNote(noteId: ID!): NoteResponse  # Changed from Note to NoteResponse
  }

  type Mutation {
    addNote(title: String!, content: String!): GeneralResponse!
    deleteNote(noteId: ID!): GeneralResponse!
    editNote(title: String!, content: String!, noteId: ID!): GeneralResponse!
  }
`