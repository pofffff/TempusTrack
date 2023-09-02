import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors, font, fontSize, spacing } from '../../settings';

interface TextButtonProps {
  text: string;
  onPress(): void;
  primary?: boolean;
  fullWidth?: boolean;
}
export const TextButton: React.FC<TextButtonProps> = ({
  text,
  onPress,
  primary,
  fullWidth,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.buttonContainer,
        primary && styles.primary,
        fullWidth && styles.fullWidth, // apply the fullWidth style if prop is true
      ]}>
      <Text style={[styles.buttonText, primary && styles.primary]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.$plainWhite,
    fontFamily: font.$primary__regular,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginVertical: spacing.$xs,
    borderWidth: 1,
    borderColor: colors.$black,
  },
  buttonText: {
    fontSize: fontSize.$s,
    color: colors.$black,
    fontFamily: font.$primary__medium,
    letterSpacing: 1,
    textAlign: 'center',
  },
  primary: {
    backgroundColor: colors.$black,
    color: colors.$light,
  },
  fullWidth: {
    flex: 1,
    alignItems: 'stretch',
  },
});
