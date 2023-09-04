const typeDefs = `
// Defining User and Level, which represent our data models.
type User {
    _id: ID!
    username: String!
    email: String!
    levels: [Level] 
  }
  
  type Level {
    _id: ID!
    levelName: String!
    levelNumber: Int!
  }

// Query type is defining a single query getUser, allows us to retrieve a user by their userId.
  type Query {
    getUser(userId: ID!): User
  }
 
// Define mutation type for creating a new user
  type Mutation {
    createUser(username: String!, email: String!, password: String!): User
  }

// Define delete progress mutation
  type Mutation {
    deleteUserProgress(userId: ID!, level: [levelSchema]): User
  }

// The mutation type defines 'updateUserProgress' mutation to update a user's progress.
  type Mutation {
    updateUserProgress(userId: ID!, levelName: String!, levelNumber: Int!): User
  }
  
// The schema definition specifies the entry points for queries and mutations.
  schema {
    query: Query
    mutation: Mutation
  }
  `;
