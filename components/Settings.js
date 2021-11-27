import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import messaging from '@react-native-firebase/messaging';

import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Settings(props) {

  const [push, isPush] = useState(true);

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
              AsyncStorage.setItem('noPush','true');
              messaging().unregisterDeviceForRemoteMessages()
                  .then(res=>{
                    console.log(res);
                    alert('알림등록해제가 완로되었습니다.');
                  })
                  .catch(e=>console.log(e));
            }}>
          <Text style={styles.buttonText}>알림 끄기</Text>
        </Pressable>
        <Pressable
            style={styles.button}
            onPress={async () => {
              AsyncStorage.removeItem('noPush');
              messaging().unregisterDeviceForRemoteMessages()
                  .then(res=>{
                    console.log(res);
                    alert('알림을 다시 받습니다');
                  })
                  .catch(e=>console.log(e));
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
  viewTop: {
    flex: 1,
    backgroundColor: '#F0E9D2',
    alignItems: 'center',
    justifyContent:'center'
  },
  viewMiddle: {
    margin: 50,
    flex: 2,
    backgroundColor: '#E6DDC4',
    justifyContent: 'space-evenly',
  },
  viewBottom: {
    flex: 1,
    backgroundColor: '#152D35',
  },
  form: {
    borderRadius: 10,
    borderWidth: 5,
    backgroundColor: 'white',
    borderStyle: 'solid',
    borderColor: 'white',
    padding: 10,
    height: 50,
    margin: 10,
    color: 'black',
  },
  bottomText: {
    color: 'white',
    alignContent: 'center',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  button: {
    backgroundColor: '#678983',
    padding: 15,
    borderRadius: 5,
    marginTop:20,
    marginLeft: 50,
    marginRight:50,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    fontWeight:'bold'
  },
  labelText: {
    color: '#181D31',
    fontWeight: '600',
    marginLeft: 10,
    fontSize: 20,
  },
});

function getLoading(state) {
  return {
    state: state,
  };
}

export default connect(getLoading)(Settings);

// export default Settings;
