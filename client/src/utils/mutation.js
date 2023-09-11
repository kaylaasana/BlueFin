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

export const UPDATE_USER_GOALS = gql `
mutation updateGoalName($userId: ID!, $goalId: ID!, $name: String!) {
  updateGoalName(userId: $userId, goalId: $goalId, name: $name) {
    _id
    username
    email
    goals {
      _id
      name
      completed
    }
  }
}
`;

export const  UPDATE_GOAL_COMPLETION = gql `
mutation updateGoalCompletion($userId: ID!, $goalId: ID!, $completed: Boolean!) {
  updateGoalCompletion(userId: $userId, goalId: $goalId, completed: $completed) {
    _id
    username
    email
    goals {
      _id
      name
      completed
    }
  }
}
`