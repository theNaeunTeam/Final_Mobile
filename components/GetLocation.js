import React, {useState} from 'react';
import {View, Button, Platform, Text, Alert, StyleSheet, Pressable} from 'react-native';
import NetInfo, {NetInfoStateType} from '@react-native-community/netinfo';
import * as Location from 'expo-location';

import { LocationGeofencingEventType } from 'expo-location';
import * as TaskManager from 'expo-task-manager';

TaskManager.defineTask('gfgf', ({ data: { eventType, region }, error }) => {
    if (error) {
        // check `error.message` for more details.
        return;
    }
    if (eventType === LocationGeofencingEventType.Enter) {
        console.log("You've entered region:", region);
    } else if (eventType === LocationGeofencingEventType.Exit) {
        console.log("You've left region:", region);
    }
});

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
    Alert.alert(state.details.bssid);
  });
};

const getGPS = async () => {
  await Location.requestForegroundPermissionsAsync();
  await Location.requestBackgroundPermissionsAsync();
  try {
    const res = await Location.getCurrentPositionAsync();
    await console.log(res);
  } catch (err) {
    console.log(err);
  }
};

const geofence = async () => {
    await Location.startGeofencingAsync('gfgf',[{
        identifier:'home',
        latitude:35.172912,
        longitude:129.127699,
        radius:500,
    }]).then(res=>{
        console.log(res);
    }).catch(error => console.log(error));
}

function GetLocation() {
  return (
    <View>
      <View>
        <Button style={styles.button} onPress={net} title="netWork Check" />
      </View>
      <View>
        <Button style={styles.button} onPress={getSSID} title="getSSID" />
      </View>
      <View>
        <Button style={styles.button} onPress={getGPS} title="getGPS" />
      </View>
        <View>
            <Button style={styles.button} onPress={geofence} title="geofence" />
        </View>
    </View>
  );
}
const styles = StyleSheet.create({
    button: {
        backgroundColor: "#D4ECDD",
        padding: 15,
        borderRadius: 5,
        margin: 10,
    },
    buttonText: {
        fontSize: 20,
        color: "#112031",
        textAlign: "center",
    },
});
export default GetLocation;
