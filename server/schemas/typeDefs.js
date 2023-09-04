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

type Query {
  getUser(userId: ID!): User
}

type Mutation {
  createUser(username: String!, email: String!, password: String!): User
  updateUserProgress(userId: ID!, levelName: String!, levelNumber: Int!): User
  deleteUserProgress(userId: ID!): User
}

schema {
  query: Query
  mutation: Mutation
}
`;
  module.exports = typeDefs
