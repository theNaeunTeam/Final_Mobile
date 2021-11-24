import React from 'react';
import {View, Button, Alert, StyleSheet} from 'react-native';
import * as Location from 'expo-location';
import { LocationGeofencingEventType } from 'expo-location';
import * as TaskManager from 'expo-task-manager';



function GetLocation() {
  return (
    <View>

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
