import { ApolloProvider } from '@apollo/client';
import { AuthProvider } from './Auth.Context';
import { NativeBaseProvider } from 'native-base';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { getApolloClient } from '../services/apollo';

interface AppProviderProps {
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
