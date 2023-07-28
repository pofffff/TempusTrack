import { DELETE_ACTIVITIES } from '../services/api';
import { useMutation } from '@apollo/client';

export const useActivity = () => {
  const [
    DeleteActivityMutation,
    {
      data: deleteActivityData,
      loading: deleteActivityLoading,
      error: deleteActivityError,
    },
  ] = useMutation(DELETE_ACTIVITIES);

  return {
    DeleteActivityMutation,
    deleteActivityData,
    deleteActivityLoading,
    deleteActivityError,
  };
};
