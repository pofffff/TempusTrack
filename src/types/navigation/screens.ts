import { routes, tabs } from '../../settings';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  [routes.ACTIVITIES]: undefined;
  [routes.ARCHIVE]: undefined;
  [routes.DETAILS]: { activityId: string };
};

export type TabParamList = {
  [tabs.ACTIVITIES]: undefined;
  [tabs.ARCHIVE]: undefined;
};

export type DetailsScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'Activity details'
>;

export type ArchiveScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'Archive'
>;

export type ActivitiesScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'Activities'
>;
