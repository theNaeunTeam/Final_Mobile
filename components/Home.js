import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import {connect} from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import {MaterialCommunityIcons} from '@expo/vector-icons';

function Home(props) {
  const [id, setId] = useState('');
  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(true);
  const [bottomView, setBottomView] = useState({
    curDate: null,
    endTime: null,
    goOutsideEnd: null,
    goOutsideStart: null,
    msEndTime: null,
    msStartTime: null,
    startTime: null,
    user_email: null,
  });
  useEffect(() => {
    init1();
    init2();
  }, []);

  const init1 = async () => {
    await SecureStore.getItemAsync('id')
      .then(async res => {
        await setId(res);

        const url = `https://kenken0803.herokuapp.com/timeCardInit`;
        const authGroup = await axios.post(url, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json;charset=utf-8',
          },
          email: res,
        });
        const authGroupData = authGroup.data;

        const wifiName = authGroupData.map(data => data.wifiName);
        const wifiNameData = wifiName.filter(data => data !== null);
        await console.log('와이파이이름 : ' + wifiNameData);

        const wifiAddr = authGroupData.map(data => data.wifiAddr);
        const wifiAddrData = wifiAddr.filter(data => data !== null);
        await console.log('와이파이주소 : ' + wifiAddrData);

        const btName = authGroupData.map(data => data.btName);
        const btNameData = btName.filter(data => data !== null);
        await console.log('블투이름 : ' + btNameData);

        const btAddr = authGroupData.map(data => data.btAddr);
        const btAddrData = btAddr.filter(data => data !== null);
        await console.log('블투주소 : ' + btAddrData);

        const nfcName = authGroupData.map(data => data.nfcName);
        const nfcNameData = nfcName.filter(data => data !== null);
        await console.log('nfc이름 : ' + nfcNameData);

        const nfcAddr = authGroupData.map(data => data.nfcAddr);
        const nfcAddrData = nfcAddr.filter(data => data !== null);
        await console.log('nfc주소 : ' + nfcAddrData);

        const gpsName = authGroupData.map(data => data.gpsName);
        const gpsNameData = gpsName.filter(data => data !== null);
        await console.log('gps이름 : ' + gpsNameData);

        const gpsLat = authGroupData.map(data => data.gpsLat);
        const gpsLatData = gpsLat.filter(data => data !== null);
        await console.log('gps lat : ' + gpsLatData);

        const gpsLon = authGroupData.map(data => data.gpsLon);
        const gpsLonData = gpsLon.filter(data => data !== null);
        await console.log('gps lon : ' + gpsLonData);

        const data = {
          wifiName: wifiNameData,
          wifiAddr: wifiAddrData,
          btName: btNameData,
          btAddr: btAddrData,
          nfcName: nfcNameData,
          nfcAddr: nfcAddrData,
          gpsName: gpsNameData,
          gpsLat: gpsLatData,
          gpsLon: gpsLonData,
          groupName: authGroupData[0].authGroupName,
          workTime: authGroupData[0].workTime,
          lunchtime: authGroupData[0].lunchtime,
          startTime: authGroupData[0].startTime,
          endTime: authGroupData[0].endTime,
          refreshCount: 1,
        };
        await console.log(data);
        await props.dispatch({type: 'initDB', payload: {data}});
        await setLoading(false);
      })
      .catch(error => {
        console.log(error);
        alert(error);
      });
  };

  const init2 = () => {
    const date = new Date().toISOString().split('T')[0];
    console.log(date);
    SecureStore.getItemAsync('id').then(async res => {
      const url = `https://kenken0803.herokuapp.com/timeCardGetLog`;
      await axios
        .post(url, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json;charset=utf-8',
          },
          email: res,
          date: date,
        })
        .then(res => {
          if (res.data[0].curDate) {
            setDisable(false);
            setBottomView(res.data[0]);
          }
          console.log(res.data[0]);
        })
        .catch(e => {
          console.log(e);
        });
    });
  };

  const reportStart = async () => {
    const url = `https://kenken0803.herokuapp.com/timeCardStart`;
    const jikann =
      new Date().toISOString().split('T')[0] +
      ' ' +
      new Date().toTimeString().split(' ')[0];
    const msStartTime = new Date().getTime();
    try {
      const res = await axios
        .post(url, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json;charset=utf-8',
          },
          email: id,
          start: jikann,
          msStartTime: msStartTime,
        })
        .then(() => {
          setDisable(false);
          init2();
          Alert.alert('출근 인증 성공!');
        });
    } catch (e) {
      console.log(e);
      Alert.alert(e.error);
    }
  };

  const reportEnd = async () => {
    const url = `https://kenken0803.herokuapp.com/timeCardEnd`;
    const jikann =
      new Date().toISOString().split('T')[0] +
      ' ' +
      new Date().toTimeString().split(' ')[0];
    const msEndTime = new Date().getTime();
    const date = new Date().toISOString().split('T')[0];
    try {
      await axios
        .post(url, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json;charset=utf-8',
          },
          email: id,
          end: jikann,
          msEndTime: msEndTime,
          date: date,
        })
        .then(() => {
          init2();
          Alert.alert('퇴근 등록 성공!');
        });
    } catch (e) {
      console.log(e);
      Alert.alert(e.error);
    }
  };

  const SSIDchk = input => {
    let res = true;
    NetInfo.fetch('wifi').then(state => {
      // if (!state.isWifiEnabled) {
      //   Alert.alert('와이파이 켜주세요');
      //   return false;
      // }
      if (!state.isConnected) {
        Alert.alert('와이파이에 접속 상태를 확인해주세요');
        return false;
      }
      const SSID = state.details.ssid;
      const BSSID = state.details.bssid;
      props.state.data.wifiName.map((val, index) => {
        if (
          props.state.data.wifiName[index] === SSID &&
          props.state.data.wifiAddr[index] === BSSID
        ) {
          switch (input) {
            case 1:
              reportStart();
              break;
            case 2:
            case 3:
            case 4:
              reportEnd();
              break;
          }
          res = false;
          return false;
        }
      });
      if (res)
        Alert.alert('인증 실패', '새로고침 버튼을 누른 후 다시 시도해주세요');
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.viewTop}>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <>
            <Text style={styles.buttonText}>{id} 님 환영합니다</Text>
            <View>
              <Text style={styles.buttonText}>
                소속 : {props.state.data.groupName}
              </Text>
              {/*<Text style={styles.buttonText}>{new Date().toString()}</Text>*/}
              <Text style={styles.buttonText}>
                {' '}
                근무 시간 : {props.state.data.workTime}
              </Text>
              <Text style={styles.buttonText}>
                {' '}
                점심 시간 : {props.state.data.lunchtime}
              </Text>
              <Text style={styles.buttonText}>
                {' '}
                근무 인정 시간 : {props.state.data.startTime}
              </Text>
              <Text style={styles.buttonText}>
                {' '}
                퇴근 인정 시간 : {props.state.data.endTime}
              </Text>
            </View>

            <View style={styles.viewMiddle}>
              <Pressable
                style={disable ? styles.button : styles.disabledButton}
                disabled={!disable}
                onPress={() => SSIDchk(1)}>
                <MaterialCommunityIcons
                  name="airplane-takeoff"
                  size={24}
                  color="black"
                />
                <Text style={styles.buttonText}>출근</Text>
              </Pressable>
              <Pressable
                style={!disable ? styles.button : styles.disabledButton}
                onPress={() => SSIDchk(2)}
                disabled={disable}>
                <MaterialCommunityIcons
                  name="shield-airplane-outline"
                  size={24}
                  color="black"
                />
                <Text style={styles.buttonText}>외출시작</Text>
              </Pressable>
              <Pressable
                style={!disable ? styles.button : styles.disabledButton}
                onPress={() => SSIDchk(3)}
                disabled={disable}>
                <MaterialCommunityIcons
                  name="shield-airplane"
                  size={24}
                  color="black"
                />
                <Text style={styles.buttonText}>외출종료</Text>
              </Pressable>
              <Pressable
                style={!disable ? styles.button : styles.disabledButton}
                disabled={disable}
                onPress={() => SSIDchk(4)}>
                <MaterialCommunityIcons
                  name="airplane-landing"
                  size={24}
                  color="black"
                />
                <Text style={styles.buttonText}>퇴근</Text>
              </Pressable>
            </View>
          </>
        )}
      </View>
      <ScrollView style={styles.container}>
        <View>
          {bottomView.startTime && (
            <View style={styles.item}>
              <MaterialCommunityIcons
                name="airplane-takeoff"
                size={24}
                color="black"
              />
              <Text style={styles.title}>
                {' '}
                출근 시간 : {bottomView.startTime}
              </Text>
            </View>
          )}
          {bottomView.goOutsideStart && (
            <View style={styles.item}>
              <MaterialCommunityIcons
                name="shield-airplane-outline"
                size={24}
                color="black"
              />
              <Text style={styles.title}>
                {' '}
                외출 시작 : {bottomView.goOutsideStart}
              </Text>
            </View>
          )}
          {bottomView.goOutsideEnd && (
            <View style={styles.item}>
              <MaterialCommunityIcons
                name="shield-airplane"
                size={24}
                color="black"
              />
              <Text style={styles.title}>
                {' '}
                외츌 종료 : {bottomView.goOutsideEnd}
              </Text>
            </View>
          )}
          {bottomView.endTime && (
            <View style={styles.item}>
              <MaterialCommunityIcons
                name="airplane-landing"
                size={24}
                color="black"
              />
              <Text style={styles.title}>
                {' '}
                퇴근 시간 : {bottomView.endTime}
              </Text>
            </View>
          )}
          {bottomView.msEndTime - bottomView.msStartTime >= 0 && (
            <View style={styles.item}>
              <MaterialCommunityIcons name="airplane" size={24} color="black" />
              <Text style={styles.title}>
                {' '}
                근무 시간 :{' '}
                {Math.floor(
                  (bottomView.msEndTime - bottomView.msStartTime) / 60000 / 60,
                )}
                시간
                {Math.floor(
                  ((bottomView.msEndTime - bottomView.msStartTime) / 60000) %
                    60,
                )}{' '}
                분
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewTop: {
    flex: 1,
    backgroundColor: '#ffbf3f',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  viewMiddle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#D4ECDD',
    borderRadius: 5,
    margin: 10,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#A9A9A9',
    borderRadius: 5,
    margin: 10,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#112031',
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 2,
  },
  item: {
    borderWidth: 1,
    borderColor: '#333',
    padding: 20,
    margin: 10,
    width: '95%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

function getLoading(state) {
  return {
    state: state,
  };
}

export default connect(getLoading)(Home);
