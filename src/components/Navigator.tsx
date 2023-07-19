import { ActivitiesScreen, ArchiveScreen, DetailsScreen } from '../screens';

import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

type TabParamList = {
  Activity: undefined;
  Archive: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createMaterialBottomTabNavigator<TabParamList>();

function ActivitiesStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ActivitiesScreen" component={ActivitiesScreen} />
      <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
    </Stack.Navigator>
  );
}

function ArchiveStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ArchiveScreen" component={ArchiveScreen} />
      <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
    </Stack.Navigator>
  );
}

export const Navigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Activity" component={ActivitiesStack} />
        <Tab.Screen name="Archive" component={ArchiveStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
