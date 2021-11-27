import React, {useEffect, useState} from 'react';
import messaging from '@react-native-firebase/messaging';
import {Alert, AppRegistry, Text} from 'react-native';
import App from '../App';
import {client} from '../lib/client';

export default function FCM() {
  const [show, setShow] = useState(false);
  const [isTokenFound, setTokenFound] = useState(false);
  const [notification, setNotification] = useState({
    title: '',
    body: '',
    etc: '',
    img: '',
  });

  useEffect(() => {
    requestUserPermission();

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log(remoteMessage);
      const {data} = remoteMessage;
      Alert.alert(
        data.title,
        data.body + data.r_customOrder + data.r_firstTime + '시',
      );
    });

    return unsubscribe;
  }, []);

  // {"data": {"body": "예약현황 페이지를 확인해 주세요", "image": " ", "r_customOrder": "제가 직접 받음", "r_firstTime": "18:00", "title": "1개의 새 예약건이 있습니다"}, "from": "416664792102", "messageId": "0:1637915863603288%b4a2312af9fd7ecd", "sentTime": 1637915863592, "ttl": 2419200}

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      setTokenFound(true);
      const token = await messaging().getToken();
      console.log('토큰', token);
      client
        .post('https://thenaeunteam.link/owner/pushToken', {token: token})
        .then(res => {
          console.log('토큰등록결과', res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });

  // LOG  Message handled in the background! {"data": {"body": "예약현황 페이지를 확인해 주세요", "image": " ", "r_customOrder": "제가 직접 받음", "r_firstTime": "18:00", "title": "1개의 새 예약건이 있습니다"}, "from": "416664792102", "messageId": "0:1637916009602582%b4a2312af9fd7ecd", "sentTime": 1637916009593, "ttl": 2419200}

  // messaging().onNotificationOpenedApp(remoteMessage => {
  //     console.log('[push] onNotificationOpenedApp', remoteMessage);
  // });
  //
  // messaging()
  //     .getInitialNotification()
  //     .then(remoteMessage => {
  //         if (remoteMessage) {
  //             console.log('[push] getInitialNotification', remoteMessage);
  //         }
  //     });

  AppRegistry.registerComponent('app', () => App);

  return (
    <>
      {isTokenFound ? (
        <Text>푸시알림이 활성화되었습니다</Text>
      ) : (
        <Text>알림이 비활성화 상태입니다</Text>
      )}
    </>
  );
}
