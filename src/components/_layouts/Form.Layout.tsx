import { StyleSheet, View } from 'react-native'
import { JSXComponentProps } from '../../types'

interface FormLayoutProps extends JSXComponentProps {}

export const FormLayout: React.FC<FormLayoutProps> = ({ children }) => {
  return <View style={styles.layoutWrapper}>{children}</View>
}

export const styles = StyleSheet.create({
  layoutWrapper: {
    flex: 1,
    flexGrow: 1,
    flexDirection: 'column',
    marginVertical: 20
  }
})
