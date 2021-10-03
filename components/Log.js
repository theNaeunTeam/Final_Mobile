import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Button,
  Platform,
  Text,
  Alert,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
} from 'react-native';
import DTP from './DTP';
import DateTimePicker from '@react-native-community/datetimepicker';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

function Log() {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
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
    Platform.OS === 'ios' && setShow(true);
  }, []);

  const handleDateChange = useCallback(
    (event: Event, date: Date | undefined) => {
      if (Platform.OS === 'android') {
        setShow(false);
      }
      if (date) setDate(date);
      SecureStore.getItemAsync('id').then(async res => {
        const newDate = date.toISOString().split('T')[0];
        const url = `https://kenken0803.herokuapp.com/timeCardGetLog`;
        await axios
          .post(url, {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json;charset=utf-8',
            },
            email: res,
            date: newDate,
          })
          .then(res => {
            if (res.data[0].curDate) {
              setBottomView(res.data[0]);
            }
          })
          .catch(e => {
            Alert.alert('데이터가 없습니다');
            console.log(e);
          });
      });
    },
    [],
  );

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };
  const showDatepicker = () => {
    showMode('date');
  };
  return (
    <View style={styles.container}>
      <View style={styles.viewTop}>
        {Platform.OS === 'ios' || (
          <>
            <Pressable onPress={showDatepicker}>
              <TextInput
                style={styles.textInput}
                editable={false}
                value={date.toISOString().split('T')[0]}
              />
            </Pressable>
            <Button onPress={showDatepicker} title="터치해서 날짜 선택" />
          </>
        )}
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            display={Platform.OS === 'ios' ? 'inline' : 'default'}
            onChange={handleDateChange}
            locale="ko-KO"
          />
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
    backgroundColor: '#D4ECDD',
    // justifyContent: 'center',
    // alignItems: "center"
  },
  viewMiddle: {
    flex: 1,
    // backgroundColor: "#345B63",
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#333',
    padding: 20,
    margin: 20,
    width: '90%',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
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
export default Log;
