import { Category, CategoryCollectionResult } from '../types'
import {
  CategoryListItem,
  CreateActivity,
  CreateCategory,
  Headline,
  RegularText
} from '../components'
import { StyleSheet, View } from 'react-native'

import { CATEGORY_COLLECTION } from '../services/api'
import { nullFilter } from '../utils'
import { useAuth } from '../context'
import { useQuery } from '@apollo/client'

interface ActivitiesScreenProps {}

export const ArchiveScreen: React.FC<ActivitiesScreenProps> = () => {
  const { userId } = useAuth()
  const { data } = useQuery<CategoryCollectionResult>(CATEGORY_COLLECTION, {
    variables: { userId }
  })

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
          )
        })
    }
  }

  return (
    <>
      <Headline type={'$m'} text={'Archive'} />
      {data?.categoryCollection.categories ? (
        <View style={styles.categoryList}>
          {data?.categoryCollection?.categories?.length > 0 &&
            renderCategories()}
        </View>
      ) : (
        <RegularText text={'No categories found'} style={undefined} />
      )}

      <View style={styles.actionsWrapper}>
        <CreateCategory />
        <CreateActivity />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  actionsWrapper: {
    flex: 1,
    flexDirection: 'row'
  },
  categoryList: {
    flex: 1,
    height: 'auto'
  }
})
