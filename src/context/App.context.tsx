import { ApolloProvider } from '@apollo/client'
import { AuthProvider } from './Auth.Context'
import { NativeBaseProvider } from 'native-base'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { getApolloClient } from '../services/apollo'
import { JSXComponentProps } from '../types'
import { ScreenLayout } from '../components'

interface AppProviderProps extends JSXComponentProps {
  children: React.ReactNode
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const client = getApolloClient()

  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <NativeBaseProvider>
          <SafeAreaProvider>
            <ScreenLayout>{children}</ScreenLayout>
          </SafeAreaProvider>
        </NativeBaseProvider>
      </AuthProvider>
    </ApolloProvider>
  )
}
