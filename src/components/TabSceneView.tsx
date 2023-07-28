import {
  ACTIVITIES_SCREEN,
  ARCHIVE_SCREEN,
  colors,
  font,
  fontSize,
} from '../settings';
import { ActivitiesScreen, ArchiveScreen } from '../screens';
import {
  Dimensions,
  StyleSheet,
  View,
  useWindowDimensions,
} from 'react-native';
import {
  NavigationState,
  SceneRendererProps,
  TabBar,
  TabView,
} from 'react-native-tab-view';

import { Icon } from './_elements';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useState } from 'react';

interface RenderSceneProps {
  route: { key: string };
  jumpTo(scene: string): void;
}

type Route = {
  key: string;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>['name'];
  tabBar: boolean;
  title?: string;
};

type State = NavigationState<Route>;

const renderScene: React.FC<Route> = ({ key }) => {
  switch (key) {
    case ACTIVITIES_SCREEN:
      return <ActivitiesScreen />;
    case ARCHIVE_SCREEN:
      return <ArchiveScreen />;

    default:
      return null;
  }
};

export const TabSceneView = () => {
  const layout = useWindowDimensions();
  const deviceHeight = Dimensions.get('window').height;
  const [index, setIndex] = useState(0);
  const [routes] = useState<Route[]>([
    {
      key: ACTIVITIES_SCREEN,
      icon: 'format-list-bulleted-square',
      tabBar: true,
      // title: 'hej1'
    },
    {
      key: ARCHIVE_SCREEN,
      icon: 'archive-outline',
      // title: 'hej2',
      tabBar: true,
    },
  ]);
  const renderIcon = ({ route }: { route: Route; color: string }) => (
    <Icon name={route.icon} size={24} />
  );

  const renderTabBar = (
    props: SceneRendererProps & { navigationState: State },
  ) => (
    <TabBar
      {...props}
      renderIcon={renderIcon}
      // renderLabel={({ route, color }) => null}
      style={{ backgroundColor: colors.$plainWhite }}
      labelStyle={styles.label}
      indicatorStyle={{ backgroundColor: colors.$black }}
    />
  );
  // https://github.com/satya164/react-native-tab-view/blob/main/example/src/TabBarIconExample.tsx
  return (
    <View style={{ height: deviceHeight - 20 }}>
      <TabView
        navigationState={{
          index,
          routes,
        }}
        renderScene={({ route }) => renderScene(route)}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        tabBarPosition={'bottom'}
        renderTabBar={renderTabBar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    color: colors.$black,
    fontFamily: font.$primary__regular,
    letterSpacing: 1,
    fontSize: fontSize.$xs,
  },
});
