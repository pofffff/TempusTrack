import { StyleSheet, View } from 'react-native';

interface FormLayoutProps {
  children: React.ReactNode;
}

export const FormLayout: React.FC<FormLayoutProps> = ({ children }) => {
  return <View style={styles.layoutWrapper}>{children}</View>;
};

export const styles = StyleSheet.create({
  layoutWrapper: {
    flex: 1,
    flexGrow: 1,
    flexDirection: 'column',
    marginVertical: 20,
  },
});
