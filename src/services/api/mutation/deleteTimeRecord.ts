import { gql } from '@apollo/client'

export const DELETE_TIME_RECORDS = gql`
  mutation DeleteTimeRecords($input: TimeRecordDeleteInput!) {
    deleteTimeRecords(input: $input) {
      id
    }
  }
`
