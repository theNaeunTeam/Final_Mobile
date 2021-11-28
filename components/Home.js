import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  BackHandler,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {connect, useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {client} from '../lib/client';
import FCM from './FCM';

function Home(props) {
  const [list, setList] = useState([]);
  const [list2, setList2] = useState([]);
  const [list3, setList3] = useState([]);
  const [loading, setLoading] = useState(true);

  const {refreshReducer} = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    init();
  }, [refreshReducer]);

  useEffect(() => {
    const backAction = () => {
      Alert.alert('종료하시겠습니까?', '종료버튼을 누르면 어플을 종료합니다', [
        {
          text: '취소',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: '종료',
          onPress: async () => {
            console.log('exit');
            await BackHandler.exitApp();
          },
        },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const init = async () => {
    setLoading(true);
    const URL = `https://thenaeunteam.link/owner/reserveList`;

    const o_sNumber = await AsyncStorage.getItem('o_sNumber');
    dispatch({type: 'ownerMode', payload: o_sNumber});

    try {
      const res = await client.get(`${URL}?g_owner=${o_sNumber}`);
      const firstWait = res.data.filter(arr => arr.r_status === 0);
      const compWait = res.data.filter(
        arr => arr.r_status !== 0 && arr.r_status !== 3,
      );

      setList(res.data.filter(arr => arr.r_status !== 3));
      setList2(compWait);
      setList3(firstWait);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.viewTop}>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <>
            <FCM />
            <Text style={styles.buttonTextAppr}>
              최초 승인 대기 {list3.length} 건이 있습니다.
            </Text>
            <Text style={styles.buttonTextComp}>
              완료 처리 대기 {list2.length} 건이 있습니다.
            </Text>
          </>
        )}
      </View>
      <View style={styles.viewMiddle}>
        <ScrollView>
          {loading ? (
            <ActivityIndicator size="large" />
          ) : (
            list.map((data, idx) => {
              return (
                <Pressable
                  key={`button${idx}`}
                  style={
                    data.r_status === 0 ? styles.itemAppr : styles.itemComp
                  }
                  onPress={() => {
                    dispatch({type: 'goToDetailPage', payload: data});
                    props.navigation.navigate('예약상세');
                  }}>
                  <View key={`view${idx}`}>
                    <Text style={styles.buttonText}>
                      {data.g_name} {data.r_count}개
                    </Text>
                    <Text key={`name${idx}`}>
                      주문자 : {data.r_u_id} 방문예정시간:{data.r_firstTime}
                    </Text>
                    <Text>요청사항 : {data.r_customOrder}</Text>
                  </View>
                </Pressable>
              );
            })
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(240, 233, 210, 0.5)',
    flex: 1,
  },
  viewTop: {
    flex: 0.5,
    backgroundColor: '#ffbf3f',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  viewMiddle: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'flex-start',
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
  buttonTextAppr: {
    fontSize: 17,
    color: '#C85C5C',
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 2,
  },
  buttonTextComp: {
    fontSize: 17,
    color: '#66806A',
    textAlign: 'center',
    fontWeight: 'bold',
    margin: 2,
  },
  itemAppr: {
    backgroundColor: 'rgba(255, 99, 132, 0.2)',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#333',
    padding: 20,
    margin: 10,
    width: '95%',
    alignItems: 'center',
    flexDirection: 'column',
  },
  itemComp: {
    backgroundColor: 'rgba(75, 192, 192, 0.2)',
    color: '#66806A',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#333',
    padding: 20,
    margin: 10,
    width: '95%',
    alignItems: 'center',
    flexDirection: 'column',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonText: {
    fontSize: 20,
    color: '#112031',
    textAlign: 'center',
  },
});

function getLoading(state) {
  return {
    state: state,
  };
}

export default connect(getLoading)(Home);
