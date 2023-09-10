// utils/queries.js
import { gql } from '@apollo/client';

// getting the users data to display 
export const GET_USER_DATA = gql`
  query GetUser {
    user {
      id
      username
      email
    }
  }
`;

// getting the users goals
export const GET_USER_GOALS = gql`
  query GetUserGoals {
    user {
      id
      goals {
        id
        name
        completed
      }
    }
  }
`;

// Corrected mutation to update a specific goal's completion status
export const UPDATE_GOAL_COMPLETION = gql`
  mutation UpdateGoalCompletion($userId: ID!, $goalId: ID!, $completed: Boolean!) {
    updateGoalCompletion(userId: $userId, goalId: $goalId, completed: $completed) {
      id
      goals {
        id
        name
        completed
      }
    }
  }
`;

// getting the users specific goals and objectives 
export const UPDATE_USER_GOALS = gql`
  mutation UpdateUserGoals($goals: [GoalInput]!) {
    updateGoals(goals: $goals) {
      id
      goals {
        id
        name
        completed
      }
    }
  }
`;