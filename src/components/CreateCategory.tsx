import { FormLayout, ScreenLayout } from './_common';
import { Headline, Icon, IconButton, InputText, TextButton } from './_elements';
import { Modal, StyleSheet, View } from 'react-native';
import { USER_ID_KEY, colors, spacing } from '../settings';
import { useCategory, useSecureStore } from '../hooks';
import { useEffect, useState } from 'react';

import { CATEGORY_COLLECTION } from '../services/api';
import { CreateCategoryInput } from '../types';
import { useAuth } from '../context';
import { useForm } from 'react-hook-form';

export const CreateCategory: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { getValue } = useSecureStore();
  const { userId } = useAuth();
  const { CreateCategoryMutation, createCategoryData, createCategoryError } =
    useCategory();

  const {
    control,
    getFieldState,
    handleSubmit,
    formState: {},
  } = useForm<CreateCategoryInput>({
    defaultValues: {
      name: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: CreateCategoryInput) => {
    const { name } = data;
    if (!name) return;

    CreateCategoryMutation({
      variables: {
        userId: await getValue(USER_ID_KEY),
        input: { name },
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
    if (createCategoryData) {
      setModalVisible(false);
    }
    if (createCategoryError) {
      // TODO Error component stuff
      console.error('Error add category');
    }
  }, [createCategoryData, createCategoryError]);

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.closeIcon}>
          <IconButton onPress={() => setModalVisible(false)}>
            <Icon name={'close'} />
          </IconButton>
        </View>
        <ScreenLayout>
          <FormLayout>
            <Headline text={'Create category'} type={'$m'} />
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
            <TextButton text={'Add'} onPress={handleSubmit(onSubmit)} primary />
          </FormLayout>
        </ScreenLayout>
      </Modal>
      <TextButton text={'+ Category'} onPress={() => setModalVisible(true)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: spacing.$xs,
    flex: 1,
    justifyContent: 'flex-end',
  },
  form: {
    backgroundColor: colors.$plainWhite,
    padding: spacing.$xl,
    flex: 1,
    flexDirection: 'column',
  },
  closeIcon: {
    margin: spacing.$l,
  },
});
