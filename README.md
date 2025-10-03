# Notes App - GraphQL API

A GraphQL-based Notes application built with Node.js, Express, Apollo Server, and MySQL. This API allows users to create accounts, authenticate, and manage their personal notes.

## Features

- User authentication (signup/login) with JWT
- Create, read, update, and delete notes
- GraphQL API with Apollo Server
- MySQL database with connection pooling
- Protected routes with middleware
- Secure password handling

## Tech Stack

- **Backend**: Node.js, Express.js
- **GraphQL**: Apollo Server Express
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: GraphQL Shield for route protection
- **Development**: Nodemon for hot reloading

## Prerequisites

Before running this application, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MySQL](https://www.mysql.com/) (v8.0 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd notes_app_graph_ql
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup MySQL Database

Create a MySQL database:

```sql
CREATE DATABASE notes_app;
```

### 4. Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=notes_app
DB_PORT=3306
PORT=5000
JWT_SECRET=your_jwt_secret_key_here
```

**Replace the following:**
- `your_mysql_password` with your MySQL root password
- `your_jwt_secret_key_here` with a secure random string

### 5. Start the server

```bash
npm start
```

The server will start on `http://localhost:5000` and GraphQL playground will be available at `http://localhost:5000/graphql`.

## Database Schema

The application will automatically create the following tables on startup:

### Users Table
```sql
CREATE TABLE users (
  id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  name VARCHAR(100)
);
```

### Notes Table
```sql
CREATE TABLE notes (
  id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id INTEGER NOT NULL,
  title VARCHAR(100),
  content VARCHAR(100),
  is_deleted BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);
```

## API Usage

### GraphQL Endpoint

The GraphQL API is available at: `http://localhost:5000/graphql`

### Authentication

Most operations require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### Sample Queries and Mutations

#### 1. User Signup

```graphql
mutation {
  signup(email: "user@example.com", password: "password123", name: "John Doe") {
    statusCode
    message
  }
}
```

#### 2. User Login

```graphql
mutation {
  login(email: "user@example.com", password: "password123") {
    statusCode
    message
    data {
      jwtToken
    }
  }
}
```

#### 3. Get User Details (Protected)

```graphql
query {
  getUserDetails {
    statusCode
    message
    data {
      id
      email
      name
    }
  }
}
```

#### 4. Create Note (Protected)

```graphql
mutation {
  addNote(title: "My First Note", content: "This is the content of my note") {
    statusCode
    message
  }
}
```

#### 5. Get All Notes (Protected)

```graphql
query {
  getAllNotes {
    statusCode
    message
    data {
      id
      title
      content
      user_id
      isDeleted
    }
  }
}
```

#### 6. Get Single Note (Protected)

```graphql
query {
  getNote(noteId: "1") {
    statusCode
    message
    data {
      id
      title
      content
      user_id
      isDeleted
    }
  }
}
```

#### 7. Update Note (Protected)

```graphql
mutation {
  editNote(noteId: "1", title: "Updated Title", content: "Updated content") {
    statusCode
    message
  }
}
```

#### 8. Delete Note (Protected)

```graphql
mutation {
  deleteNote(noteId: "1") {
    statusCode
    message
  }
}
```

## Project Structure

```
notes_app_graph_ql/
├── src/
│   ├── config/
│   │   ├── dbConnect.js          # Database connection
│   │   └── dbHelper.js           # Database table creation
│   ├── middlewares/
│   │   ├── jwtVerification.js    # JWT token verification
│   │   └── verifiedSchema.js     # GraphQL Shield permissions
│   ├── modules/
│   │   ├── notes/
│   │   │   ├── index.js          # Notes module exports
│   │   │   ├── notes.resolvers.js # Notes GraphQL resolvers
│   │   │   ├── notes.service.js   # Notes business logic
│   │   │   └── notes.typeDefs.js  # Notes GraphQL schema
│   │   └── users/
│   │       ├── index.js          # Users module exports
│   │       ├── user.resolvers.js # Users GraphQL resolvers
│   │       ├── user.service.js   # Users business logic
│   │       └── user.typeDefs.js  # Users GraphQL schema
│   ├── schema/
│   │   ├── index.js              # Combined schema exports
│   │   ├── resolvers.js          # Combined resolvers
│   │   └── typeDefs.js           # Combined type definitions
│   └── utils/
│       └── tokenGenerator.js     # JWT token generation
├── .env                          # Environment variables
├── server.js                     # Main server file
├── package.json                  # Project dependencies
└── README.md                     # Project documentation
```

## Scripts

- `npm start` - Start the server with nodemon (development)
- `npm test` - Run tests (not implemented yet)

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| DB_HOST | MySQL host | localhost |
| DB_USER | MySQL username | root |
| DB_PASSWORD | MySQL password | - |
| DB_NAME | Database name | notes_app |
| DB_PORT | MySQL port | 3306 |
| PORT | Server port | 5000 |
| JWT_SECRET | JWT secret key | - |

## Security Features

- JWT-based authentication
- Protected GraphQL resolvers using GraphQL Shield
- SQL injection prevention with parameterized queries
- User-specific data access (users can only access their own notes)

## Error Handling

The API returns consistent error responses:

```json
{
  "errors": [
    {
      "message": "Error description",
      "extensions": {
        "code": "ERROR_CODE"
      }
    }
  ]
}
```

## Development

### Adding New Features

1. Create service functions in the appropriate service file
2. Add GraphQL type definitions in the typeDefs file
3. Create resolvers in the resolvers file
4. Update the module index.js to export new components
5. Test the new functionality in GraphQL playground

### Database Migrations

Currently, tables are created automatically on server startup. For production, consider implementing proper database migrations.

## Troubleshooting

### Common Issues

1. **Connection refused**: Make sure MySQL is running
2. **Authentication failed**: Check your database credentials in `.env`
3. **JWT errors**: Ensure JWT_SECRET is set in `.env`
4. **GraphQL syntax errors**: Check your typeDefs for proper syntax

### Debug Mode

Add console.log statements in resolvers and services to debug issues:

```javascript
console.log("Debug info:", data);
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.