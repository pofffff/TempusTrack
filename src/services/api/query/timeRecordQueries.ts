import { gql } from '@apollo/client'

// export const CATEGORIES = gql`
//   query TimeRecords($userId: ID!) {
//     categoryCollection(userId: $userId) {
//       categories {
//         title
//         id
//       }
//     }
//   }
// `

export const TIME_RECORD_COLLECTION = gql`
  query TimeRecordCollection($activityId: ID!) {
    timeRecordCollection(activityId: $activityId) {
      timeRecords {
        id
        date
        amount
      }
    }
  }
`
