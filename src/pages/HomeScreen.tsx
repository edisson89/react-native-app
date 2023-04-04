/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export const HomeScreen = () => {

const myIcon = <Icon name="cafe" size={96} color="#BFC3BA" />;
  return (
    <View style={ styles.container}>
    <Text style={styles.text}>CafeExpress</Text>
    <Text
      style={{ alignSelf:'center' }}
    >{myIcon}</Text>
  </View>
  );
};
const styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor: '#60495A',
      justifyContent:'center',
    },
    text:{
      fontSize:60,
      color:'white',
      alignSelf:'center',
        },
});
