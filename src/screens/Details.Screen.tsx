import {
  ActivityDataResult,
  DetailsScreenNavigationProp,
  TimeRecord,
} from '../types';
import {
  Headline,
  ScreenLayout,
  TextButton,
  TimeRecordListItem,
} from '../components';
import { StyleSheet, View } from 'react-native';

import { ACTIVITY_DATA } from '../services/api';
import { nullFilter } from '../utils';
import { useQuery } from '@apollo/client';
import { useState } from 'react';

interface DetailsScreenProps extends DetailsScreenNavigationProp {}

export const DetailsScreen: React.FC<DetailsScreenProps> = ({ route }) => {
  // const { userId } = useAuth();
  const [_deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
  const [_editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const { data, error } = useQuery<ActivityDataResult>(ACTIVITY_DATA, {
    variables: { activityId: route.params.activityId },
  });

  const onDeleteClick = () => {
    //  const timeReordIds = [timeRecord.id]
    //  DeleteTimeRecordsMutation({
    //    variables: { input: timeReordIds },
    //    refetchQueries: [
    //      {
    //        query: TIME_RECORD_COLLECTION,
    //        variables: { activityId: timeRecord.activity.id }
    //      }
    //    ]
    //  })
    setDeleteModalVisible(true);
  };

  const onEditClick = () => {
    setEditModalVisible(true);
  };

  const timeRecords = () => {
    if (data?.activity?.timeRecords) {
      return data.activity.timeRecords
        .filter(nullFilter)
        .map((timeRecord: TimeRecord) => {
          return (
            <TimeRecordListItem
              timeRecord={timeRecord}
              key={`TimeRecord-${timeRecord.id}`}
            />
          );
        });
    }
  };

  return (
    <ScreenLayout>
      {/* <View style={styles.container}> */}
      <Headline type={'$m'} text={data?.activity.name || 'Activity'} />
      <View style={styles.timeRecordList}>{timeRecords()}</View>
      <View style={styles.activityActions}>
        <TextButton text={'Edit'} onPress={() => onEditClick()} />
        <TextButton text={'Delete activity'} onPress={() => onDeleteClick()} />
      </View>
      {/* </View> */}
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  actionsWrapper: {
    flex: 1,
    justifyContent: 'center',
    //alignItems: 'center',
    flexDirection: 'row',
    bottom: 0,
  },
  timeRecordList: {
    flex: 1,
    height: 'auto',
  },
  activityActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
