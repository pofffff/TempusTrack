import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { spacing } from '../../settings';

interface IconButtonProps {
  alignRight?: boolean;
  onPress(): void;
  style?: any;
  children: React.ReactNode;
}
export const IconButton: React.FC<IconButtonProps> = ({
  alignRight,
  onPress,
  children,
  style,
}) => {
  return (
    <TouchableOpacity hitSlop={20} onPress={onPress}>
      <View
        style={[
          styles.iconButtonContainer,
          alignRight && styles.alignRight,
          { ...style },
        ]}>
        {children}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  alignRight: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginTop: spacing.$l,
  },
});
