import { StyleSheet, TextInput, View } from 'react-native'
import { colors, font, fontSize, spacing } from '../../settings'
import { useEffect, useState } from 'react'

import { Controller } from 'react-hook-form'
import { ReactHookForm } from '../../types'
import { RegularText } from './Text.Regular'

interface InputNumberProps extends ReactHookForm {
  label: string
  name: string
  secureTextEntry?: boolean
  rules: any
}

export const InputNumber: React.FC<InputNumberProps> = ({
  label,
  name,
  secureTextEntry = false,
  control,
  getFieldState,
  rules
}) => {
  const [errorMessage, setErrorMessage] = useState<string | null>()

  useEffect(() => {
    const error = getFieldState(name).error
    if (error?.message) {
      setErrorMessage(error.message)
    } else if (error?.type === 'passwordMatch') {
      setErrorMessage('Password does not match')
    } else {
      setErrorMessage(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getFieldState(name).error])

  return (
    <View style={styles.outerContainer}>
      <RegularText style={styles.label} text={label} />
      <View style={styles.innerContainer}>
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field: { onBlur, onChange, value } }) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={ivalue => onChange(ivalue)}
              value={value?.toString()!}
              style={styles.input}
              placeholder={''}
              secureTextEntry={secureTextEntry}
              keyboardType={'numeric'}
            />
          )}
        />
      </View>
      {errorMessage ? (
        <RegularText style={styles.fieldError} text={errorMessage} />
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  outerContainer: {
    marginVertical: spacing.$xs
  },
  innerContainer: {
    marginVertical: spacing.$xxs
  },

  label: {
    paddingLeft: spacing.$xxs,
    fontSize: fontSize.$xs,
    fontFamily: font.$text__light
  },

  fieldError: {
    paddingLeft: spacing.$xxs,
    paddingTop: spacing.$xxs,
    fontSize: fontSize.$xs,
    fontFamily: font.$primary__medium
  },

  input: {
    fontSize: fontSize.$xs,
    fontFamily: font.$text__light,
    padding: spacing.$xs,
    maxWidth: 500,
    borderWidth: 1,
    color: colors.$black
  }
})
