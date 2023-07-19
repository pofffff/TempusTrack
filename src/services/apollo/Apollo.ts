import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'

import { FactoryApolloClient } from '../../types'
// import env from 'react-native-config'

import { GRAPHQL_URL, TOKEN_KEY } from '../../variables'
import { setContext } from '@apollo/client/link/context'
import { useSecureStore } from '../../hooks'

const httpLink = createHttpLink({
  uri: GRAPHQL_URL
})

const authLink = setContext(async () => {
  const { getValue } = useSecureStore()
  const token = await getValue(TOKEN_KEY)
  const authorization = {
    authorization: `Bearer ${token}`
  }
  return {
    headers: {
      ...(token ? authorization : {})
    }
  }
})

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  name: 'Activities'
})

export const getApolloClient = (): FactoryApolloClient => {
  return apolloClient
}
