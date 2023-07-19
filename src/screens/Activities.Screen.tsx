import {
  ActivitiesScreenNavigationProp,
  Category,
  CategoryCollectionResult,
} from '../types';
import {
  CategoryListItem,
  CreateActivity,
  CreateCategory,
  Headline,
  ScreenLayout,
} from '../components';
import { StyleSheet, View } from 'react-native';

import { CATEGORY_COLLECTION } from '../services/api';
import { Text } from 'native-base';
import { nullFilter } from '../utils';
import { useAuth } from '../context';
import { useQuery } from '@apollo/client';

interface ActivitiesScreenProps extends ActivitiesScreenNavigationProp {}

export const ActivitiesScreen: React.FC<ActivitiesScreenProps> = () => {
  const { userId } = useAuth();
  const { data } = useQuery<CategoryCollectionResult>(CATEGORY_COLLECTION, {
    variables: { userId },
  });
  console.log('rendered');
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

  console.log(data?.categoryCollection?.categories?.length, 'hej');

  return (
    <ScreenLayout>
      {/* <View style={styles.container}> */}
      <Headline type={'$m'} text={'Activities'} />
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
