import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import { colors, font, fontSize, spacing } from '../settings';
import { memo, useState } from 'react';

import { RegularText } from './_elements';
import { TimeRecord } from '../types';
import { TimeRecordEditModal } from './TimeRecordEditModal';
import { getDateString } from '../utils';

interface TimeRecordListItemProps {
  timeRecord: TimeRecord;
}

export const TimeRecordListItem: React.FC<TimeRecordListItemProps> = memo(
  ({ timeRecord }) => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const handleClick = () => {
      setModalVisible(!modalVisible);
    };

    return (
      timeRecord && (
        <View>
          <TouchableOpacity onPress={handleClick}>
            <View style={styles.timeRecordListItem}>
              <RegularText
                text={getDateString(timeRecord.date as any)}
                style={styles.timeRecordText}
              />
              <RegularText
                text={`${timeRecord.amount.toString()}h`}
                style={styles.timeRecordText}
              />
            </View>
          </TouchableOpacity>
          <Modal
            transparent
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false);
            }}>
            <TimeRecordEditModal
              timeRecord={timeRecord}
              setModalVisible={setModalVisible}
            />
          </Modal>
        </View>
      )
    );
  },
);

const styles = StyleSheet.create({
  timeRecordListItem: {
    backgroundColor: colors.$light,
    borderBottomColor: colors.$black,
    borderBottomWidth: 1,
    color: colors.$black,
    height: 46,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.$xs,
  },
  timeRecordText: {
    fontSize: fontSize.$s,
    fontFamily: font.$primary__regular,
    color: colors.$black,
    paddingHorizontal: spacing.$xs,
    textAlignVertical: 'center',
    height: 46,
  },
});
