import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  DetailsScreen: {activityId: string};
};

export type DetailsScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'DetailsScreen'
>;
