import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {client} from '../lib/client';
import {useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import logo from '../img/image-removebg-preview.png';

function Login({navigation}) {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  const login = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.viewTop}>
          <Image source={logo} resizeMode="contain" style={{width: '50%'}} />
        </View>
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
              keyboardType={'numeric'}
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
          <Pressable style={styles.button} onPress={loading ? null : login}>
            <Text style={styles.buttonText}>로그인</Text>
            {loading && <ActivityIndicator />}
          </Pressable>
        </View>
      </View>
    </TouchableWithoutFeedback>
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
    justifyContent: 'center',
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
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#678983',
    padding: 15,
    borderRadius: 5,
    margin: 10,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  labelText: {
    color: '#181D31',
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
