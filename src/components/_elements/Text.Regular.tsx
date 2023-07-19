import { RegularTextStyle } from './Text.Regular.styles'
import { Text } from 'react-native'

interface RegularTextProps {
  text: string
  style: any
}

export const RegularText: React.FC<RegularTextProps> = ({ text, style }) => {
  return text ? (
    <Text style={[RegularTextStyle.base, style]}>{text}</Text>
  ) : null
}
