import { gql } from '@apollo/client'

export const CREATE_ACTIVITY = gql`
  mutation CreateActivity($userId: ID!, $input: ActivityCreateInput!) {
    createActivity(userId: $userId, input: $input) {
      id
      name
      startDate
      category {
        id
      }
    }
  }
`
