import { ActivitiesScreen, ArchiveScreen, DetailsScreen } from '../screens';
import { Header, TabBar } from './_common';
import { RootStackParamList, TabParamList } from '../types';
import { routes, tabs } from '../settings';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function ActivitiesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={routes.ACTIVITIES}
        component={ActivitiesScreen}
        options={({ route }) => ({
          headerTitle: () => <Header title={route.name} />,
          headerShown: false,
        })}
      />
      <Stack.Screen
        name={routes.DETAILS}
        component={DetailsScreen}
        options={({ route }) => ({
          headerTitle: () => <Header title={route.name} icon />,
          headerShown: false,
        })}
      />
    </Stack.Navigator>
  );
}

function ArchiveStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={routes.ARCHIVE}
        component={ArchiveScreen}
        options={({ route }) => ({
          headerTitle: () => <Header title={route.name} />,
          headerShown: false,
        })}
      />
      <Stack.Screen
        name={routes.DETAILS}
        component={DetailsScreen}
        options={({ route }) => ({
          headerTitle: () => <Header title={route.name} icon />,
          headerLeft: () => null,
          headerShown: false,
        })}
      />
    </Stack.Navigator>
  );
}

export const Navigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={props => <TabBar {...props} />}>
        <Tab.Screen name={tabs.ACTIVITIES} component={ActivitiesStack} />
        <Tab.Screen name={tabs.ARCHIVE} component={ArchiveStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
