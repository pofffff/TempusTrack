import { Activity, Category, CreateTimeRecordInput } from '../types'
import { FormLayout, ScreenLayout } from './_layouts'
import {
  Headline,
  IconButton,
  InputDate,
  InputNumber,
  RegularText,
  TextButton
} from './_elements'
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native'
import { USER_ID_KEY, colors, font, fontSize, spacing } from '../variables'
import { memo, useEffect, useState } from 'react'
import { useSecureStore, useTimeRecord } from '../hooks'

import { CATEGORY_COLLECTION } from '../services/api'
import { Icon } from './_icons'
import { nullFilter } from '../utils'
import { useAuth } from '../context'
import { useForm } from 'react-hook-form'

interface CategoryListItemProps {
  category: Category
}

export const CategoryListItem: React.FC<CategoryListItemProps> = memo(
  ({ category }) => {
    const [categoryVisible, setCategoryVisible] = useState<boolean>(false)
    const [activityId, setActivityId] = useState<string | null>()
    const { getValue } = useSecureStore()
    const { userId } = useAuth()
    const [modalVisible, setModalVisible] = useState<boolean>(false)
    const {
      CreateTimeRecordMutation,
      createTimeRecordData,
      createTimeRecordError
    } = useTimeRecord()

    const {
      control,
      getFieldState,
      handleSubmit,
      formState: {}
    } = useForm<CreateTimeRecordInput>({
      defaultValues: {
        amount: undefined,
        date: new Date(),
        activityId: ''
      },
      mode: 'onChange'
    })

    const onSubmit = async (data: CreateTimeRecordInput) => {
      const { amount, date: iDate } = data
      console.log({ activityId, amount, iDate })
      if (!amount || !activityId) return
      // TODO create date in BE instead when done
      const date = iDate ?? new Date()

      CreateTimeRecordMutation({
        variables: {
          userId: await getValue(USER_ID_KEY),
          input: { activityId, amount: Number(amount), date }
        },
        refetchQueries: [
          {
            query: CATEGORY_COLLECTION,
            variables: { userId }
          }
        ]
      })
    }

    useEffect(() => {
      if (createTimeRecordData) {
        setModalVisible(false)
      }

      // TODO fix error handling
      if (createTimeRecordError) {
        console.error(createTimeRecordError)
      }
    }, [createTimeRecordData, createTimeRecordError])

    const handleAddTimeClick = (activityId: string) => {
      setActivityId(activityId)
      setModalVisible(true)
    }
    const handleActivityClick = (activityId: string) => {
      // TODO navigate
    }
    return (
      category && (
        <View>
          <TouchableOpacity
            onPress={() => setCategoryVisible(!categoryVisible)}>
            <View style={styles.categoryListItem}>
              <RegularText text={category.name} style={styles.categoryName} />
            </View>
            {categoryVisible &&
              category.activities &&
              category.activities
                .filter(nullFilter)
                .map((activity: Activity) => {
                  return (
                    <>
                      <Modal
                        animationType="slide"
                        transparent={false}
                        visible={modalVisible}
                        onRequestClose={() => {
                          setModalVisible(false)
                        }}>
                        <ScreenLayout>
                          <View style={styles.closeIconWrapper}>
                            <IconButton
                              style={styles.closeIcon}
                              onPress={() => setModalVisible(false)}>
                              <Icon name={'close'} size={36} />
                            </IconButton>
                          </View>
                          <FormLayout>
                            <Headline text={'Add time record'} type={'$m'} />
                            <InputNumber
                              label={'Amount'}
                              name={'amount'}
                              control={control}
                              getFieldState={getFieldState}
                              rules={{
                                required: true
                              }}
                            />
                            <InputDate
                              rules={undefined}
                              control={control}
                              getFieldState={getFieldState}
                              name={'date'}
                              label={'Date'}
                            />
                            <TextButton
                              text={'Add'}
                              onPress={handleSubmit(onSubmit)}
                              primary
                            />
                          </FormLayout>
                        </ScreenLayout>
                      </Modal>
                      <TouchableOpacity
                        onPress={() => handleActivityClick(activity.id)}
                        key={`Activity-${activity.id}`}>
                        <View
                          style={[
                            styles.activityListItem,
                            activityId === activity.id && styles.activityActive
                          ]}>
                          <RegularText
                            text={activity.name}
                            style={styles.activityName}
                          />
                          <IconButton
                            onPress={() => handleAddTimeClick(activity.id)}>
                            <RegularText
                              style={styles.activityName}
                              text={`${activity.totalTimeTraced.toString()}h`}
                            />
                            <Icon name={'clock-time-four'} size={18} />
                          </IconButton>
                        </View>
                      </TouchableOpacity>
                    </>
                  )
                })}
          </TouchableOpacity>
        </View>
      )
    )
  }
)

const styles = StyleSheet.create({
  categoryListItem: {
    backgroundColor: colors.$black,
    borderBottomColor: colors.$light,
    borderBottomWidth: 1,
    color: colors.$light,
    height: 46
  },
  categoryName: {
    fontSize: fontSize.$s,
    fontFamily: font.$primary__regular,
    color: colors.$light,
    paddingHorizontal: spacing.$xs,
    textAlignVertical: 'center',
    height: 46
  },
  activityListItem: {
    borderColor: colors.$black,
    borderWidth: 1,
    // flex: 1,
    height: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.$xs
  },
  activityActive: {
    backgroundColor: colors.$grey
  },
  activityName: {
    fontSize: fontSize.$s,
    fontFamily: font.$primary__regular,
    color: colors.$black,
    padding: spacing.$xs
  },
  activityDetails: {
    // flex: 1
    height: 50
  },
  closeIconWrapper: {
    margin: spacing.$xs
  },
  closeIcon: {
    alignSelf: 'flex-end'
  }
})
