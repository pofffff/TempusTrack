import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { colors, font, fontSize, spacing } from '../../settings';

import { Controller } from 'react-hook-form';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Icon } from './Icon';
import { IconButton } from './Button.Icon';
import { ReactHookForm } from '../../types';
import { RegularText } from './Text.Regular';
import { useState } from 'react';

interface InputDateProps extends ReactHookForm {
  label: string;
  name: 'startDate' | 'date';
  rules?: any;
}

export const InputDate: React.FC<InputDateProps> = ({
  control,
  label,
  name,
  rules,
}) => {
  const [datePickerVisible, setDatePickerVisible] = useState<boolean>(false);

  return (
    <View style={styles.wrapper}>
      <RegularText text={label} style={styles.startDateText} />

      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, value } }) => (
          <TouchableOpacity onPress={() => setDatePickerVisible(true)}>
            <View style={styles.startDate}>
              <RegularText
                text={value?.toDateString() ?? 'Date'}
                style={styles.inputText}
              />
              <IconButton onPress={() => setDatePickerVisible(true)}>
                <Icon name={'calendar'} />
              </IconButton>
              <DateTimePickerModal
                isVisible={datePickerVisible}
                mode="date"
                onConfirm={(d: Date) => {
                  onChange(d);
                  setDatePickerVisible(false);
                }}
                onCancel={() => setDatePickerVisible(false)}
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
