import { gql } from '@apollo/client';

// Getting the user's data to display
export const GET_USER_DATA = gql`
  query getUser {
    user {
      _id
      username
      email
      goals
      easyScore
      hardScore
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

// deleting a users goal by _id
export const DELETE_USER_GOALS = gql `
query DeleteGoal($userId: ID!, $goalId: ID!) {
  deleteUserGoal(userId: $userId, goalId: $goalId) {
    _id
    name
    completed
  }
}
`;

export const CHECK_USERNAME_EXISTS = gql`
  query CheckUsernameExists($username: String!) {
    checkUsernameExists(username: $username)
  }
`;

export const CHECK_EMAIL_EXISTS = gql`
  query CheckEmailExists($email: String!) {
    checkEmailExists(email: $email)
  }
`;

export const GET_USER_SCORES = gql`
  query getUser($userId: ID!) {
    getUser(userId: $userId) {
      easyScore
      hardScore
    }
  }
`;
