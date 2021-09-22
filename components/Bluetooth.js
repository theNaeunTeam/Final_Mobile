import React, {useState} from 'react';
import {View, Button, Platform, Text, Alert, StyleSheet} from 'react-native';

function Bluetooth() {

    return (
        <View style={styles.container}>
            <View style={styles.viewTop}>
                <Text>블투</Text>
            </View>
            <View style={styles.viewMiddle}>
                <Text>메인화면</Text>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    viewTop: {
        flex: 1,
        backgroundColor: "#D4ECDD",
        justifyContent: "center",
        alignItems: "center"
    },
    viewMiddle: {
        flex: 1,
        backgroundColor: "#345B63",
        justifyContent: "center",
        alignItems: "center"
    },
});
export default Bluetooth;