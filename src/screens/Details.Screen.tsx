import {
  ActivityDataResult,
  DeleteItemParams,
  DetailsScreenNavigationProp,
  TimeRecord,
} from '../types';
import {
  DeleteModal,
  ScreenLayout,
  TextButton,
  TimeRecordListItem,
} from '../components';
import { StyleSheet, View } from 'react-native';
import { useContext, useState } from 'react';

import { ACTIVITY_DATA } from '../services/api';
import { EditActivity } from '../components/EditActivity';
import { NavigationContext } from '@react-navigation/native';
import { nullFilter } from '../utils';
import { useActivity } from '../hooks';
import { useQuery } from '@apollo/client';

interface DetailsScreenProps extends DetailsScreenNavigationProp {}

export const DetailsScreen: React.FC<DetailsScreenProps> = ({ route }) => {
  const navigation = useContext(NavigationContext);
  const { DeleteActivityMutation } = useActivity();
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);

  const { data, error } = useQuery<ActivityDataResult>(ACTIVITY_DATA, {
    variables: { activityId: route.params.activityId },
  });

  const activity = data?.activity;
  if (!activity) return;

  const handleDelete = ({ cascade }: DeleteItemParams) => {
    const input = { activityIds: [route.params.activityId], cascade };
    DeleteActivityMutation({
      variables: { input },
      refetchQueries: [
        {
          query: ACTIVITY_DATA,
          variables: { activityId: route.params.activityId },
        },
      ],
    });
    setDeleteModalVisible(false);
    navigation?.navigate('Activities');
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

  const onDeleteClick = () => {
    setDeleteModalVisible(true);
  };

  return (
    <ScreenLayout>
      {/* <View style={styles.container}> */}
      <View style={styles.timeRecordList}>{timeRecords()}</View>
      <View style={styles.activityActions}>
        <TextButton fullWidth text={'Edit'} onPress={() => onEditClick()} />
        {/* <Modal
          transparent
          visible={editModalVisible}
          onRequestClose={() => {
            setDeleteModalVisible(false);
          }}>
          <RegularText style={undefined} text={'Edit activity'} />
          <InputText/>
        </Modal> */}

        <TextButton
          fullWidth
          text={'Delete activity'}
          onPress={onDeleteClick}
        />
      </View>
      <DeleteModal
        visible={deleteModalVisible}
        setDeleteModalVisible={setDeleteModalVisible}
        handleDelete={handleDelete}
        name={data?.activity?.name}
        allReferencesOnly
      />
      <EditActivity
        activity={activity}
        visible={editModalVisible}
        setModalVisible={setEditModalVisible}
      />
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
    gap: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
