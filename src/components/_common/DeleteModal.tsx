import { Modal, StyleSheet, View } from 'react-native';
import { RegularText, TextButton } from '../_elements';
import { colors, spacing } from '../../settings';

import { DeleteItemParams } from '../../types';
import { ScreenLayout } from './Screen.Layout';

interface DeleteModalProps {
  visible: boolean;
  setDeleteModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: ({ cascade }: DeleteItemParams) => void;
  name?: string;
  allReferencesOnly?: boolean;
}
export const DeleteModal: React.FC<DeleteModalProps> = ({
  visible,
  setDeleteModalVisible,
  handleDelete,
  name,
  allReferencesOnly,
}) => {
  const handleDeleteClick = (cascade: boolean) => {
    handleDelete({ cascade });
    setDeleteModalVisible(false);
  };

  return (
    <Modal
      transparent
      visible={visible}
      onRequestClose={() => {
        setDeleteModalVisible(false);
      }}>
      <View style={styles.wrapper}>
        <View style={styles.modalContent}>
          {/* <ScreenLayout> */}
          <RegularText
            text={`Are you sure you want to delete the activity ${name}?`}
            style={undefined}
          />
          <TextButton
            text={'Yes, delete'}
            onPress={() => handleDeleteClick(!!allReferencesOnly)}
          />
          {!allReferencesOnly && (
            <TextButton
              text={'Yes, and delete references'}
              onPress={() => handleDeleteClick(true)}
            />
          )}

          <TextButton
            text={'No, keep'}
            onPress={() => setDeleteModalVisible(false)}
          />
          {/* </ScreenLayout> */}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
  },
  modalContent: {
    boxShadow:
      'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px', // marginHorizontal: spacing.$m,
    // marginVertical: spacing.$m,
    paddingHorizontal: spacing.$l,
    paddingVertical: spacing.$l,
    backgroundColor: colors.$plainWhite,
    alignSelf: 'center',
    justifyContent: 'center',
    gap: spacing.$s,
  },
});
