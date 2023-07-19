import { gql } from '@apollo/client'

export const CREATE_TIME_RECORD = gql`
  mutation CreateTimeRecord($userId: ID!, $input: TimeRecordCreateInput!) {
    createTimeRecord(userId: $userId, input: $input) {
      id
      amount
      createdAt
      updatedAt
      activity {
        id
      }
    }
  }
`
