import { gql } from '@apollo/client'

export const CREATE_CATEGORY = gql`
  mutation CreateCategory($userId: ID!, $input: CategoryCreateInput!) {
    createCategory(userId: $userId, input: $input) {
      id
      name
      owner {
        id
        name
      }
    }
  }
`
