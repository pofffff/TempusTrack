import { AppProvider, useAuth } from './context';
import { AuthSceneView, Navigator } from './components';

// import { NavigationContainer } from '@react-navigation/native';

// import React from 'react'
const Main: React.FC = () => {
  const { authenticated } = useAuth();

  return authenticated ? <Navigator /> : <AuthSceneView />;
};

const App = () => {
  return (
    <AppProvider>
      <Main />
    </AppProvider>
  );
};

export default App;
