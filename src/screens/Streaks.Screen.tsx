import { ScreenLayout, StreakListItem } from '../components';
import { Streak, StreakCollectionResult } from '../types';
import { StyleSheet, View } from 'react-native';

import { STREAK_COLLECTION } from '../services/api';
import { nullFilter } from '../utils';
import { useAuth } from '../context';
import { useQuery } from '@apollo/client';

export const StreaksScreen: React.FC = () => {
  const { userId } = useAuth();
  const { data } = useQuery<StreakCollectionResult>(STREAK_COLLECTION, {
    variables: { userId },
  });

  const renderStreaks = (streaks: Streak[]) => {
    return streaks.filter(nullFilter).map(streak => {
      return <StreakListItem streak={streak} key={`Streak-${streak.id}`} />;
    });
  };

  return (
    <ScreenLayout>
      {data?.streakCollection.streaks && (
        <View style={styles.streakList}>
          {data?.streakCollection?.streaks?.length > 0 &&
            renderStreaks(data?.streakCollection?.streaks as Streak[])}
        </View>
      )}
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  actionsWrapper: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    bottom: 0,
  },
  streakList: {
    flex: 1,
    height: 'auto',
  },
});
