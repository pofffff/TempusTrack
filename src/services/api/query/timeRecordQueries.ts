import { gql } from '@apollo/client';

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

export const ACTIVITY_DATA = gql`
  query ActivityData($activityId: ID!) {
    # timeRecordCollection(activityId: $activityId) {
    #   timeRecords {
    #     id
    #     date
    #     amount
    #   }
    # }
    activity(activityId: $activityId) {
      id
      name
      startDate
      endDate
      timeRecords {
        id
        amount
        date
        createdAt
        activity {
          name
          id
        }
      }
    }
  }
`;
