import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../../pages/HomeScreen';
import { ProveedorScreen } from '../../pages/Proveedor.Screen';
import { ClienteScreen } from '../../pages/ClienteScreen';
import { PermissionScreen } from '../../pages/PermissionScreen';
import { PermissionsContext } from '../../context/PermissionContext';
import { LoadingScreen } from '../../pages/LoadingScreen';
import MapScreen from '../../pages/MapScreen';


const Stack = createNativeStackNavigator();

export const Navigator = () => {

  const { permissions} = useContext(PermissionsContext);
  if (permissions.locationStatus === 'unavailable'){
    return <LoadingScreen />;
  }

  return (
        <Stack.Navigator

        screenOptions={{
          headerShown: false,
          }}
        >
          {
            (permissions.locationStatus === 'granted')
                    ? <Stack.Screen name="HomeScreen"component={HomeScreen}options={{ title: 'Welcome' }}/>

                //  ? <Stack.Screen name="ProveedorScreen"component={ProveedorScreen}options={{ title: 'Welcome' }} />

                //  ? <Stack.Screen name="Cliente" component={ ClienteScreen } />
            // <Stack.Screen name="MapScreen" component={ MapScreen } />
            : <Stack.Screen name="PermisosScreen"component={PermissionScreen}options={{ title: 'Welcome' }} />

          }
      </Stack.Navigator>
    );
};

