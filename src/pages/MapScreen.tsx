/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text } from 'react-native';
import { Maps } from './Maps';
const MapScreen = () => {
  return (
    <View style={{ flex: 1 }}>
        <Text>Mapa</Text>
        <Maps />
    </View>
  );
};

export default MapScreen;

