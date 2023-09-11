import { gql } from '@apollo/client';

// login mutation
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

// sign up mutation
export const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_GOAL_TO_USER = gql ` 
mutation addGoalToUser($userId: ID!, $goal: String!) {
  addGoalToUser(userId: $userId, goal: $goal) {
    goals {
      _id
      name
      completed
    }
  }
}
`;
