import {
  ActivitiesScreenNavigationProp,
  Category,
  CategoryCollectionResult,
} from '../types';
import {
  CategoryListItem,
  CreateActivity,
  CreateCategory,
  ScreenLayout,
} from '../components';
import { StyleSheet, View } from 'react-native';

import { CATEGORY_COLLECTION } from '../services/api';
import { nullFilter } from '../utils';
import { useAuth } from '../context';
import { useQuery } from '@apollo/client';

interface ActivitiesScreenProps {}

export const ActivitiesScreen: React.FC<ActivitiesScreenProps> = () => {
  const { userId } = useAuth();
  const { data } = useQuery<CategoryCollectionResult>(CATEGORY_COLLECTION, {
    variables: { userId },
  });
  const renderCategories = () => {
    if (data?.categoryCollection.categories) {
      return data.categoryCollection.categories
        .filter(nullFilter)
        .map((category: Category) => {
          return (
            <CategoryListItem
              category={category}
              key={`Category-${category.id}`}
            />
          );
        });
    }
  };

  return (
    <ScreenLayout>
      {/* <View style={styles.container}> */}
      {data?.categoryCollection.categories && (
        <View style={styles.categoryList}>
          {data?.categoryCollection?.categories?.length > 0 &&
            renderCategories()}
        </View>
      )}
      <View style={styles.actionsWrapper}>
        <CreateCategory />
        <CreateActivity />
      </View>
      {/* </View> */}
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
  categoryList: {
    flex: 1,
    height: 'auto',
  },
});
