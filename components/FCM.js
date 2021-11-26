import React, {useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import {Alert, AppRegistry, Text} from 'react-native';
import App from "../App";

export default function FCM() {
    useEffect(() => {
        requestUserPermission();

        const unsubscribe = messaging().onMessage(async remoteMessage => {
            Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
        });

        return unsubscribe;
    }, []);

    async function requestUserPermission() {
        const authStatus = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            console.log('Authorization status:', authStatus);
            const token = await messaging().getToken();
            console.log('토큰',token);
        }
    }

    messaging().setBackgroundMessageHandler(async remoteMessage => {
        console.log('Message handled in the background!', remoteMessage);
    });
    AppRegistry.registerComponent('app', () => App);

    return (
        <>
            <Text>FCM</Text>
        </>
    );
}
