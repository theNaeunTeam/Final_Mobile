import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DateTimePicker from '@react-native-community/datetimepicker';
import {client} from '../lib/client';
import ImagePicker from 'react-native-image-crop-picker';
import {useSelector} from 'react-redux';
import styled from 'styled-components/native';

const ViewItem = styled.View`
  margin: 10px;
  padding: 10px;
  borderwidth: 0.5px;
  bordercolor: black;
`;

function Register({navigation}) {
  const [loading, setLoading] = useState(false);

  const [photo, setPhoto] = useState(null);

  const [g_name, setG_name] = useState('');
  const [g_count, setG_count] = useState('');
  const [g_price, setG_price] = useState('');
  const [g_discount, setG_discount] = useState('');
  const [g_detail, setG_detail] = useState('');
  const [g_category, setG_category] = useState('');

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const {authReducer} = useSelector(state => state);

  const validateForm = () => {
    if (!g_name) {
      alert('상품 이름을 확인해주세요');
      return false;
    }
    if (!photo) {
      alert('사진을 등록해주세요');
      return false;
    }
    if (!g_count || g_count < 1) {
      alert('수량을 확인해주세요');
      return false;
    }
    if (!g_price || g_price < 1) {
      alert('상품 정가를 확인해주세요');
      return false;
    }
    if (!g_discount || g_discount < 1) {
      alert('상품 할인가를 확인해주세요');
      return false;
    }
    if (!g_category) {
      alert('상품 분류를 확인해주세요');
      return false;
    }

    submitForm();
  };

  const submitForm = () => {
    setLoading(true);
    const URL = 'https://thenaeunteam.link/owner/addGoods';
    const formData = new FormData();
    const data = {
      uri: photo.path,
      type: 'multipart/form-data',
      name: authReducer.o_sNumber,
    };

    formData.append('file', data);
    formData.append('g_owner', authReducer.o_sNumber);
    formData.append('g_name', g_name);
    formData.append('g_count', g_count);
    formData.append('g_price', g_price);
    formData.append('g_discount', g_discount);
    formData.append('g_detail', g_detail);
    formData.append('g_expireDate', date.toISOString().split('T')[0]);
    formData.append('g_category', g_category);
    formData.append('actionType', 'new');

    client
      .post(URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        alert('상품 등록 완료');
      })
      .catch(error => {
        alert('네트워크 에러');
        console.log(error);
      })
      .finally(setLoading(false));
  };

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

  const handleChoosePhoto = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      mediaType: 'photo',
    }).then(image => {
      setPhoto(image);
    });
  };

  const handleTakePhoto = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
      mediaType: 'photo',
    }).then(image => {
      setPhoto(image);
    });
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <View style={styles.viewMiddle}>
          <ViewItem>
            <Text style={styles.labelText}>상품이름</Text>
            <TextInput
              placeholder={'상품이름'}
              style={styles.form}
              autoCapitalize={'none'}
              autoCorrect={false}
              returnKeyType={'next'}
              onChangeText={e => {
                setG_name(e);
              }}
            />
          </ViewItem>
          <ViewItem>
            <Text style={styles.labelText}>상품수량</Text>
            <TextInput
              placeholder={'상품수량'}
              style={styles.form}
              autoCapitalize={'none'}
              autoCorrect={false}
              returnKeyType={'next'}
              keyboardType={'numeric'}
              onChangeText={e => {
                setG_count(e);
              }}
            />
          </ViewItem>
          <ViewItem>
            <Text style={styles.labelText}>상품분류</Text>
            <RNPickerSelect
              onValueChange={value => setG_category(value)}
              items={[
                {label: '마실것', value: '마실것'},
                {label: '신선식품', value: '신선식품'},
                {label: '가공식품', value: '가공식품'},
                {label: '냉동식품', value: '냉동식품'},
                {label: '조리/반조리', value: '조리/반조리'},
                {label: '식품외 기타', value: '식품외 기타'},
              ]}
              style={pickerSelectStyles}
              placeholder={{label: '상품 분류를 선택해주세요'}}
            />
          </ViewItem>
          <ViewItem>
            <Text style={styles.labelText}>유통기한</Text>
            {Platform.OS === 'ios' || (
              <>
                <Pressable onPress={showDatepicker} style={styles.button}>
                  <Text style={styles.buttonText}>날짜 선택</Text>
                </Pressable>
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
            <Pressable onPress={showDatepicker}>
              <TextInput
                style={styles.buttonText}
                editable={false}
                value={date.toISOString().split('T')[0]}
              />
            </Pressable>
          </ViewItem>
          <ViewItem>
            <Text style={styles.labelText}>사진 등록 {photo && 'OK'}</Text>
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <Pressable onPress={handleChoosePhoto} style={styles.button}>
                <Text style={styles.buttonText}>앨범에서 선택</Text>
              </Pressable>
              <Pressable onPress={handleTakePhoto} style={styles.button}>
                <Text style={styles.buttonText}>새로 찍기</Text>
              </Pressable>
            </View>
          </ViewItem>
          <ViewItem>
            <Text style={styles.labelText}>정가</Text>
            <TextInput
              placeholder={'정가'}
              style={styles.form}
              autoCapitalize={'none'}
              autoCorrect={false}
              returnKeyType={'next'}
              keyboardType={'numeric'}
              onChangeText={e => {
                setG_price(e);
              }}
            />
          </ViewItem>
          <ViewItem>
            <Text style={styles.labelText}>할인가</Text>
            <TextInput
              placeholder={'할인가'}
              style={styles.form}
              autoCapitalize={'none'}
              autoCorrect={false}
              returnKeyType={'next'}
              keyboardType={'numeric'}
              onChangeText={e => {
                setG_discount(e);
              }}
            />
          </ViewItem>
          <ViewItem>
            <Text style={styles.labelText}>상세설명</Text>
            <TextInput
              placeholder={'상세설명'}
              style={styles.form2}
              autoCapitalize={'none'}
              autoCorrect={false}
              returnKeyType={'next'}
              multiline={true}
              textAlignVertical={'top'}
              onChangeText={e => {
                setG_detail(e);
              }}
            />
          </ViewItem>
          <Pressable
            onPress={loading ? null : validateForm}
            style={styles.button}>
            <Text style={styles.buttonText}>상품등록</Text>
            {loading && <ActivityIndicator />}
          </Pressable>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    height: 50,
    width: '100%',
    padding: 10,
  },
  inputAndroid: {
    fontSize: 16,
    height: 50,
    width: '100%',
    padding: 10,
  },
});

const styles = StyleSheet.create({
  form2: {
    borderRadius: 10,
    borderWidth: 5,
    backgroundColor: 'white',
    borderStyle: 'solid',
    borderColor: 'white',
    padding: 10,
    height: 100,
    margin: 10,
    color: 'black',
  },
  container: {
    flex: 1,
  },
  viewTop: {
    flex: 1,
    backgroundColor: '#D4ECDD',
  },
  viewMiddle: {
    marginTop: 20,
    flex: 2,
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
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '95%',
    backgroundColor: 'rgba(75, 192, 192, 0.2)',
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
    fontWeight: '600',
    marginLeft: 10,
    fontSize: 15,
  },
});

export default Register;
