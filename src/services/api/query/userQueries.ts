import { gql } from '@apollo/client'

export const GET_USER = gql`
  query GetUser($userId: ID!) {
    user(userId: $userId) {
      userId
      email
      name
    }
  }
`

export const SIGN_IN_USER = gql`
  query LoginUser($input: UserLoginInput!) {
    loginUser(input: $input) {
      token
      userId
    }
  }
`
