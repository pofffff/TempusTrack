import { Icon, IconButton, RegularText } from './_elements';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { colors, font, fontSize, spacing } from '../settings';

import { Activity } from '../types';

interface ActivityListItemProps {
  activity: Activity;
  activityId?: string | null;
  handleActivityClick: (activityId: string) => void;
  handleAddTimeClick: (activityId: string) => void;
}

export const ActivityListItem = ({
  activity,
  activityId,
  handleActivityClick,
  handleAddTimeClick,
}: ActivityListItemProps) => {
  return (
    <TouchableOpacity
      onPress={() => handleActivityClick(activity.id)}
      key={`Activity-${activity.id}`}>
      <View
        style={[
          styles.activityListItem,
          activityId === activity.id && styles.isActive,
        ]}>
        <RegularText text={activity.name} style={styles.activityName} />
        <IconButton onPress={() => handleAddTimeClick(activity.id)}>
          <RegularText
            style={styles.activityName}
            text={`${activity.totalTimeTraced.toString()}h`}
          />
          <Icon name={'clock-time-four'} size={18} />
        </IconButton>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  activityListItem: {
    borderColor: colors.$black,
    borderWidth: 1,
    // flex: 1,
    height: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.$xs,
  },
  isActive: {
    backgroundColor: colors.$grey,
  },
  activityName: {
    fontSize: fontSize.$s,
    fontFamily: font.$primary__regular,
    color: colors.$black,
    padding: spacing.$xs,
  },
  activityDetails: {
    height: 50,
  },
  closeIconWrapper: {
    margin: spacing.$xs,
  },
  closeIcon: {
    alignSelf: 'flex-end',
  },
});
