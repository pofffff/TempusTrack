import { Modal, StyleSheet, View } from 'react-native';
import { RegularText, TextButton } from '../_elements';

import { ScreenLayout } from './Screen.Layout';
import { spacing } from '../../settings';

interface DeleteModalProps {
  visible: boolean;
  setDeleteModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: ({ cascade }: { cascade: boolean }) => void;
  name?: string;
}
export const DeleteModal: React.FC<DeleteModalProps> = ({
  visible,
  setDeleteModalVisible,
  handleDelete,
  name,
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
        <View style={styles.modalContent}></View>
        {/* <ScreenLayout> */}
        <RegularText
          text={`Are you sure you want to delete activity ${name}?`}
          style={undefined}
        />
        <TextButton
          text={'Yes, delete'}
          onPress={() => handleDeleteClick(false)}
        />
        <TextButton
          text={'Yes, and delete references'}
          onPress={() => handleDeleteClick(true)}
        />
        <TextButton
          text={'No, keep'}
          onPress={() => setDeleteModalVisible(false)}
        />
        {/* </ScreenLayout> */}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
  },
  modalContent: {
    paddingHorizontal: spacing.$xl,
    marginVertical: spacing.$xl,
    alignSelf: 'center',
    justifyContent: 'center',
  },
});
