const typeDefs = `
# Defining User and Level, which represent our data models.
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
  
  type Auth {
    token: ID!
    user: User
  }

# Query type is defining a single query getUser, allows us to retrieve a user by their userId.
  type Query {
    getUser(userId: ID!): User
    level: [String!]
  }
 
# Define mutation type for creating a new user
# Define delete progress mutation
# The mutation type defines 'updateUserProgress' mutation to update a user's progress.
  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    updateUserProgress(userId: ID!, levelName: String!, levelNumber: Int!): User
    deleteUserProgress(userId: ID!, level: String!): User
  }

  
# The schema definition specifies the entry points for queries and mutations.
  schema {
    query: Query
    mutation: Mutation
  }
  `;

  module.exports = typeDefs
