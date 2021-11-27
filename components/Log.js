import React, {useCallback, useEffect, useState} from 'react';
import {
  Button,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

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
    color: 'black',
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
