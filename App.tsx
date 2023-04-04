import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Navigator } from './src/components/navigator/Navigator';
import { PermissionsProvider } from './src/context/PermissionContext';

const AppState = ({children}: any)=>{
  return (
    <PermissionsProvider>
      {children}
    </PermissionsProvider>
  );
};



const App = () => {
  return (
    <NavigationContainer>
      <AppState>
         <Navigator />
      </AppState>
    </NavigationContainer>
    );
};

export default App;
