import { FormLayout, ScreenLayout } from './_common';
import {
  Headline,
  Icon,
  IconButton,
  InputDate,
  InputNumber,
  TextButton,
} from './_elements';
import { Modal, StyleSheet, View } from 'react-native';

import { spacing } from '../settings';

interface ActivityModalProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  control: any;
  getFieldState: any;
  handleSubmit: any;
  onSubmit: any;
}

export const ActivityModal: React.FC<ActivityModalProps> = ({
  modalVisible,
  setModalVisible,
  control,
  getFieldState,
  handleSubmit,
  onSubmit,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
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
          <Headline text={'Add time record'} type={'$m'} />
          <InputNumber
            label={'Amount'}
            name={'amount'}
            control={control}
            getFieldState={getFieldState}
            rules={{
              required: true,
            }}
          />
          <InputDate
            rules={undefined}
            control={control}
            getFieldState={getFieldState}
            name={'date'}
            label={'Date'}
          />
          <TextButton text={'Add'} onPress={handleSubmit(onSubmit)} primary />
        </FormLayout>
      </ScreenLayout>
    </Modal>
  );
};

const styles = StyleSheet.create({
  closeIconWrapper: {
    margin: spacing.$xs,
  },
  closeIcon: {
    alignSelf: 'flex-end',
  },
});
