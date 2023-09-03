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
    progress: Int!
  }

// Query type is defining a single query getUser, allows us to retrieve a user by their userId.
  type Query {
    getUser(userId: ID!): User
  }

// THe mutaation type defines 'updateUserProgress' mutation to update a user's progress.
  type Mutation {
    updateUserProgress(userId: ID!, levelName: String!, progress: Int!): User
  }
  
// The schema definition specifies the entry points for queries and mutations.
  schema {
    query: Query
    mutation: Mutation
  }
  `;
  