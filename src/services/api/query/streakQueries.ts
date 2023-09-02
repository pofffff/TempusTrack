import { gql } from '@apollo/client';

export const STREAK_COLLECTION = gql`
  query Streaks($userId: ID!) {
    streakCollection(userId: $userId) {
      streak {
        name
        count
        id
      }
    }
  }
`;
