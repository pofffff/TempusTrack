import { gql } from '@apollo/client'

export const SIGN_UP_USER = gql`
  mutation CreateUser($input: UserCreateInput!) {
    createUser(input: $input) {
      email
    }
  }
`
