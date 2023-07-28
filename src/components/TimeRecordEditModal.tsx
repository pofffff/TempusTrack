import { ACTIVITY_COLLECTION, ACTIVITY_DATA } from '../services/api';
import {
  Activity,
  ActivityCollectionResult,
  QueryActivityCollectionArgs,
  TimeRecord,
  UpdateTimeRecordInput,
} from '../types';
import { DeleteModal, FormLayout } from './_common/';
import {
  Headline,
  IconButton,
  InputDate,
  InputNumber,
  InputSelect,
  InputTime,
  TextButton,
} from './_elements';
import { SetStateAction, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { colors, font, fontSize, spacing } from '../settings';
import { useLazyQuery, useQuery } from '@apollo/client';

import { Icon } from './_elements';
import { getDateTime } from '../utils';
import { useAuth } from '../context';
import { useForm } from 'react-hook-form';
import { useTimeRecord } from '../hooks';

interface TimeRecordEditModalProps {
  timeRecord: TimeRecord;
  setModalVisible: (value: boolean) => void;
}
export const TimeRecordEditModal: React.FC<TimeRecordEditModalProps> = ({
  timeRecord,
  setModalVisible,
}) => {
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
  // const { userId } = useAuth();

  // const [
  //   getActivities,
  //   { data: activityData, loading: _activityLoading, error: activityError },
  // ] = useLazyQuery<ActivityCollectionResult, QueryActivityCollectionArgs>(
  //   ACTIVITY_COLLECTION,
  // );

  const { userId } = useAuth();
  const { data: activityData, error: activityError } =
    useQuery<ActivityCollectionResult>(ACTIVITY_COLLECTION, {
      variables: { userId },
    });

  const {
    UpdateTimeRecordMutation,
    updateTimeRecordData,
    updateTimeRecordError,
    DeleteTimeRecordsMutation,
    deleteTimeRecordsData,
    deleteTimeRecordsError,
  } = useTimeRecord();

  // useEffect(() => {
  //   if (userId) {
  //     getActivities({ variables: { userId } });
  //   }
  // }, [userId]);
  const {
    control,
    getFieldState,
    handleSubmit,
    formState: {},
  } = useForm<UpdateTimeRecordInput>({
    defaultValues: {
      activityId: timeRecord.activity.id,
      amount: timeRecord.amount,
      date: new Date(timeRecord.date),
      startTime: new Date(timeRecord.date),
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: UpdateTimeRecordInput) => {
    const { activityId, amount, date, startTime } = data;
    const dateTime = getDateTime(date!, startTime!);

    UpdateTimeRecordMutation({
      variables: {
        timeRecordId: timeRecord.id,
        input: { activityId, amount, date: dateTime },
      },
      refetchQueries: [
        {
          query: ACTIVITY_DATA,
          variables: { activityId: timeRecord.activity.id },
        },
      ],
    });
  };

  const handleDelete = () => {
    const timeReordIds = [timeRecord.id];
    DeleteTimeRecordsMutation({
      variables: { input: timeReordIds },
      refetchQueries: [
        {
          query: ACTIVITY_DATA,
          variables: { activityId: timeRecord.activity.id },
        },
      ],
    });
    setModalVisible(false);
  };

  const handleCloseClick = () => {
    setModalVisible(false);
  };

  const handleDeleteClick = () => {
    setDeleteModalVisible(true);
  };

  return (
    <View style={styles.timeRecordEditModal}>
      <View style={styles.timeRecordEditHeader}>
        <Headline text={'Edit time record'} type={'$m'} />
        <IconButton onPress={handleCloseClick}>
          <Icon name={'close'} size={32} />
        </IconButton>
      </View>
      <FormLayout>
        {activityData?.ActivityCollection?.activities && (
          <InputSelect
            label={'Activity'}
            name={'activitId'}
            control={control}
            getFieldState={getFieldState}
            items={activityData.ActivityCollection.activities as Activity[]}
          />
        )}
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
        <InputTime
          name={'startTime'}
          control={control}
          getFieldState={getFieldState}
          label={'Time'}
        />
      </FormLayout>
      <View style={styles.timeRecordActions}>
        <TextButton text={'Save'} primary onPress={handleSubmit(onSubmit)} />
        <TextButton text={'Delete'} onPress={() => handleDeleteClick()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  timeRecordEditModal: {
    flexDirection: 'column',
    padding: spacing.$m,
    backgroundColor: colors.$plainWhite,
    height: '100%',
  },
  timeRecordEditHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeRecordActions: {},
  timeRecordText: {
    fontSize: fontSize.$s,
    fontFamily: font.$primary__regular,
    color: colors.$light,
    paddingHorizontal: spacing.$xs,
    textAlignVertical: 'center',
    height: 46,
  },
});
