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

export const UPDATE_EASY_SCORE = gql`
  mutation updateEasyScore($userId: ID!, $easyScore: Int!) {
    updateEasyScore(userId: $userId, easyScore: $easyScore) {
      easyScore
      hardScore
      username
    }
  }
`;

export const UPDATE_HARD_SCORE = gql`
  mutation updateHardScore($userId: ID!, $hardScore: Int!) {
    updateHardScore(userId: $userId, hardScore: $hardScore) {
      hardScore
      easyScore
      username
    }
  }
`;
