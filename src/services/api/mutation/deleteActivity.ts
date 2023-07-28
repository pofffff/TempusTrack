import { gql } from '@apollo/client';

export const DELETE_ACTIVITIES = gql`
  mutation Mutation($input: ActivitiesDeleteInput!) {
    deleteActivities(input: $input) {
      id
    }
  }
`;
