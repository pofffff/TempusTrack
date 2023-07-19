import { DetailsScreen } from '../screens';
import { RootStackParamList } from '../types';
import { TabSceneView } from './TabSceneView';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export const Navigator = () => {
  return (
    <RootStack.Navigator initialRouteName={'Home'}>
      <RootStack.Screen name="Home" component={TabSceneView} />
      <RootStack.Screen name={'DetailsScreen'} component={DetailsScreen} />
    </RootStack.Navigator>
  );
};
