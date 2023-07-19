import { Headline, TextButton, TimeRecordListItem } from '../components'
import { StyleSheet, View } from 'react-native'
import { TimeRecord, TimeRecordCollectionResult } from '../types'

import { TIME_RECORD_COLLECTION } from '../services/api'
import { nullFilter } from '../utils'
import { useAuth } from '../context'
import { useQuery } from '@apollo/client'
import { useState } from 'react'

interface DetailsScreenProps {}

export const DetailsScreen: React.FC<DetailsScreenProps> = () => {
  const { userId } = useAuth()
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false)
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false)
  const { data } = useQuery<TimeRecordCollectionResult>(
    TIME_RECORD_COLLECTION,
    {
      variables: { userId }
    }
  )

  const onDeleteClick = () => {
    //  const timeReordIds = [timeRecord.id]
    //  DeleteTimeRecordsMutation({
    //    variables: { input: timeReordIds },
    //    refetchQueries: [
    //      {
    //        query: TIME_RECORD_COLLECTION,
    //        variables: { activityId: timeRecord.activity.id }
    //      }
    //    ]
    //  })
    setDeleteModalVisible(true)
  }

  const onEditClick = () => {
    setEditModalVisible(true)
  }

  const timeRecords = () => {
    if (data?.timeRecordCollection.timeRecords) {
      return data.timeRecordCollection.timeRecords
        .filter(nullFilter)
        .map((timeRecord: TimeRecord) => {
          return (
            <TimeRecordListItem
              timeRecord={timeRecord}
              key={`TimeRecord-${timeRecord.id}`}
            />
          )
        })
    }
  }

  return (
    <View style={styles.container}>
      <Headline type={'$m'} text={'Details'} />
      {data?.timeRecordCollection.timeRecords && (
        <View style={styles.timeRecordList}>{timeRecords()}</View>
      )}
      <View style={styles.activityActions}>
        <TextButton text={'Edit'} onPress={() => onEditClick()} />
        <TextButton text={'Delete activity'} onPress={() => onDeleteClick()} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  actionsWrapper: {
    flex: 1,
    justifyContent: 'center',
    //alignItems: 'center',
    flexDirection: 'row',
    bottom: 0
  },
  timeRecordList: {
    flex: 1,
    height: 'auto'
  },
  activityActions: {
    flexDirection: 'row'
  }
})
