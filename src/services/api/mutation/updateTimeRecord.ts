import { gql } from '@apollo/client'

export const UPDATE_TIME_RECORD = gql`
  mutation UpdateTimeRecord(
    $timeRecordId: ID!
    $input: TimeRecordUpdateInput!
  ) {
    updateTimeRecord(timeRecordId: $timeRecordId, input: $input) {
      id
      amount
      date
    }
  }
`
