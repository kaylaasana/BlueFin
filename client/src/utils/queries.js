// utils/queries.js
import { gql } from "@apollo/client";

export const GET_USER_DATA = gql`
  query GetUser {
    user {
      id
      username
      email
      easyScore
      hardScore
    }
  }
`;

export const CHECK_USERNAME_EXISTS = gql`
  query CheckUsernameExists($username: String!) {
    checkUsernameExists(username: $username)
  }
`;

export const CHECK_EMAIL_EXISTS = gql `
  query CheckEmailExists($email: String!) {
    checkEmailExists(email: $email)
  }
`;
