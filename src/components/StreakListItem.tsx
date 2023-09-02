import { Activity, Streak } from '../types';
import { RegularText } from './_elements';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { colors, font, fontSize, spacing } from '../settings';
import { memo, useContext, useState } from 'react';
import { useSecureStore } from '../hooks';

import { ActivityListItem } from './ActivityListItem';

import { NavigationContext } from '@react-navigation/native';
import { nullFilter } from '../utils';
import { useAuth } from '../context';

interface Props {
  streak: Streak;
}

export const StreakListItem: React.FC<Props> = memo(({ streak }) => {
  const navigation = useContext(NavigationContext);
  const { getValue } = useSecureStore();
  const { userId } = useAuth();
  const [streakVisible, setStreakVisible] = useState<boolean>(false);

  return (
    streak && (
      <View>
        <TouchableOpacity onPress={}>
          <View style={styles.streakListItem}>
            <RegularText text={streak.name} style={styles.streakName} />
          </View>
          {streakVisible &&
            streak.activities &&
            streak.activities
              .filter(nullFilter)
              .map((activity: Activity) => (
                <ActivityListItem
                  activity={activity}
                  activityId={activityId}
                  handleActivityClick={handleActivityClick}
                  handleAddTimeClick={handleAddTimeClick}
                />
              ))}
        </TouchableOpacity>
      </View>
    )
  );
});

const styles = StyleSheet.create({
  streakListItem: {
    backgroundColor: colors.$black,
    borderBottomColor: colors.$light,
    borderBottomWidth: 1,
    color: colors.$light,
    height: 46,
  },
  streakName: {
    fontSize: fontSize.$s,
    fontFamily: font.$primary__regular,
    color: colors.$light,
    paddingHorizontal: spacing.$xs,
    textAlignVertical: 'center',
    height: 46,
  },
  activityListItem: {
    borderColor: colors.$black,
    borderWidth: 1,
    // flex: 1,
    height: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.$xs,
  },
  activityActive: {
    backgroundColor: colors.$grey,
  },
  activityName: {
    fontSize: fontSize.$s,
    fontFamily: font.$primary__regular,
    color: colors.$black,
    padding: spacing.$xs,
  },
  activityDetails: {
    // flex: 1
    height: 50,
  },
  closeIconWrapper: {
    margin: spacing.$xs,
  },
  closeIcon: {
    alignSelf: 'flex-end',
  },
});
