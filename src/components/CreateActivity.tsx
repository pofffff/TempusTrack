import {
  CATEGORIES,
  CATEGORY_COLLECTION,
  CREATE_ACTIVITY,
} from '../services/api';
import {
  Category,
  CategoryCollectionResult,
  CreateActivityInput,
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
import { USER_ID_KEY, colors, spacing } from '../settings';
import { useEffect, useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';

import { getDateTime } from '../utils';
import { useAuth } from '../context';
import { useForm } from 'react-hook-form';
import { useSecureStore } from '../hooks';

export const CreateActivity: React.FC = () => {
  const { getValue } = useSecureStore();
  const { userId } = useAuth();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [CreateActivityMutation, { data, error }] =
    useMutation(CREATE_ACTIVITY);
  const [
    getCategories,
    { data: categoryData, loading: _categoryLoading, error: _categoryError },
  ] = useLazyQuery<CategoryCollectionResult, QueryCategoryCollectionArgs>(
    CATEGORIES,
  );

  const { control, getFieldState, getValues, setValue, handleSubmit } =
    useForm<CreateActivityInput>({
      defaultValues: {
        name: '',
        startDate: undefined,
        startTime: undefined,
        categoryId: '',
      },
      mode: 'onChange',
    });

  const onSubmit = async (idata: CreateActivityInput) => {
    const { name, categoryId, startDate, startTime } = idata;
    if (!name || !categoryId) return;

    const dateTime = getDateTime(startDate!, startTime!);

    CreateActivityMutation({
      variables: {
        userId: await getValue(USER_ID_KEY),
        input: {
          name,
          categoryId,
          startDate: dateTime || new Date(),
        },
      },
      refetchQueries: [
        {
          query: CATEGORY_COLLECTION,
          variables: { userId: userId },
        },
      ],
      // TODO Refactor refetch whole collection everytime
      // update(cache, { data }) {
      //     console.log(cache)
      //     console.log(data.createChore)
      //     if (!data) {
      //         return
      //     }

      //     cache.modify({
      //         id: cache.identify(makeReference('ROOT_QUERY')),
      //         fields: {
      //             categoryCollection: (previous, { toReference }) => {
      //                 const cat = previous.find(())
      //                 return [...previous, data.createChore]
      //             }
      //         }
      //     })
      // }
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

  useEffect(() => {
    if (data) {
      setModalVisible(false);
    }
  }, [data, error]);

  return !categoryData?.categoryCollection ? null : (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <ScreenLayout>
          <View style={styles.closeIconWrapper}>
            <IconButton
              style={styles.closeIcon}
              onPress={() => setModalVisible(false)}>
              <Icon name={'close'} size={36} />
            </IconButton>
          </View>
          <FormLayout>
            <Headline text={'Create activity'} type={'$m'} />
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
              text={'Create'}
              onPress={handleSubmit(onSubmit)}
              primary
            />
          </FormLayout>
        </ScreenLayout>
      </Modal>
      <TextButton text={'+ Activity'} onPress={() => setModalVisible(true)} />
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
