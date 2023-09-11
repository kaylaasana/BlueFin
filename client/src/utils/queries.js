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
