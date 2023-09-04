const typeDefs = `
// Defining User and Level, which represent our data models.
type User {
  _id: ID!
  username: String!
  email: String!
  levels: [levelSchema] 
}

type levelSchema {
  _id: ID!
  levelName: String!
  levelNumber: Int!
}

// Query type is defining a single query getUser, allows us to retrieve a user by their userId.
type Query {
  getUser(userId: ID!): User
}

// Define mutation type for creating a new user
// Define delete progress mutation
// The mutation type defines 'updateUserProgress' mutation to update a user's progress.
type Mutation {
  createUser(username: String!, email: String!, password: String!): User
  updateUserProgress(userId: ID!, levelName: String!, levelNumber: Int!): User
  deleteUserProgress(userId: ID!): User
}

// The schema definition specifies the entry points for queries and mutations.
schema {
  query: Query
  mutation: Mutation
}
`;
  module.exports = typeDefs
