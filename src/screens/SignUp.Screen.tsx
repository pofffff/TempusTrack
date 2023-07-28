import { FormLayout, Headline, InputText, TextButton } from '../components'
import { StyleSheet, View } from 'react-native'

import { CreateUserInput } from '../types'
import { SIGN_UP_USER } from '../services/api'
import { spacing } from '../settings'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'

interface SignUpScreenProps extends CreateUserInput {
  setSignUp(bol: boolean): void
}

export const SignUpScreen: React.FC<SignUpScreenProps> = ({ setSignUp }) => {
  const [signUp, { data, loading, error }] = useMutation(SIGN_UP_USER)
  const {
    control,
    getValues,
    getFieldState,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<CreateUserInput>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordControl: ''
    },
    mode: 'onChange'
  })
  const onSubmit = (idata: CreateUserInput) => {
    const { passwordControl, ...input } = idata
    signUp({ variables: { input: input } })
  }

  useEffect(() => {
    if (data) {
      setSignUp(false)
    }
    if (error) {
      console.error(error)
    }
    // TODO: Display error from BE
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error])

  return (
    <FormLayout>
      <Headline type={'$xl'} text={'Sign up'} />
      <InputText
        label={'Name'}
        name={'name'}
        control={control}
        getFieldState={getFieldState}
        rules={{
          required: true,
          minLength: {
            value: 2,
            message: 'At least 2 characters'
          }
        }}
        keyboardType={undefined}
      />
      <InputText
        label={'Email'}
        name={'email'}
        keyboardType={'email-address'}
        control={control}
        getFieldState={getFieldState}
        rules={{
          required: true,
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: 'Not a valid email'
          }
        }}
      />
      <InputText
        label={'Password'}
        name={'password'}
        secureTextEntry={true}
        control={control}
        getFieldState={getFieldState}
        rules={{
          required: true,
          minLength: {
            value: 8,
            message: 'At least 8 characters'
          }
        }}
        keyboardType={undefined}
      />
      <InputText
        label={'One more time please'}
        name={'passwordControl'}
        secureTextEntry={true}
        control={control}
        getFieldState={getFieldState}
        rules={{
          required: true,
          minLength: {
            value: 8,
            message: 'At least 8 characters'
          },
          validate: {
            passwordMatch: (value: string) => value === getValues('password')
          }
        }}
        keyboardType={undefined}
      />
      <View style={styles.marginTop}>
        <TextButton text={'Create'} onPress={handleSubmit(onSubmit)} primary />
        <TextButton text={'Sign in'} onPress={() => setSignUp(false)} />
      </View>
    </FormLayout>
  )
}

const styles = StyleSheet.create({
  marginTop: {
    marginTop: spacing.$m
  }
})
