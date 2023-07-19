import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  ActivitiesScreen: undefined;
  ArchiveScreen: undefined;
  DetailsScreen: { activityId: string };
};

export type DetailsScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'DetailsScreen'
>;

export type ArchiveScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'ArchiveScreen'
>;

export type ActivitiesScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'ActivitiesScreen'
>;
