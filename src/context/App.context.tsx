import { ApolloProvider } from '@apollo/client';
import { AuthProvider } from './Auth.Context';
import { JSXComponentProps } from '../types';
import { NativeBaseProvider } from 'native-base';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { getApolloClient } from '../services/apollo';

interface AppProviderProps extends JSXComponentProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const client = getApolloClient();

  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <NativeBaseProvider>
          <SafeAreaProvider>{children}</SafeAreaProvider>
        </NativeBaseProvider>
      </AuthProvider>
    </ApolloProvider>
  );
};
