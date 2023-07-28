import { Activity, Category, ReactHookForm } from '../../types';
import { StyleSheet, View } from 'react-native';
import { colors, font, fontSize, spacing } from '../../settings';
import { useEffect, useState } from 'react';

import { Controller } from 'react-hook-form';
import { Icon } from './Icon';
import { RegularText } from './Text.Regular';
import SelectDropdown from 'react-native-select-dropdown';

interface InputSelectProps extends ReactHookForm {
  label: string;
  name: string;
  secureTextEntry?: boolean;
  // keyboardType?: KeyboardTypeOptions | undefined
  rules?: any;
  items: Category[] | Activity[];
}

interface Option {
  key: string;
  value: string;
}

export const InputSelect: React.FC<InputSelectProps> = ({
  label,
  name,
  // keyboardType = undefined,
  control,
  getFieldState,
  rules,
  items,
}) => {
  const [_selected, _setSelected] = useState('');
  const [_data, setData] = useState<Option[]>([]);

  useEffect(() => {
    if (items) {
      let newArray = items.map(item => {
        return { key: item.id, value: item?.name };
      });
      setData(newArray);
    }
  }, [items]);

  return (
    <View style={styles.outerContainer}>
      <RegularText style={styles.label} text={label} />
      <View style={styles.inneContainer}>
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field: { onChange, value } }) => (
            <SelectDropdown
              key={`Select-${value}`}
              data={items}
              onSelect={(selectedItem, _index) => {
                // console.log(selectedItem.id);
                onChange(selectedItem.id);
              }}
              defaultButtonText={
                _selected
                  ? items.find(item => item.id === _selected)?.name
                  : 'Select'
              }
              buttonStyle={styles.dropdownBtnStyle}
              buttonTextStyle={styles.dropdownBtnTxtStyle}
              rowStyle={styles.dropdownRowStyle}
              rowTextStyle={styles.dropdownRowTxtStyle}
              buttonTextAfterSelection={(selectedItem, _index) => {
                return selectedItem.name;
              }}
              rowTextForSelection={(item, _index) => {
                return item.name;
              }}
              renderDropdownIcon={(isOpened: boolean) => {
                return isOpened ? (
                  <Icon name={'menu-up'} />
                ) : (
                  <Icon name={'menu-down'} />
                );
              }}
            />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    marginVertical: spacing.$xs,
  },
  inneContainer: {
    marginVertical: spacing.$xxs,
  },

  label: {
    paddingLeft: spacing.$xxs,
    fontSize: fontSize.$xs,
    fontFamily: font.$text__light,
  },

  fieldError: {
    paddingLeft: spacing.$xxs,
    paddingTop: spacing.$xxs,
    fontSize: fontSize.$xs,
    fontFamily: font.$primary__medium,
  },

  input: {
    fontSize: fontSize.$m,
    fontFamily: font.$text__light,
    padding: spacing.$xs,
    maxWidth: 500,
    borderWidth: 1,
    color: colors.$black,
  },

  option: {
    padding: spacing.$xxs,
  },

  dropdownBtnStyle: {
    width: '100%',
    // height: 50,
    marginVertical: spacing.$xxs,
    backgroundColor: '',
    borderRadius: 0,
    borderWidth: 1,
    borderColor: colors.$black,
  },
  dropdownBtnTxtStyle: {
    color: colors.$black,
    textAlign: 'left',
    fontFamily: font.$text__light,
    fontSize: fontSize.$xs,
  },
  dropdownRowStyle: {
    backgroundColor: colors.$plainWhite,
    borderBottomColor: colors.$grey,
  },
  dropdownRowTxtStyle: {
    color: colors.$black,
    textAlign: 'left',
    fontFamily: font.$text__light,
    fontSize: fontSize.$s,
    paddingLeft: spacing.$xs,
    textTransform: 'capitalize',
  },
});
