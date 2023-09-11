const typeDefs = `
# Defining User and Level, which represent our data models.
type User {
    _id: ID!
    username: String!
    email: String!
    levels: [levelSchema] 
    goals: [Goal] 
    easyScore: Int!
    hardScore: Int!
  }
  
  type levelSchema {
    _id: ID!
    levelName: String!
    levelNumber: Int!
  }
 
  type Goal {
    _id: ID!
    name: String!
    completed: Boolean!
  }
  
  type Auth {
    token: ID!
    user: User
  }

# Query type is defining a single query getUser, allows us to retrieve a user by their userId.
  type Query {
    getUser(userId: ID!): User
    level: [String!]
    GetUserGoals(userId: ID!): [Goal] 
  }

# Query for user by username
  type Query {
    checkUsernameExists(username: String!): Boolean
  }
  
# Query for user by email
  type Query {
    checkEmailExists(email: String!): Boolean
  }
 
 
# Define mutation type for creating a new user
# Define delete progress mutation
# The mutation type defines 'updateUserProgress' mutation to update a user's progress.
  type Mutation {
    createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    updateUserProgress(userId: ID!, levelName: String!, levelNumber: Int!): User
    deleteUserProgress(userId: ID!, level: String!): User
    addGoalToUser(userId: ID!, goal: String!): User   # Add a mutation to add a goal
    updateGoalCompletion(userId: ID!, goalId: ID!, completed: Boolean!): User   # Add a mutation to update goal completion
    updateGoalName(userId: ID!, goalId: ID!, name: String!): User   # Add a mutation to update goal name
    deleteGoal(userId: ID!, goalId: ID!): User
    updateEasyScore(userId: ID!, easyScore: Int!): User
    updateHardScore(userId: ID!, hardScore: Int!): User
  }

# The schema definition specifies the entry points for queries and mutations.
  schema {
    query: Query
    mutation: Mutation
  }
  `;

module.exports = typeDefs;
