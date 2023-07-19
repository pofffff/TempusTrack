import {
  CREATE_TIME_RECORD,
  DELETE_TIME_RECORDS,
  UPDATE_TIME_RECORD
} from '../services/api'

import { useMutation } from '@apollo/client'

export const useTimeRecord = () => {
  const [
    CreateTimeRecordMutation,
    {
      data: createTimeRecordData,
      loading: createTimeRecordLoading,
      error: createTimeRecordError
    }
  ] = useMutation(CREATE_TIME_RECORD)

  const [
    UpdateTimeRecordMutation,
    {
      data: updateTimeRecordData,
      loading: updateTimeRecordLoading,
      error: updateTimeRecordError
    }
  ] = useMutation(UPDATE_TIME_RECORD)

  const [
    DeleteTimeRecordsMutation,
    {
      data: deleteTimeRecordsData,
      loading: deleteTimeRecordsLoading,
      error: deleteTimeRecordsError
    }
  ] = useMutation(DELETE_TIME_RECORDS)

  return {
    CreateTimeRecordMutation,
    createTimeRecordData,
    createTimeRecordLoading,
    createTimeRecordError,
    UpdateTimeRecordMutation,
    updateTimeRecordData,
    updateTimeRecordLoading,
    updateTimeRecordError,
    DeleteTimeRecordsMutation,
    deleteTimeRecordsData,
    deleteTimeRecordsLoading,
    deleteTimeRecordsError
  }
}
