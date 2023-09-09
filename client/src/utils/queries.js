// utils/queries.js
import { gql } from '@apollo/client';

export const GET_USER_DATA = gql`
  query GetUser {
    user {
      id
      username
      email
    }
  }
`;
