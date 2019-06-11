const { gql } = require('apollo-boost');

const userQuery = gql`
  {
    user {
      email
      id
    }
  }
`;

const loginQuery = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      email
      id
    }
  }
`;

const signupQuery = gql`
  mutation Signup($email: String!, $password: String!) {
    signUp(email: $email, password: $password) {
      email
      id
    }
  }
`;

export { userQuery, loginQuery, signupQuery };
