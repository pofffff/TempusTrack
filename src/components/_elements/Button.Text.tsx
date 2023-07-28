import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors, font, fontSize, spacing } from '../../settings';

interface TextButtonProps {
  text: string;
  onPress(): void;
  primary?: boolean;
}
export const TextButton: React.FC<TextButtonProps> = ({
  text,
  onPress,
  primary,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.buttonContainer, primary && styles.primary]}>
      <Text style={[styles.buttonText, primary && styles.primary]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
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
  },
  primary: {
    backgroundColor: colors.$black,
    color: colors.$light,
  },
});
