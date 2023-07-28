import { gql } from '@apollo/client';

export const UPDATE_ACTIVITY = gql`
  mutation UpdateActivity($activityId: ID!, $input: ActivityUpdateInput!) {
    updateActivity(activityId: $activityId, input: $input) {
      category {
        id
        name
      }
      createdAt
      endDate
      id
      name
      startDate
      updatedAt
    }
  }
`;
