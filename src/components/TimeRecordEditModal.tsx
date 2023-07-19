import { ACTIVITY_COLLECTION, TIME_RECORD_COLLECTION } from '../services/api'
import {
  Activity,
  ActivityCollectionResult,
  QueryActivityCollectionArgs,
  TimeRecord,
  UpdateTimeRecordInput
} from '../types'
import {
  Headline,
  InputDate,
  InputNumber,
  InputSelect,
  TextButton
} from './_elements'
import { StyleSheet, View } from 'react-native'
import { colors, font, fontSize, spacing } from '../variables'

import { FormLayout } from '.'
import { useAuth } from '../context'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useLazyQuery } from '@apollo/client'
import { useTimeRecord } from '../hooks'

interface TimeRecordEditModalProps {
  timeRecord: TimeRecord
  setModalVisible: (value: boolean) => void
}
export const TimeRecordEditModal: React.FC<TimeRecordEditModalProps> = ({
  timeRecord,
  setModalVisible
}) => {
  const { userId } = useAuth()

  const [
    getActivities,
    { data: activityData, loading: _activityLoading, error: _activityError }
  ] = useLazyQuery<ActivityCollectionResult, QueryActivityCollectionArgs>(
    ACTIVITY_COLLECTION
  )
  const {
    UpdateTimeRecordMutation,
    updateTimeRecordData,
    updateTimeRecordError,
    DeleteTimeRecordsMutation,
    deleteTimeRecordsData,
    deleteTimeRecordsError
  } = useTimeRecord()

  useEffect(() => {
    if (userId) {
      getActivities({ variables: { userId } })
    }
  }, [userId])

  const {
    control,
    getFieldState,
    handleSubmit,
    formState: {}
  } = useForm<UpdateTimeRecordInput>({
    defaultValues: {
      activityId: timeRecord.activity.id,
      amount: timeRecord.amount,
      date: timeRecord.date
    },
    mode: 'onChange'
  })

  const onSubmit = async (data: UpdateTimeRecordInput) => {
    const { date, activityId, amount } = data

    UpdateTimeRecordMutation({
      variables: {
        timeRecordId: timeRecord.id,
        input: { date, activityId, amount }
      },
      refetchQueries: [
        {
          query: TIME_RECORD_COLLECTION,
          variables: { activityId: timeRecord.activity.id }
        }
      ]
    })
  }

  const handleDelete = () => {
    const timeReordIds = [timeRecord.id]
    DeleteTimeRecordsMutation({
      variables: { input: timeReordIds },
      refetchQueries: [
        {
          query: TIME_RECORD_COLLECTION,
          variables: { activityId: timeRecord.activity.id }
        }
      ]
    })
    setModalVisible(false)
  }

  return (
    <View style={styles.timeRecordEditModal}>
      <FormLayout>
        <Headline text={'Edit time record'} type={'$m'} />
        <InputSelect
          label={'Activity'}
          name={'activitId'}
          control={control}
          getFieldState={getFieldState}
          items={activityData?.ActivityCollection.activities as Activity[]}
        />
        <InputNumber
          label={'Amount'}
          name={'amount'}
          control={control}
          getFieldState={getFieldState}
          rules={undefined}
        />
        <InputDate
          name={'date'}
          control={control}
          getFieldState={getFieldState}
          label={'Date'}
          rules={undefined}
        />
      </FormLayout>
      <View style={styles.timeRecordActions}>
        <TextButton text={'Save'} onPress={handleSubmit(onSubmit)} />
        <TextButton text={'Delete'} onPress={() => handleDelete()} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  timeRecordEditModal: {
    flexDirection: 'column'
  },
  timeRecordActions: {
    flexDirection: 'row'
  },
  timeRecordText: {
    fontSize: fontSize.$s,
    fontFamily: font.$primary__regular,
    color: colors.$light,
    paddingHorizontal: spacing.$xs,
    textAlignVertical: 'center',
    height: 46
  }
})
