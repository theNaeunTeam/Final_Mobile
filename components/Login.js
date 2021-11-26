import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {client} from '../lib/client';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Login({navigation}) {

  const dispatch = useDispatch();

  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  const login = async () => {
    const URL = 'https://thenaeunteam.link/common/ownerlogin';

    const data = {
      o_sNumber: id,
      o_pw: pw,
    };

    try {
      const res = await client.post(URL, data);
      if (res.status === 200) {
        AsyncStorage.setItem('ownerToken', res.headers['x-auth-token']);
        AsyncStorage.setItem('o_sNumber', id);
        dispatch({type: 'ownerMode', payload: id});
        navigation.navigate('Main');
      } else {
        alert('사업자번호 및 비밀번호를 확인해 주세요');
      }
    } catch (e) {
      alert('사업자번호 및 비밀번호를 확인해 주세요');
      console.log(e);
    }
  };

  return (
      <View style={styles.container}>
        <View style={styles.viewTop}></View>
        <View style={styles.viewMiddle}>
          <View>
            <Text style={styles.labelText}>사업자번호</Text>
            <TextInput
                placeholder={'하이픈 없이 입력해 주세요'}
                style={styles.form}
                autoCapitalize={'none'}
                autoCorrect={false}
                returnKeyType={'next'}
                onChangeText={e => {
                  setId(e);
                }}
            />
          </View>
          <View>
            <Text style={styles.labelText}>비밀번호</Text>
            <TextInput
                placeholder={'비밀번호'}
                style={styles.form}
                autoCapitalize={'none'}
                autoCorrect={false}
                returnKeyType={'done'}
                onChangeText={e => {
                  setPw(e);
                }}
                secureTextEntry={true}
            />
          </View>
          <Pressable style={styles.button} onPress={login}>
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>
          <Pressable
              onPress={() => {
                alert('홈페이지로 이동하시겠습니까?');
              }}
              style={styles.button}>
            <Text style={styles.buttonText}>Register</Text>
          </Pressable>
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
    backgroundColor: '#D4ECDD',
  },
  viewMiddle: {
    flex: 2,
    backgroundColor: '#345B63',
    justifyContent: 'space-evenly',
  },
  viewBottom: {
    flex: 0.5,
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
    backgroundColor: '#D4ECDD',
    padding: 15,
    borderRadius: 5,
    margin: 10,
  },
  buttonText: {
    fontSize: 20,
    color: '#112031',
    textAlign: 'center',
  },
  labelText: {
    color: 'white',
    fontWeight: '600',
    marginLeft: 10,
    fontSize: 20,
  },
});

// function setIdPw(state) {
//   return {
//     state: state,
//   };
// }

// export default connect(setIdPw)(Login);

export default Login;
