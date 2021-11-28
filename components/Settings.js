import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Settings(props) {
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.button}
        onPress={() => {
          AsyncStorage.clear();
          props.navigation.navigate('Login Page');
        }}>
        <Text style={styles.buttonText}>로그아웃</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={async () => {
          AsyncStorage.setItem('noPush', 'true');
          messaging()
            .unregisterDeviceForRemoteMessages()
            .then(res => {
              console.log(res);
              alert('알림등록해제가 완로되었습니다.');
            })
            .catch(e => console.log(e));
        }}>
        <Text style={styles.buttonText}>알림 끄기</Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={async () => {
          AsyncStorage.removeItem('noPush');
          messaging()
            .registerDeviceForRemoteMessages()
            .then(res => {
              console.log(res);
              alert('알림을 다시 받습니다');
            })
            .catch(e => console.log(e));
        }}>
        <Text style={styles.buttonText}>알림 켜기</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6DDC4',
  },
  bottomText: {
    color: 'white',
    alignContent: 'center',
  },
  button: {
    backgroundColor: '#678983',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    marginLeft: 50,
    marginRight: 50,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

function getLoading(state) {
  return {
    state: state,
  };
}

export default connect(getLoading)(Settings);
