import { ScrollView, StyleSheet, View } from 'react-native'
import { JSXComponentProps } from '../../types'

interface ScrollLayoutProps extends JSXComponentProps {}

export const ScrollLayout: React.FC<ScrollLayoutProps> = ({ children }) => {
  return (
    <View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={[styles.scrollView]}>
        {children}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    height: '100%'
  }
})
