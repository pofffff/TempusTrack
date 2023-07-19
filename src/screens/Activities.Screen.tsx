import { Category, CategoryCollectionResult } from '../types';
import {
  CategoryListItem,
  CreateActivity,
  CreateCategory,
  Headline,
} from '../components';
import { StyleSheet, View } from 'react-native';

import { CATEGORY_COLLECTION } from '../services/api';
import { Text } from 'native-base';
import { nullFilter } from '../utils';
import { useAuth } from '../context';
import { useQuery } from '@apollo/client';

interface ActivitiesScreenProps {}

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

  console.log(data);

  return (
    <View style={styles.container}>
      <Headline type={'$m'} text={'Activities'} />
      {data?.categoryCollection.categories && (
        <View style={styles.categoryList}>
          {data?.categoryCollection?.categories?.length > 0 &&
            renderCategories()}
        </View>
      )}
      <Text>hej</Text>
      <View style={styles.actionsWrapper}>
        <CreateCategory />
        <CreateActivity />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  actionsWrapper: {
    flex: 1,
    justifyContent: 'center',
    // lignItems: 'center',
    flexDirection: 'row',
    bottom: 0,
  },
  categoryList: {
    flex: 1,
    height: 'auto',
  },
});
