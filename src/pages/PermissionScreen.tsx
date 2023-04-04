import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PermissionsContext } from '../context/PermissionContext';
import { BlackButton } from '../components/navigator/BlackButton';

export const PermissionScreen = () => {

    const {permissions, askLocationPermission } = useContext(PermissionsContext);



    return (
   <View style={styles.container}>
    <Text style={styles.texto}>Para usar esta Aplicación es necesario activar los permisos de ubicación</Text>
    <BlackButton
    title="Permiso"
    onPress={askLocationPermission}
    />
    <Text style={ styles.resultado}>
        {JSON.stringify(permissions, null , 5)}

    </Text>
   </View>
  );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
    },
    texto:{
        width:250,
        margin: 20,
        fontSize:16,
    },
    resultado : {
        fontSize: 20,
        color: 'gray',
    },
});
