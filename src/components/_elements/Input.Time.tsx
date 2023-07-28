import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { colors, font, fontSize, spacing } from '../../settings';

import { Controller } from 'react-hook-form';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Icon } from './Icon';
import { IconButton } from './Button.Icon';
import { ReactHookForm } from '../../types';
import { RegularText } from './Text.Regular';
import { useState } from 'react';

interface InputTimeProps extends ReactHookForm {
  label: string;
  name: 'startTime';
  rules?: any;
}

export const InputTime: React.FC<InputTimeProps> = ({
  control,
  label,
  name,
  rules,
}) => {
  const [timePickerVisible, setTimePickerVisible] = useState<boolean>(false);

  return (
    <View style={styles.wrapper}>
      <RegularText text={label} style={styles.startDateText} />

      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, value } }) => (
          <TouchableOpacity onPress={() => setTimePickerVisible(true)}>
            <View style={styles.startDate}>
              <RegularText
                text={value?.toLocaleTimeString() ?? 'Select Time'}
                style={styles.inputText}
              />
              <IconButton onPress={() => setTimePickerVisible(true)}>
                <Icon name={'clock-time-four'} />
              </IconButton>
              <DateTimePickerModal
                isVisible={timePickerVisible}
                mode="time"
                onConfirm={(d: Date) => {
                  onChange(d);
                  setTimePickerVisible(false);
                }}
                onCancel={() => setTimePickerVisible(false)}
              />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {},
  startDate: {
    borderWidth: 1,
    borderColor: colors.$black,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spacing.$xs,
    marginVertical: spacing.$xs,
  },

  inputText: {
    padding: spacing.$xxs,
    fontSize: fontSize.$xs,
    fontFamily: font.$text__light,
  },

  startDateText: {
    fontSize: fontSize.$xs,
    fontFamily: font.$text__light,
  },

  datePicker: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 320,
    height: 260,
    display: 'flex',
  },
});
