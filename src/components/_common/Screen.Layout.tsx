import { StyleSheet, View } from 'react-native';
import { colors, spacing } from '../../settings';

import { ScrollLayout } from './Scroll.Layout';

interface ScreenLayoutProps {
  children: React.ReactNode;
}

export const ScreenLayout: React.FC<ScreenLayoutProps> = ({ children }) => {
  return (
    <View style={styles.screenLayout}>
      {/* <ScrollLayout> */}
      {children}
      {/* </ScrollLayout> */}
    </View>
  );
};

const styles = StyleSheet.create({
  screenLayout: {
    flex: 1,
    backgroundColor: colors.$plainWhite,
    paddingHorizontal: '3%',
    paddingVertical: spacing.$xs,
    flexGrow: 1,
    flexDirection: 'column',
    width: '100%',
  },
});
