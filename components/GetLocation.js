import React, {useState} from 'react';
import {View, Button, Platform, Text, Alert, StyleSheet} from 'react-native';
import NetInfo, {NetInfoStateType} from '@react-native-community/netinfo';
import * as Location from 'expo-location';

const net = () => {
  NetInfo.fetch().then(state => {
    console.log('Connection type', state.type);
    console.log('Is connected?', state.isConnected);
  });
};
const getSSID = () => {
  NetInfo.fetch('wifi').then(state => {
    console.log('SSID', state.details.ssid);
    console.log('BSSID', state.details.bssid);
    console.log('Is connected?', state.isConnected);
  });
};

const getGPS = async () => {
  const location = await Location.requestForegroundPermissionsAsync();
  try {
    const res = await Location.getCurrentPositionAsync();
    await console.log(res);
  } catch (err) {
    console.log(err);
  }
};

function GetLocation() {
  return (
    <View>
      <View>
        <Button onPress={net} title="netWork Check" />
      </View>
      <View>
        <Button onPress={getSSID} title="getSSID" />
      </View>
      <View>
        <Button onPress={getGPS} title="getGPS" />
      </View>
    </View>
  );
}

export default GetLocation;
