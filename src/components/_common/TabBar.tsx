import { Icon, IconButton } from '../_elements';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { colors, routes, tabs } from '../../settings';

import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';

export const TabBar: React.FC<BottomTabBarProps> = ({ state, navigation }) => {
  const activeRoute = state.routes[state.index].name;

  const handleClick = (routeName: string) => {
    if (routeName !== activeRoute) {
      navigation.navigate(routeName);
    }
  };

  return (
    <View style={styles.wrapper}>
      <View
        style={[styles.tab, activeRoute === tabs.ACTIVITIES && styles.active]}>
        <IconButton onPress={() => handleClick(tabs.ACTIVITIES)}>
          <Icon name={'format-list-bulleted-square'} />
        </IconButton>
      </View>
      <View style={[styles.tab, activeRoute === tabs.ARCHIVE && styles.active]}>
        <IconButton onPress={() => handleClick(tabs.ACTIVITIES)}>
          <Icon name={'archive-outline'} />
        </IconButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    height: 56,
    backgroundColor: colors.$plainWhite,
    borderTopWidth: 0.5,
    borderTopColor: colors.$grey,
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    borderBottomColor: colors.$black,
    borderBottomWidth: 2,
  },
});
