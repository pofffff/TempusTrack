import { Headline, Icon, IconButton } from '../_elements';
import { StyleSheet, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

interface HeaderProps {
  icon?: boolean;
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ icon, title }) => {
  const navigation = useNavigation();

  const handleClick = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.wrapper}>
      {icon && (
        <IconButton onPress={handleClick}>
          <Icon name={'step-backward'} size={24} />
        </IconButton>
      )}

      <View style={styles.headlineWrapper}>
        <Headline type={'$m'} text={title} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headlineWrapper: {
    position: 'absolute',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    right: 16,
  },
});
