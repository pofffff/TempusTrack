import { AppProvider, useAuth } from './context'
import { AuthSceneView, TabSceneView } from './components'

// import React from 'react'

const Main: React.FC = () => {
  const { authenticated } = useAuth()

  return authenticated ? <TabSceneView /> : <AuthSceneView />
}

const App = () => {
  return (
    <AppProvider>
      <Main />
    </AppProvider>
  )
}

export default App
