import { gql } from '@apollo/client'

export const CATEGORIES = gql`
  query Categories($userId: ID!) {
    categoryCollection(userId: $userId) {
      categories {
        name
        id
      }
    }
  }
`

export const CATEGORY_COLLECTION = gql`
  query CategoryCollection($userId: ID!) {
    categoryCollection(userId: $userId) {
      categories {
        name
        id
        activities {
          category {
            id
            name
          }
          name
          id
          startDate
          endDate
          totalTimeTraced
          timeRecords {
            id
            date
            amount
          }
        }
      }
    }
  }
`
