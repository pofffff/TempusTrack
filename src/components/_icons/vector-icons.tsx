import // AntDesign,
// Ionicons,
// MaterialCommunityIcons
// SimpleLineIcons
'react-native-vector-icons'
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons'

MIcon.loadFont()
import { colors } from '../../variables'

interface IconProps {
  color?: string
  size?: number
  name: React.ComponentProps<typeof MIcon>['name']
  // name: keyof typeof MaterialCommunityIcons.name
}
export const Icon: React.FC<IconProps> = ({
  size = 24,
  name,
  color = colors.$black
}) => {
  return <MIcon name={name} size={size} color={color} />
}
