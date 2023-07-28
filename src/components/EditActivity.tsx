import { ACTIVITY_DATA, CATEGORIES, UPDATE_ACTIVITY } from '../services/api';
import {
  Activity,
  Category,
  CategoryCollectionResult,
  EditActivityInput,
  QueryCategoryCollectionArgs,
} from '../types';
import { FormLayout, ScreenLayout } from './_common';
import {
  Headline,
  Icon,
  IconButton,
  InputDate,
  InputSelect,
  InputText,
  InputTime,
  TextButton,
} from './_elements';
import { Modal, StyleSheet, View } from 'react-native';
import { colors, spacing } from '../settings';
import { useLazyQuery, useMutation } from '@apollo/client';

import { getDateTime } from '../utils';
import { useAuth } from '../context';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface EditActivityProps {
  activity: Activity;
  visible: boolean;
  setModalVisible?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const EditActivity: React.FC<EditActivityProps> = ({
  activity,
  visible,
  setModalVisible,
}) => {
  const { userId } = useAuth();
  const [
    getCategories,
    { data: categoryData, loading: _categoryLoading, error: _categoryError },
  ] = useLazyQuery<CategoryCollectionResult, QueryCategoryCollectionArgs>(
    CATEGORIES,
  );
  const [UpdateActivityMutation, { data: updateData, error: updateError }] =
    useMutation(UPDATE_ACTIVITY);

  const { control, getFieldState, getValues, setValue, handleSubmit } =
    useForm<EditActivityInput>({
      defaultValues: {
        name: activity.name,
        startDate: new Date(activity.startDate),
        startTime: new Date(activity.startDate),
        categoryId: undefined,
      },
      mode: 'onChange',
    });

  useEffect(() => {
    if (activity.category?.id) {
      setValue('categoryId', activity.category.id);
    }
  }, []);

  const onSubmit = async (idata: EditActivityInput) => {
    const { name, categoryId, startDate, startTime } = idata;
    if (!name || !categoryId) return;

    const dateTime = getDateTime(startDate!, startTime!);

    UpdateActivityMutation({
      variables: {
        activityId: activity.id,
        input: {
          name,
          categoryId,
          startDate: dateTime || new Date(),
        },
      },
      refetchQueries: [
        {
          query: ACTIVITY_DATA,
          variables: { activityId: activity.id },
        },
      ],
    });
  };
  useEffect(() => {
    // TODO Should be possible to use useQuery instead of lazy
    if (userId) {
      getCategories({
        variables: { userId },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return !categoryData?.categoryCollection ? null : (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={visible}
        onRequestClose={() => setModalVisible?.(false)}>
        <ScreenLayout>
          <View style={styles.closeIconWrapper}>
            <IconButton
              style={styles.closeIcon}
              onPress={() => setModalVisible?.(false)}>
              <Icon name={'close'} size={36} />
            </IconButton>
          </View>
          <FormLayout>
            <Headline text={'Edit activity'} type={'$m'} />
            <InputText
              label={'Name'}
              name={'name'}
              control={control}
              getFieldState={getFieldState}
              rules={{
                required: true,
              }}
              keyboardType={undefined}
            />
            <InputSelect
              label={'Category'}
              name={'categoryId'}
              control={control}
              getFieldState={getFieldState}
              items={categoryData.categoryCollection.categories as Category[]}
            />
            <InputDate
              name={'startDate'}
              control={control}
              getFieldState={getFieldState}
              label={'Start date'}
              rules={undefined}
            />
            <InputTime
              name={'startTime'}
              control={control}
              getFieldState={getFieldState}
              label={'Start time'}
            />
            <TextButton
              text={'Edit'}
              onPress={handleSubmit(onSubmit)}
              primary
            />
          </FormLayout>
        </ScreenLayout>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { margin: spacing.$xs, flex: 1, justifyContent: 'flex-end' },
  form: {
    backgroundColor: colors.$plainWhite,
    padding: spacing.$xl,
    flex: 1,
    flexDirection: 'column',
  },
  closeIconWrapper: {
    margin: spacing.$xs,
  },
  closeIcon: {
    alignSelf: 'flex-end',
  },
});
