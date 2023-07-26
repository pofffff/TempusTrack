import { gql } from '@apollo/client';

export const ACTIVITY_COLLECTION = gql`
  query ActivityCollection($userId: ID!) {
    activityCollection(userId: $userId) {
      activities {
        id
        name
        category {
          id
          name
        }
      }
    }
  }
`;
