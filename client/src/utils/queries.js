import { gql } from '@apollo/client';

// Getting the user's data to display 
export const GET_USER_DATA = gql`
  query GetUser {
    user {
      _id
      username
      email
      goals
    }
  }
`;

// Getting the user's goals
export const GET_USER_GOALS = gql`
query GetUserGoals($userId: ID!) {
  GetUserGoals(userId: $userId) {
    _id
    name
    completed
  }
}
`;

// Mutation to update a specific goal's completion status
export const UPDATE_GOAL_COMPLETION = gql`
  mutation UpdateGoalCompletion($userId: ID!, $goalId: ID!, $completed: Boolean!) {
    updateGoalCompletion(userId: $userId, goalId: $goalId, completed: $completed) {
      _id
      goals {
        _id
        name
        completed
      }
    }
  }
`;

// Mutation to update user's goals and objectives
export const UPDATE_USER_GOALS = gql`
  mutation UpdateUserGoals($goals: [GoalInput]!) {
    updateGoals(goals: $goals) {
      _id
      goals {
        _id
        name
        completed
      }
    }
  }
`;

// Mutation to add a new goal to a user
export const ADD_GOAL_TO_USER = gql`
  mutation AddGoalToUser($userId: ID!, $goal: GoalInput!) {
    addGoalToUser(userId: $userId, goal: $goal) {
      _id
      goals {
        _id
        name
        completed
      }
    }
  }
`;
