import { Activity, Category, CreateTimeRecordInput } from '../types';
import { Icon, IconButton, RegularText } from './_elements';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { USER_ID_KEY, colors, font, fontSize, spacing } from '../settings';
import { memo, useContext, useEffect, useState } from 'react';
import { useSecureStore, useTimeRecord } from '../hooks';

import { ActivityListItem } from './ActivityListItem';
import { ActivityModal } from './ActivityModal';
import { CATEGORY_COLLECTION } from '../services/api';
import { NavigationContext } from '@react-navigation/native';
import { nullFilter } from '../utils';
import { useAuth } from '../context';
import { useForm } from 'react-hook-form';

interface CategoryListItemProps {
  category: Category;
}

export const CategoryListItem: React.FC<CategoryListItemProps> = memo(
  ({ category }) => {
    const navigation = useContext(NavigationContext);
    const { getValue } = useSecureStore();
    const { userId } = useAuth();
    const [categoryVisible, setCategoryVisible] = useState<boolean>(false);
    const [activityId, setActivityId] = useState<string | null>();
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [editModalVisible, setEditModalVisible] = useState<boolean>(false);

    const {
      CreateTimeRecordMutation,
      createTimeRecordData,
      createTimeRecordError,
    } = useTimeRecord();

    const {
      control,
      getFieldState,
      handleSubmit,
      formState: {},
    } = useForm<CreateTimeRecordInput>({
      defaultValues: {
        amount: undefined,
        date: new Date(),
        activityId: '',
      },
      mode: 'onChange',
    });

    const onSubmit = async (data: CreateTimeRecordInput) => {
      const { amount, date: iDate } = data;
      if (!amount || !activityId) return;
      // TODO create date in BE instead when done
      const date = iDate ?? new Date();

      CreateTimeRecordMutation({
        variables: {
          userId: await getValue(USER_ID_KEY),
          input: { activityId, amount: Number(amount), date },
        },
        refetchQueries: [
          {
            query: CATEGORY_COLLECTION,
            variables: { userId },
          },
        ],
      });
    };

    useEffect(() => {
      if (createTimeRecordData) {
        setModalVisible(false);
      }

      // TODO fix error handling
      if (createTimeRecordError) {
        console.error(createTimeRecordError);
      }
    }, [createTimeRecordData, createTimeRecordError]);

    const handleAddTimeClick = (activityId: string) => {
      setActivityId(activityId);
      setModalVisible(true);
    };
    const handleActivityClick = (activityId: string) => {
      navigation?.navigate('Activity details', { activityId });
    };

    const handleEditClick = () => {
      setEditModalVisible(true);
    };

    return (
      category && (
        <View>
          <TouchableOpacity
            onPress={() => setCategoryVisible(!categoryVisible)}>
            <View style={styles.categoryListItem}>
              <RegularText text={category.name} style={styles.categoryName} />
            </View>
            {categoryVisible &&
              category.activities &&
              category.activities
                .filter(nullFilter)
                .map((activity: Activity) => (
                  <>
                    <ActivityModal
                      modalVisible={modalVisible}
                      setModalVisible={setModalVisible}
                      control={control}
                      getFieldState={getFieldState}
                      handleSubmit={handleSubmit}
                      onSubmit={onSubmit}
                    />
                    <ActivityListItem
                      activity={activity}
                      activityId={activityId}
                      handleActivityClick={handleActivityClick}
                      handleAddTimeClick={handleAddTimeClick}
                    />
                  </>
                ))}
          </TouchableOpacity>
        </View>
      )
    );
  },
);

const styles = StyleSheet.create({
  categoryListItem: {
    backgroundColor: colors.$black,
    borderBottomColor: colors.$light,
    borderBottomWidth: 1,
    color: colors.$light,
    height: 46,
    // flex: 1,
    // justifyContent: 'space-between',
  },
  categoryName: {
    fontSize: fontSize.$s,
    fontFamily: font.$primary__regular,
    color: colors.$light,
    paddingHorizontal: spacing.$xs,
    textAlignVertical: 'center',
    height: 46,
  },
  activityListItem: {
    borderColor: colors.$black,
    borderWidth: 1,
    // flex: 1,
    height: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.$xs,
  },
  activityActive: {
    backgroundColor: colors.$grey,
  },
  activityName: {
    fontSize: fontSize.$s,
    fontFamily: font.$primary__regular,
    color: colors.$black,
    padding: spacing.$xs,
  },
  activityDetails: {
    // flex: 1
    height: 50,
  },
  closeIconWrapper: {
    margin: spacing.$xs,
  },
  closeIcon: {
    alignSelf: 'flex-end',
  },
});
